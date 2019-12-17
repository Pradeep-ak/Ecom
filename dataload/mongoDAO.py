import pymongo
import os

class mongoDAO():

    def __init__(self):
        mongoHostname = os.environ.get('MONGO_SERVICE_HOST', 'localhost')
        mongoPort = os.environ.get('MONGO_SERVICE_PORT', '27017')
        mongouser = os.environ.get('MONGO_INITDB_ROOT_USERNAME', 'root')
        mongopass = os.environ.get('MONGO_INITDB_ROOT_PASSWORD', 'example')

        self.dbclient = pymongo.MongoClient( "mongodb://{}:{}@{}:{}/".format(mongouser, mongopass, mongoHostname, mongoPort))
        self.db = self.dbclient["ecom"]
        self.DepartmentCol = self.db["department"]
        self.CategoriesCol = self.db["category"]
        self.ProductCol = self.db["product"]
        self.SkuCol = self.db["sku"]

    def loadDepartment(self, deptLst):
        for obj in deptLst:
            try:
                self.DepartmentCol.insert(obj)
            except Exception as bwe:
                print(bwe)
                # you can also take this component and do more analysis
                # werrors = bwe.details['writeErrors']


    def loadCategories(self, catLst):
        for obj in catLst:
            try:
                self.CategoriesCol.insert(obj)
            except Exception as bwe:
                print(bwe.details)
                # you can also take this component and do more analysis
                # werrors = bwe.details['writeErrors']

    def loadProduct(self, products):
        for obj in products:
            try:
                self.ProductCol.insert(obj)
            except Exception as bwe:
                print(bwe.details)
                # you can also take this component and do more analysis
                # werrors = bwe.details['writeErrors']

    def loadSkus(self, skus):
        for obj in skus:
            try:
                self.SkuCol.insert(obj)
            except Exception as bwe:
                print(bwe.details)
                # you can also take this component and do more analysis
                # werrors = bwe.details['writeErrors']

    def getAllProduct(self):
        try:
            return self.ProductCol.find({})
        except Exception as excep:
            print(excep)

    def getSkuForId(self, SkuId):
        try:
            return self.SkuCol.find({'id':SkuId})
        except Exception as excep:
            print(excep)

    def getAllCategories(self):
        try:
            return self.CategoriesCol.find({})
        except Exception as excep:
            print(excep)

    def getAllSku(self):
        try:
            return self.SkuCol.find({})
        except Exception as excep:
            print(excep)