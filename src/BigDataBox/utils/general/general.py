"""
	This slave has one single source of running it's grunt work every single day:
	https://icecereal.github.io/img/blog-images/my-favorite-indie-band-uploaded-a-story-about-me/PrivatePresley-Keyboard.mp4

	Shamless Plug, yeh. Scru u. I wrote this, I get to plug whatever I want.

	It's a damn good cover too.

	Author: IceCereal.
"""

from datetime import datetime
from json import dump
from pandas import read_html

DIR_DATA = "../data/"

def general(data):
	"""
		The API function for general.  Saves output to DIR_DATA / APIData / general.json
	"""
	infectedTotal = 0
	deadTotal = 0
	globalData = {}
	returnData = {}

	for row in data:
		try:
			district = row[3]
		except:
			pass

		if district == "DIST_NA":
			try:
				infectedTotal += int(row[4])
			except:
				pass
			try:
				deadTotal += int(row[5])
			except:
				pass

		try:
			TimeUpdated = str(row[1])
		except:
			TimeUpdated = "00:00"
		try:
			DateUpdated = str(row[0])
		except:
			DateUpdated = datetime.now().strftime("%d/%m/%Y")

		returnDict = {}

		if district in globalData:
			try:
				globalData[district]["infected"] += int(row[4])
				returnDict["infected"] = int(row[4])
			except:
				returnDict["infected"] = 0

			try:
				globalData[district]["dead"] += int(row[5])
				returnDict["dead"] = int(row[5])
			except:
				returnDict["dead"] = 0

			try:
				returnDict["state"] = str(row[2])
			except:
				returnDict["state"] = ""

			try:
				returnDict["source"] = str(row[6])
			except:
				returnDict["source"] = ""


		else:
			globalData[district] = {}
			try:
				globalData[district]["infected"] = int(row[4])
				returnDict["infected"] = int(row[4])
			except:
				globalData[district]["infected"] = 0
				returnDict["infected"] = 0

			try:
				globalData[district]["dead"] = int(row[5])
				returnDict["dead"] = int(row[5])
			except:
				globalData[district]["dead"] = 0
				returnDict["dead"] = 0
			try:
				globalData[district]["state"] = str(row[2])
				returnDict["state"] = str(row[2])
			except:
				globalData[district]["state"] = ""
				returnDict["state"] = ""

			try:
				globalData[district]["source"] = str(row[6])
				returnDict["source"] = str(row[6])
			except:
				globalData[district]["source"] = ""
				returnDict["source"] = ""

		DateTime = DateUpdated +" "+ TimeUpdated
		returnDict["time"] = DateTime

		if district in returnData:
			returnData[district].append(returnDict)
		else:
			returnData[district] = [returnDict]

	infectedMax = 0
	deadMax = 0

	districtsAffected = []
	statesAffected = []

	for district in globalData:
		if district == "DIST_NA":
			continue
		if globalData[district]["infected"] > infectedMax:
			infectedMax = globalData[district]["infected"]
		if globalData[district]["dead"] > deadMax:
			deadMax = globalData[district]["dead"]

		if district not in districtsAffected:
			districtsAffected.append(district)

		if globalData[district]["state"] not in statesAffected:
			statesAffected.append(globalData[district]["state"])

		infectedTotal += globalData[district]["infected"]
		deadTotal += globalData[district]["dead"]

	mohfwURL = "https://www.mohfw.gov.in/"

	df = read_html(mohfwURL)

	TotalCured = df[1].iloc[-1].values[4] # CURED/DISCHARGED
	TotalDeath = df[1].iloc[-1].values[5] # DEATH

	for districtBoi in globalData:
		globalData[districtBoi]["value"] = globalData[districtBoi]["infected"] / infectedMax

	districtsList = districtsAffected[0]
	statesList = statesAffected[0]
	for distNum in range(1, len(districtsAffected)):
		if districtsAffected[distNum].startswith("Aurangabad"):
			districtsList += ", Aurangabad"
		else:
			districtsList += ", " + districtsAffected[distNum]
	for stateNum in range(1, len(statesAffected)):
		statesList += ", " + statesAffected[stateNum]

	generalData = {
		"deathTotal" : int(deadTotal),
		"districtList" : districtsList,
		"infectedTotal" : int(infectedTotal),
		"infectedMax" : int(infectedMax),
		"lastUpdatedTime" : str(datetime.now()),
		"statesList" : statesList,
		"totalCured" : int(TotalCured)
	}

	with open(DIR_DATA + "APIData/general.json", 'w') as FPtr:
		dump(generalData, FPtr)

	return (globalData, returnData)