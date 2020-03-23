import flask
from flask import jsonify
from json import load, dump
import os


DIR_DATA = os.environ['DATA_REPO_PATH']

app = flask.Flask(__name__)

@app.route('/', methods=['GET'])
def home():
	return "<a href=\"https://covindia.com\">Click here to go to https://covindia.com</a>. You were not supposed to stumble here.<br><br>But now that you did, hello from us!"

@app.route('/states-affected-numbers', methods=['GET'])
def states_affected_numbers():
	statesJSON = {}
	with open(DIR_DATA + "/APIData/states_affected_numbers.json", 'r') as FPtr:
		statesJSON = load(FPtr)
	return jsonify(statesJSON)

@app.route('/daily-dates', methods=['GET'])
def daily_dates():
	dailyDates = {}
	with open(DIR_DATA + "/APIData/daily_dates.json", 'r') as FPtr:
		dailyDates = load(FPtr)
	return jsonify(dailyDates)

@app.route('/general', methods=['GET'])
def general():
	generalJSON = {}
	with open(DIR_DATA + "/APIData/index_general.json", 'r') as FPtr:
		generalJSON = load(FPtr)
	return jsonify(generalJSON)

@app.route('/latest-updates', methods=['GET'])
def latest_updates():
	latestUpdatesJSON = {}
	with open(DIR_DATA + "/APIData/latest_updates.json", 'r') as FPtr:
		latestUpdatesJSON = load(FPtr)
	return jsonify(latestUpdatesJSON)

@app.route('/district-values', methods=['GET'])
def district_values():
	districtValuesJSON = {}
	with open(DIR_DATA + "/APIData/district_values.json", 'r') as FPtr:
		districtValuesJSON = load(FPtr)
	return jsonify(districtValuesJSON)

@app.route('/i-donated-a-rick-roll', methods=['GET'])
def donated():
	try:
		with open("rick_roll_count.json", 'r') as FPtr:
			rrJSON = load(FPtr)
		rrJSON["rick-rolled"] += 1
		with open("rick_roll_count.json", 'r') as FPtr:
			dump(rrJSON, FPtr)
	except:
		rrJSON = {"rick-rolled" : 1}
		with open("rick_roll_count.json", 'w') as FPtr:
			dump(rrJSON, FPtr)
	finally:
		print ("Rick rolled someone! :yay:")

	return jsonify({"message": "LMAO"})
