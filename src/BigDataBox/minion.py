"""
        Ah yes, the minion that quietly does it's work whenever called. This little bad boy of ours can crunch data and saves them
        to our data/ directory. It also does the magic of inserting stuff into HTML

        Author: IceCereal + achal.ochod
"""

import gspread
from oauth2client.service_account import ServiceAccountCredentials
from datetime import datetime
from json import dump, load
from pandas import read_html

# Directories
DIR_DATA = "../data/"
DIR_RES = "res/"
DIR_PRODUCTION = "live/"

def delta(diff, diffsList):
	"""
		Calculate the difference between old data and new data. Return some html looking thing
	"""

	individualUpdates = []
	for district in diff:
		if district == "DIST_NA":
			continue
		districtDataList = diffsList[district]

		diffInfected = diff[district]["infected"]
		diffDead = diff[district]["dead"]

		mUpdate = ""
		if diff[district]["status"] == "NEW":
			# INF
			if diff[district]["infected"] >= 1:
				if diff[district]["infected"] == 1:
					mUpdate += "<b>First</b> confirmed case in <b>" + district + "</b>, <b>" + diff[district]["state"] + "</b> | "
				else:
					mUpdate += "First <b>" + str(diff[district]["infected"]) + "</b> confirmed cases in <b>" + district + "</b>, <b>" + diff[district]["state"] + "</b> | "
				if len(districtDataList) > 1:
					mUpdate += "Sources: "
					for entry in districtDataList:
						if entry["infected"] >= 1:
							mUpdate += "<a href=\"" + entry["source"] + "\">" + "[Link]" + "</a>, "
					mUpdate = mUpdate[:-2]
					mUpdate += "<br> "
				else:
					entry = districtDataList[0]
					mUpdate += "Source: <a href=\"" + entry["source"] + "\">" + "[Link]" + "</a><br> "

			# DEAD
			if diff[district]["dead"] >= 1:
				if diff[district]["dead"] == 1:
					mUpdate += "<b>First</b> death reported in <b>" + district + "</b>, <b>" + diff[district]["state"] + "</b> | "
				else:
					mUpdate += "<b>" + str(diff[district]["dead"]) + "</b> deaths reported in <b>" + district + "</b>, <b>" + diff[district]["state"] + "</b> | "
				if len(districtDataList) > 1:
					mUpdate += "Sources: "
					for entry in districtDataList:
						if entry["dead"] >= 1:
							mUpdate += "<a href=\"" + entry["source"] + "\">" + "[Link]" + "</a>, "
					mUpdate = mUpdate[:-2]
					mUpdate += "<br> "
				else:
					entry = districtDataList[0]
					mUpdate += "Source: <a href=\"" + entry["source"] + "\">" + "[Link]" + "</a><br> "

		# Returning District
		else:
			districtDataList.reverse()
			if diff[district]["infected"] >= 1:
				if diff[district]["infected"] == 1:
					mUpdate += "<b>1</b> more case reported in <b>" + district + "</b>, <b>" + diff[district]["state"] + "</b> | "
				else:
					mUpdate += "<b>" + str(diff[district]["infected"]) + "</b> more cases reported in <b>" + district + "</b>, <b>" + diff[district]["state"] + "</b> | "
				entries = []
				# NOTE: Local here refers to the loop and not something regional
				local_infected = 0
				# DON'T TOUCH THIS VARIABLE. The logic may be bad, but I can't think of anything else right now
				infectedSources_Count = 0
				for entry in districtDataList:
					local_infected += entry["infected"]
					entries.append(entry)
					if local_infected >= int(diff[district]["infected"]):
						break
				infectedSources_Count = len(entries)

				if infectedSources_Count > 1:
					mUpdate += "Sources: "
					for entry in entries:
						if entry["infected"] >= 1:
							mUpdate += "<a href=\"" + entry["source"] + "\">" + "[Link]" + "</a>, "
					mUpdate = mUpdate[:-2]
					mUpdate += "<br> "
				else:
					mUpdate += "Source : "
					entry = entries[0]
				if entry["infected"] >= 1:
						mUpdate += "<a href=\"" + entry["source"] + "\">" + "[Link]" + "</a><br> "

			if diff[district]["dead"] >= 1:
				if diff[district]["dead"] == 1:
					mUpdate += "1 death in reported in <b>" + district + "</b>, <b>" + diff[district]["state"] + "</b> | "
				else:
					mUpdate += str(diff[district]["dead"]) + " deaths reported in <b>" + district + "</b>, <b>" + diff[district]["state"] + "</b> | "

				entries = []
				# NOTE: Local here refers to the loop and not something regional
				local_dead = 0
				# DON'T TOUCH THIS VARIABLE. The logic may be bad, but I can't think of anything else right now
				deadSources_Count = 0
				for entry in districtDataList:
					local_dead += entry["dead"]
					entries.append(entry)
					if local_dead >= diff[district]["dead"]:
						break
				deadSources_Count = len(entries)

				if deadSources_Count > 1:
					mUpdate += "Sources: "
					for entry in entries:
						if entry["dead"] >= 1:
							mUpdate += "<a href=\"" + entry["source"] + "\">" + "[Link]" + "</a>, "
					mUpdate = mUpdate[:-2]
					mUpdate += "<br> "
				else:
					mUpdate += "Source : "
					entry = entries[0]
					if entry["dead"] >= 1:
						mUpdate += "<a href=\"" + entry["source"] + "\">" + "[Link]" + "</a><br> "


		# Get Latest Time
		latestTime = datetime.strptime(districtDataList[0]["time"], "%d/%m/%Y %H:%M")
		for entry in districtDataList:
			newTime = datetime.strptime(entry["time"], "%d/%m/%Y %H:%M")
			if newTime > latestTime:
				latestTime = newTime

		if len(mUpdate) > 1:
			individualUpdates.append([mUpdate, latestTime])

	if len(individualUpdates) > 5:
		individualUpdates.sort(key = lambda x: x[1], reverse=True)
		individualUpdates = individualUpdates[:5]

	latestUpdates = {}
	for i in range(len(individualUpdates)):
		latestUpdates[str(i)] = individualUpdates[i][0]

	return (latestUpdates)

