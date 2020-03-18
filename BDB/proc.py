import gspread
#Service client credential from oauth2client
from oauth2client.service_account import ServiceAccountCredentials#Create scope
from pandas import read_html
from bs4 import BeautifulSoup as bs
from requests import get
from datetime import datetime


def do_thing():
	scope = ['https://spreadsheets.google.com/feeds']
	#create some credential using that scope and content of startup_funding.json
	creds = ServiceAccountCredentials.from_json_keyfile_name('BDB/coronatracker-3b2e7c0f2396.json',scope)
	#create gspread authorize using that credential
	client = gspread.authorize(creds)
	#Now will can access our google sheets we call client.open on StartupName
	with open("BDB/URL", 'r') as F:
		URL = F.read()
	sheet = client.open_by_url(URL).worksheet('Sheet1')

	globalData = {}
	returnData = {}
	rowCount = False

	infectedTotal = 0
	deadTotal = 0

	data = sheet.get()
	for row in data:
		if not rowCount:
			rowCount = not rowCount
			continue
		
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
	# TotalIndianCases = df[0].iloc[[-1]][2].values[0] # TOTAL CONFIRMED CASES INDIAN
	TotalForeignCases = df[0].iloc[-1].values[3] # TOTAL CONFIRMED CASES FOREIGN
	TotalCured = df[0].iloc[-1].values[4] # CURED/DISCHARGED
	TotalDeath = df[0].iloc[-1].values[5] # DEATH

	page = get(mohfwURL)
	soup = bs(page.text, "html.parser")

	for line in soup.strings:
		if "Total number of confirmed COVID 2019 cases across India" in line:
			TotalNumberCases = int(line.split()[-1:][0])

	for districtBoi in globalData:
		globalData[districtBoi]["value"] = globalData[districtBoi]["infected"] / infectedMax
	print (globalData)

	rawHTML = []
	with open("base.html", 'r') as FPtr:
		for line in FPtr:
			rawHTML.append(line)
	newHTML = []
	flagSkip = False
	for line in rawHTML:
		if flagSkip:
			flagSkip = False
			continue

		if line == '\t\t\t<!-- MAX VALUE EDIT -->\n':
			newHTML.append(line)
			STRING = "\t\t\t<text id=\"lowValue\" x=\"175\" y=\"27\" font-weight=\"bold\" text-anchor=\"start\">" + str(infectedMax) +  "</text>\n"
			newHTML.append(STRING)
			continue

		if line == '\t\t\t\t<!-- INFECTED COUNT -->\n':
			newHTML.append(line)
			newHTML.append("\t\t\t\t<h6 style=\"font-size: bold; font-size: 1.5em;\">Infected: "+str(infectedTotal)+" <br><span style=\"font-size:0.725em;\"> Cured: "+str(TotalCured)+" <span style=\"color: #A9A9A9\">|</span> Deaths: "+str(TotalDeath)+"</span></h6>\n")
			continue

		if line == '\t\t\t<!-- LIST COUNT -->\n':
			newHTML.append(line)
			districtsList = districtsAffected[0]
			statesList = statesAffected[0]
			for distNum in range(1, len(districtsAffected)):
				if districtsAffected[distNum].startswith("Aurangabad"):
					districtsList += ", Aurangabad"
				else:	
					districtsList += ", " + districtsAffected[distNum]
			for stateNum in range(1, len(statesAffected)):
				statesList += ", " + statesAffected[stateNum]
			newHTML.append("\t\t\t<p>Districts Affected: "+districtsList+"</p>"+"<br><p>States Affected: "+statesList+"</p>\n")
			continue

		
		if line == '\t\t\t<!-- LAST UPDATED TIME -->\n':
			newHTML.append(line)
			newHTML.append("\t\t\t<h6 style=\"font-size: 0.75em;\" style=\"font-color: rgb(150,150,150);\">Last Updated: "+datetime.now().strftime("%d/%m/%Y - %H:%M"+"</h6>\n"))
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


	with open("Testing/index.html", 'w') as FPtr:
		FPtr.writelines(newHTML)

	return (globalData, returnData)

