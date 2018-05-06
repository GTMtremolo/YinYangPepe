import pymongo
from pymongo import MongoClient

mongoClient = MongoClient('localhost', 27017)
print (mongoClient)
db = mongoClient.YinYangPepe
#Collection
faces = db.face

vector = []
for i in range(128):
	vector.append(i + 1)

#insert du lieu vao database
faces = db.face.insert({
	'id': '2',
	'name': 'Le Hoang Nam',
	'relationship': 'stranger',
	'vector': vector})

print(db.face.count())