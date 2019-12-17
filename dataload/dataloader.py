import json
from mongoDAO import mongoDAO

fileLoc = {
    'dept' : './data/dept.json',
    'cat' : './data/cat.json',
    'prod' : './data/prod.json',
    'sku' : './data/sku.json'
    # 'dept' : '/Users/pkulkar4/Downloads/17102019/data/dept.json',
    # 'cat' : '/Users/pkulkar4/Downloads/17102019/data/cat.json',
    # 'prod' : '/Users/pkulkar4/Downloads/17102019/data/prod.json',
    # 'sku' : '/Users/pkulkar4/Downloads/17102019/data/sku.json'
}


def loadJson(filename):
    with open(filename) as json_file:
        return json.load(json_file)


if __name__ == "__main__":
    mongo = mongoDAO()
    DeptJson = loadJson(fileLoc.get('dept'))
    # print(DeptJson)
    mongo.loadDepartment(DeptJson)

    CatJson = loadJson(fileLoc.get('cat'))
    # print(CatJson)
    mongo.loadCategories(CatJson)

    ProdJson = loadJson(fileLoc.get('prod'))
    # print(ProdJson)
    mongo.loadProduct(ProdJson)

    SkuJson = loadJson(fileLoc.get('sku'))
    # print(SkuJson)
    mongo.loadSkus(SkuJson)
