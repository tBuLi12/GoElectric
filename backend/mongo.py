import pymongo
from bson.objectid import ObjectId

client = pymongo.MongoClient('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false')

db = client.get_database('sandbox')

doc = db.get_collection('root').find_one({"_id": ObjectId('623a578bc1eff0bce8b39e97')})

print(doc)