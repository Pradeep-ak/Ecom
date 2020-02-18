import pysolr;
# from bs4 import BeautifulSoup
import concurrent.futures
import os

from mongoDAO import mongoDAO

solr_hostname = os.environ.get('SOLR_SERVICE_HOST', 'localhost')
solr_port = os.environ.get('SOLR_SERVICE_PORT', '8983')
solr_collection = os.environ.get('SOLR_COLLECT', 'product')
# Setup a basic Solr instance. The timeout is optional.
solr = pysolr.Solr('http://{}:{}/solr/{}/'.format(solr_hostname, solr_port, solr_collection), timeout=500)


def getAttrName(txt=''):
    if (txt is None):
        return txt
    return txt.strip().replace(' ','_')

def getMultiValue(values, value):
    if values is None:
        values = list()
    if value not in values:
        values.append(value)
    return values

def getValue(value=''):
    if (value is None):
        return value
    value_split = value.split('%')
    value_split = filter(lambda x:'%' not in x, value_split)
    value = ",".join(value_split)
    value = value.strip().replace(' ,', ',').replace(', ',',').replace('-','_').replace('/','_').replace(' ','_')
    return value+" "


mongo = mongoDAO()

cat2PP = dict()
#Map Cat 2 Products.
cats = mongo.getAllCategories()
for cat in cats:
    if 'PPs' in cat:
        for PPId in cat.get('PPs'):
            if PPId not in cat2PP:
                cat2PP[PPId]=list()
            cat2PP[PPId].append(cat.get('id'))

prodLst = mongo.getAllProduct()
skuLst = mongo.getAllSku()
skuMap= dict()
for sku in skuLst:
    skuMap[sku.get('id')]=sku

def getProdRecord(prod, cat_pp):
    solrRec = dict()
    solrRec['id'] = prod.get('id')
    # solrRec['description'] = BeautifulSoup(prod.get('description'), "lxml").text.replace('\n', '').replace('\t',
    #                                                                                                        '').replace(
    #     '\xa0', '')

    solrRec['description'] = prod.get('description')
    solrRec['keyword'] = prod.get('keyword')
    solrRec['name'] = prod.get('name').replace('_'+prod.get('id'),'')
    solrRec['parentPP'] = prod.get('parentPP')

    if prod.get('parentPP') in cat_pp:
        solrRec['categories'] = cat_pp[prod.get('parentPP')]

    # Images
    imgs = filter(lambda x: x['type'] == 'PRIMARY', prod.get('images'))
    for img in imgs:
        solrRec['image'] = img['url'].replace('http://s7d9.scene7.com/is/image/JCPenney/', '')

    # Price Section
    if 'price' in prod and 'amounts' in prod.get('price'):
        amts = prod.get('price').get('amounts')
        isSale=False
        isClearnce=False
        for amt in amts:
            if 'ORIGINAL' == amt.get('type'):
                solrRec['O_price'] = amt.get('max')
                solrRec['O_PercentOff'] = amt.get('maxPercentOff')
                solrRec['price_type'] = amt.get('type')
            if 'SALE' == amt.get('type'):
                isSale=True
                solrRec['S_price'] = amt.get('max')
                solrRec['S_PercentOff'] = amt.get('maxPercentOff')
                solrRec['price_type'] = amt.get('type')
            if 'CLEARANCE' == amt.get('type'):
                isClearnce=True
                solrRec['C_price'] = amt.get('max')
                solrRec['C_PercentOff'] = amt.get('maxPercentOff')
                solrRec['price_type'] = amt.get('type')

        if isClearnce:
            solrRec['price'] = solrRec['C_price']
            solrRec['PercentOff'] = solrRec['C_PercentOff']
            solrRec['price_type'] = 'CLEARANCE'
        elif isSale:
            solrRec['price'] = solrRec['S_price']
            solrRec['PercentOff'] = solrRec['S_PercentOff']
            solrRec['price_type'] = 'SALE'
        else:
            solrRec['price'] = solrRec['O_price']
            solrRec['PercentOff'] = solrRec['O_PercentOff']
            solrRec['price_type'] = 'ORIGINAL'

    if 'attributes' in prod:
        for attr in prod.get('attributes'):
            if attr.get('value'):
                solrRec[getAttrName(attr.get('name'))] = getValue(attr.get('value'))

    if 'skus' in prod:
        # print(len(prod.get('skus')))
        for sku in prod.get('skus'):
            skuRepo = [skuMap.get(sku)]
            # print(skuRepo[0])
            if 'option' in skuRepo[0]:
                for option in skuRepo[0].get('option'):
                    if 'color' == getAttrName(option.get('name')):
                        attrName = getAttrName(option.get('name'))
                        solrRec[attrName] = getMultiValue(solrRec.get(attrName), getValue(option.get('family')))
                    else:
                        attrName = getAttrName(option.get('name'))
                        solrRec[attrName] = getMultiValue(solrRec.get(attrName), getValue(option.get('value')))
    return solrRec

def checkEven(prod):
    if prod.get('id')=='5830541':
        return True
    else:
        return False

Records = list()
#prodLst = filter(checkEven, prodLst)
with concurrent.futures.ThreadPoolExecutor(max_workers=100) as executor:
    future_to_url = {executor.submit(getProdRecord, prod, cat2PP): prod for prod in prodLst}
    for future in concurrent.futures.as_completed(future_to_url):
        stats = future_to_url[future]
        try:
            data = future.result()
            #print(data)
            Records.append(data)
        except Exception as exc:
            print('%r generated an exception: %s' % (stats, exc))

print(len(Records))
solr.add(Records)
solr.commit()


