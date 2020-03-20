import flask
from flask import jsonify
from json import load

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
	return "<a href=\"https://covindia.com\">Click here to go to https://covindia.com</a>. You were not supposed to stumble here.<br><br>But now that you did, hello from us!"

@app.route('/states', methods=['GET'])
def states():
	statesJSON = {}
	with open("cachedBoi/states.json", 'r') as FPtr:
		statesJSON = load(FPtr)
	return jsonify(statesJSON)

@app.route('/dailygraphdata', methods=['GET'])
def dailygraphdata():
	statesJSON = {}
	with open("cachedBoi/dailygraphdata.json", 'r') as FPtr:
		statesJSON = load(FPtr)
	return jsonify(statesJSON)

@app.route('/generaldata', methods=['GET'])
def states():
	generalJSON = {}
	with open("cachedBoi/general.json", 'r') as FPtr:
		generalJSON = load(FPtr)
	return jsonify(generalJSON)

@app.route('/latestupdates', methods=['GET'])
def states():
	latestUpdatesJSON = {}
	with open("cachedBoi/latestupdates.json", 'r') as FPtr:
		latestUpdatesJSON = load(FPtr)
	return jsonify(latestUpdatesJSON)


app.run(host='0.0.0.0', port=5000, debug=True)
