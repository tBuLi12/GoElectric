import pymongo
from bson.objectid import ObjectId
host = "192.168.137.203"
client = pymongo.MongoClient(host, 8080)

db = client.get_database('sandbox')

doc = db.get_collection('root').find_one({"_id": ObjectId('623a578bc1eff0bce8b39e97')})

print(doc)