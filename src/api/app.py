import flask
from flask import jsonify
from json import load
import os


DIR_DATA = os.environ['DATA_REPO_PATH']

app = flask.Flask(__name__)

@app.route('/', methods=['GET'])
def home():
	return "<a href=\"https://covindia.com\">Click here to go to https://covindia.com</a>. You were not supposed to stumble here.<br><br>But now that you did, hello from us!"

@app.route('/states', methods=['GET'])
def states():
	statesJSON = {}
	with open(DIR_DATA + "/APIData/states.json", 'r') as FPtr:
		statesJSON = load(FPtr)
	return jsonify(statesJSON)

@app.route('/dailygraphdata', methods=['GET'])
def dailygraphdata():
	statesJSON = {}
	with open(DIR_DATA + "/APIData/dailygraphdata.json", 'r') as FPtr:
		statesJSON = load(FPtr)
	return jsonify(statesJSON)

@app.route('/generaldata', methods=['GET'])
def generaldata():
	generalJSON = {}
	with open(DIR_DATA + "/APIData/general.json", 'r') as FPtr:
		generalJSON = load(FPtr)
	return jsonify(generalJSON)

@app.route('/latestupdates', methods=['GET'])
def latestupdates():
	latestUpdatesJSON = {}
	with open(DIR_DATA + "/APIData/latestupdates.json", 'r') as FPtr:
		latestUpdatesJSON = load(FPtr)
	return jsonify(latestUpdatesJSON)