def delta(diff, diffsList):
	print ("\n\n\nDELTA\n\n\n")
	individualUpdates = []
	print (diff)
	for district in diff:
		if district == "DIST_NA":
			continue
		districtDataList = diffsList[district]

		diffInfected = diff[district]["infected"]
		diffDead = diff[district]["dead"]

		mUpdate = ""
		if diff[district]["status"] == "NEW":
			# INF
			print (diff[district]["infected"])
			if diff[district]["infected"] >= 1:
				if diff[district]["infected"] == 1:
					mUpdate += "<b>First</b> confirmed case in <b>" + district + "</b>, <b>" + diff[district]["state"] + "</b> | "
				else:
					mUpdate += district + "First <b>" + str(diff[district]["infected"]) + "</b> confirmed cases in <b>" + district + "</b>, <b>" + diff[district]["state"] + "</b> | "
				if len(districtDataList) > 1:
					mUpdate += "Sources: "
					for entry in districtDataList:
						if entry["infected"] >= 1:
							mUpdate += "<a href=\"" + entry["source"] + "\">" + "Link" + "</a>, "
					mUpdate = mUpdate[:-2]
					mUpdate += "<br> "
				else:
					entry = districtDataList[0]
					mUpdate += "Source: <a href=\"" + entry["source"] + "\">" + "Link" + "</a><br> "
			
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
							mUpdate += "<a href=\"" + entry["source"] + "\">" + "Link" + "</a>, "
					mUpdate = mUpdate[:-2]
					mUpdate += "<br> "
				else:
					entry = districtDataList[0]
					mUpdate += "Source: <a href=\"" + entry["source"] + "\">" + "Link" + "</a><br> "

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
							mUpdate += "<a href=\"" + entry["source"] + "\">" + "Link" + "</a>, "
					mUpdate = mUpdate[:-2]
					mUpdate += "<br> "
				else:
					mUpdate += "Source : "
					entry = entries[0]
					if entry["infected"] >= 1:
						mUpdate += "<a href=\"" + entry["source"] + "\">" + "Link" + "</a><br> "

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
							mUpdate += "<a href=\"" + entry["source"] + "\">" + "Link" + "</a>, "
					mUpdate = mUpdate[:-2]
					mUpdate += "<br> "
				else:
					mUpdate += "Source : "
					entry = entries[0]
					if entry["dead"] >= 1:
						mUpdate += "<a href=\"" + entry["source"] + "\">" + "Link" + "</a><br> "


		# Get Latest Time
		latestTime = datetime.strptime(districtDataList[0]["time"], "%d/%m/%Y %H:%M")
		for entry in districtDataList:
			newTime = datetime.strptime(entry["time"], "%d/%m/%Y %H:%M")
			if newTime > latestTime:
				latestTime = newTime

		if len(mUpdate) > 1:
			individualUpdates.append([mUpdate, latestTime])
		# print (individualUpdates)

	print (individualUpdates)
	if len(individualUpdates) > 5:
		individualUpdates.sort(key = lambda x: x[1], reverse=True)
		individualUpdates = individualUpdates[:5]
	ov = [i[0] for i in individualUpdates]
	LiveUpdateString = ''.join(ov)
	# EDIT HTML
	rawHTML = []
	with open("Testing/index.html", 'r') as FPtr:
		for line in FPtr:
			rawHTML.append(line)
	newHTML = []
	flagSkip = False
	for line in rawHTML:
		if flagSkip:
			flagSkip = False
			continue
		
		if line == '\t\t<!-- LATEST UPDATE -->\n':
			newHTML.append(line)
			newHTML.append(LiveUpdateString)
			flagSkip = True
			continue
			
		newHTML.append(line)
	with open("Testing/index.html", 'w') as FPtr:
		FPtr.writelines(newHTML)

if __name__ == '__main__':
	LatestData, DiffsList = do_thing()
	from json import dump, load
	from ast import literal_eval

	with open("lastUpdate.json", 'r') as FPtr:
		PrevData = load(FPtr)

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

	delta(diff, DiffsList)