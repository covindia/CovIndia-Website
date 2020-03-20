import flask
from flask import jsonify
from json import load
from minion import do_your_work

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
def states():
	statesJSON = {}
	with open("cachedBoi/dailygraphdata.json", 'r') as FPtr:
		statesJSON = load(FPtr)
	return jsonify(statesJSON)

app.run(host='0.0.0.0', port=5000, debug=True)
