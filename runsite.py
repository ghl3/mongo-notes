
from flask import Flask, jsonify, render_template, request
from bson.objectid import ObjectId
import pymongo


app = Flask(__name__)
connect = pymongo.Connection()
db = connect.my_db


def parse_item(intext):
    properties = { }
    for line in intext.split('\n'):
        if line.startswith('@'):
            collection_name, properties['name'] = line[1:].split()
        elif line.startswith('#'):
            words = line[1:].split()
            properties[words[0]] = ' '.join(words[1:])

    if '_id' in properties:
        properties['_id'] = ObjectId(properties['_id'])
        
    return collection_name, properties


@app.route('/_clear_db')
def clear_db():
    for name in db.collection_names():
        if name != 'system.indexes':
            db.drop_collection(name)
    return jsonify(result="database cleared")


@app.route('/_add_item')
def add_item():
    item_text = request.args.get('item_name', type=str)
    try:
        collection_name, properties = parse_item(item_text)
        collection = db[collection_name]
        collection.save(properties)
        return jsonify(result="add item %s succeeded" % properties)
    except:
        return jsonify(result="error")


@app.route('/_get_collections')
def get_collections():
    x = [n for n in db.collection_names() if n != 'system.indexes']
    result = render_template("collections.html", collections=x)
    return jsonify(result=result)


@app.route('/_get_item_detail')
def get_item_detail():
    try:
        item_id = request.args.get('item_id', type=str).split(':')
        collection_name, _id = item_id
        collection = db[collection_name]
        item = collection.find_one({'_id': ObjectId(_id)})
        result = render_template("item_detail.html",
                                 item_dict=item,
                                 collection_name=collection_name)
        return jsonify(result=result)
    except:
        return jsonify(result="error")


@app.route('/_get_item_card')
def get_item_card():
    try:
        item_id = request.args.get('item_id', type=str).split(':')
        collection_name, _id = item_id
        collection = db[collection_name]
        item = collection.find_one({'_id': ObjectId(_id)})
        result = render_template("item_card.txt",
                                 item_dict=item,
                                 collection_name=collection_name)
        return jsonify(result=result)
    except:
        return jsonify(result="error")


@app.route('/_get_items')
def get_items():
    key = request.args.get('collection_name', type=str)
    if key not in db.collection_names():
        return jsonify(result="%s is not a collection" % key)
    try:
        collection = db[key]
        x = [n for n in collection.find() if n != 'system.indexes']
    except:
        return jsonify(result="error...")
    result = render_template("items.html",
                             collection_items=x,
                             collection_name=key)
    return jsonify(result=result)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()