def do_your_work():
	"""
		Get the damn data from our google sheet and crunch these numbers.
		Store the numbers in your data dir, slave
	"""

	scope = ['https://spreadsheets.google.com/feeds']
	creds = ServiceAccountCredentials.from_json_keyfile_name(DIR_RES + 'creds.json',scope)
	client = gspread.authorize(creds)
	with open(DIR_RES + "URL", 'r') as F:
		URL = F.read()
	sheet = client.open_by_url(URL).worksheet('Sheet1')

	# For analytics.html
	statesBoi = {}	# States
	dgdBoi = {}	# Daily Graph Data

	firstRowCount = False

	# For index.html
	infectedTotal = 0
	deadTotal = 0
	globalData = {}
	returnData = {}

	data = sheet.get()

	for row in data:
		if not firstRowCount:
			firstRowCount = not firstRowCount
			continue

		# API - for analytics.html
		try:
			state = str(row[2])
		except:
			print ("extracting state name failed .... {", row, "}")

		try:
			date = str(row[0])
		except:
			date = datetime.now().strftime("%d/%m/%Y")

		try:
			statesBoi[state] += int(row[4])
		except Exception as e:
			try:
				statesBoi[state] += 0
			except:
				if row[4] == "":
					statesBoi[state] = 0
				else:
					statesBoi[state] = int(row[4])

		try:
			dgdBoi[str(date)] += int(row[4])
		except:
			try:
				dgdBoi[str(date)] += 0
			except:
				dgdBoi[str(date)] = 0

		### API - For index.html
		try:
			districtBoi = row[3]
		except:
			pass

		if districtBoi == "DIST_NA":
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
			pass
		try:
			DateUpdated = str(row[0])
		except:
			DateUpdated = datetime.now().strftime("%d/%m/%Y")
			pass

		returnDict = {}

		if districtBoi in globalData:
			try:
				globalData[districtBoi]["infected"] += int(row[4])
				returnDict["infected"] = int(row[4])
			except:
				returnDict["infected"] = 0
				pass

			try:
				globalData[districtBoi]["dead"] += int(row[5])
				returnDict["dead"] = int(row[5])
			except:
				returnDict["dead"] = 0
				pass

			try:
				returnDict["state"] = str(row[2])
			except:
				returnDict["state"] = ""

			try:
				returnDict["source"] = str(row[6])
			except:
				returnDict["source"] = ""


		else:
			globalData[districtBoi] = {}
			try:
				globalData[districtBoi]["infected"] = int(row[4])
				returnDict["infected"] = int(row[4])
			except:
				globalData[districtBoi]["infected"] = 0
				returnDict["infected"] = 0

			try:
				globalData[districtBoi]["dead"] = int(row[5])
				returnDict["dead"] = int(row[5])
			except:
				globalData[districtBoi]["dead"] = 0
				returnDict["dead"] = 0
			try:
				globalData[districtBoi]["state"] = str(row[2])
				returnDict["state"] = str(row[2])
			except:
				globalData[districtBoi]["state"] = ""
				returnDict["state"] = ""

			try:
				globalData[districtBoi]["source"] = str(row[6])
				returnDict["source"] = str(row[6])
			except:
				globalData[districtBoi]["source"] = ""
				returnDict["source"] = ""

		DateTime = DateUpdated +" "+ TimeUpdated
		returnDict["time"] = DateTime

		if districtBoi in returnData:
			returnData[districtBoi].append(returnDict)
		else:
			returnData[districtBoi] = [returnDict]

	with open(DIR_DATA + "APIData/states.json", 'w') as FPtr:
		dump(statesBoi, FPtr)

	with open(DIR_DATA + "APIData/dailygraphdata.json", 'w') as FPtr:
		dump(dgdBoi, FPtr)

	infectedMax = 0
	deadMax = 0

	districtsAffected = []
	statesAffected = []

	for districtBoi in globalData:
		if districtBoi == "DIST_NA":
			continue
		if globalData[districtBoi]["infected"] > infectedMax:
			infectedMax = globalData[districtBoi]["infected"]
		if globalData[districtBoi]["dead"] > deadMax:
			deadMax = globalData[districtBoi]["dead"]

		if districtBoi not in districtsAffected:
			districtsAffected.append(districtBoi)

		if globalData[districtBoi]["state"] not in statesAffected:
			statesAffected.append(globalData[districtBoi]["state"])

		infectedTotal += globalData[districtBoi]["infected"]
		deadTotal += globalData[districtBoi]["dead"]

	mohfwURL = "https://www.mohfw.gov.in/"

	df = read_html(mohfwURL)
	TotalCured = df[1].iloc[-1].values[3] # CURED/DISCHARGED
	TotalDeath = df[1].iloc[-1].values[4] # DEATH

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

	# print (generalData)

	with open(DIR_DATA + "APIData/general.json", 'w') as FPtr:
		dump(generalData, FPtr)

	# API - Index.html - Latest Updates
	with open(DIR_RES + "lastUpdate.json", 'r') as FPtr:
		PrevData = load(FPtr)

	LatestData = globalData
	DiffsList = returnData

	diff = {}
	for district in LatestData:
		new = {}
		if district in PrevData:
			for field in LatestData[district]:
				if (field == "infected") or (field == "dead"):
					new[field] = LatestData[district][field] - PrevData[district][field]
				else:
					new[field] = LatestData[district][field]
			new["status"] = "OLD"
		else:
			new = LatestData[district]
			new["status"] = "NEW"
		diff[district] = new

	latestUpdates = delta(diff, DiffsList)

	with open(DIR_DATA + "APIData/latestupdates.json", 'w') as FPtr:
		dump(latestUpdates, FPtr)

	# Do your magic
	rawHTML = []
	with open(DIR_RES + "base.html", 'r') as F:
		for line in F:
			rawHTML.append(line)

	newHTML = []
	flagSkip = False
	for line in rawHTML:
		if flagSkip:
			flagSkip = False
			continue

		if line == '\t\t// SPECIAL BOI - Data\n':
			newHTML.append(line)
			addLine = '\t\tvar data = '
			addLine += str(globalData)
			addLine += ';\n'
			newHTML.append(addLine)
			flagSkip = True
			continue

		newHTML.append(line)

	with open(DIR_PRODUCTION + "index.html", 'w') as FPtr:
		FPtr.writelines(newHTML)

	return (globalData, returnData)

if __name__ == "__main__":
	do_your_work()
