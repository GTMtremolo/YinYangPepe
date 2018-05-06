#doc data tu mongodb

import pymongo
from pymongo import MongoClient

mongoClient = MongoClient('localhost', 27017)
db = mongoClient.YinYangPepe
#Collection
faces = db.face

#select * from face in db
results = faces.find()

#nhan dien

for result in results:
	print(result['id'])
	print(result['name'])
	print(result['relationship'])
	print(type(result['vector'][0]))