import pymongo
import os

class setup():

    dbs = ['ecom','ecomauth','ecomaccount','ecomorder']
    mongoHostname = os.environ.get('MONGO_SERVICE_HOST', 'localhost')
    mongoPort = os.environ.get('MONGO_SERVICE_PORT', '27017')
    mongouser = os.environ.get('MONGO_INITDB_ROOT_USERNAME', 'root')
    mongopass = os.environ.get('MONGO_INITDB_ROOT_PASSWORD', 'example')

    def __init__(self):
        self.dbclient = pymongo.MongoClient( "mongodb://{}:{}@{}:{}/".format(self.mongouser, self.mongopass, self.mongoHostname, self.mongoPort))

    def create(self):
        for db in self.dbs:
            self.db = self.dbclient[db]
            self.db._create_or_update_user(create=True,name=self.mongouser, password=self.mongopass,read_only=False);

if __name__ == "__main__":
    setup().create();



