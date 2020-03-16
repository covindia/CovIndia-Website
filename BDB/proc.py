import gspread
#Service client credential from oauth2client
from oauth2client.service_account import ServiceAccountCredentials#Create scope
from pandas import read_html
from bs4 import BeautifulSoup as bs
from requests import get

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
	rowCount = False

	data = sheet.get()
	for row in data:
		if not rowCount:
			rowCount = not rowCount
			continue
		
		try:
			districtBoi = row[3]
		except:
			pass

		if districtBoi in globalData:
			try:
				globalData[districtBoi]["infected"] += int(row[4])
			except:
				pass

			try:
				globalData[districtBoi]["dead"] += int(row[5])
			except:
				pass

		else:
			globalData[districtBoi] = {}
			try:
				globalData[districtBoi]["infected"] = int(row[4])
			except:
				globalData[districtBoi]["infected"] = 0

			try:
				globalData[districtBoi]["dead"] = int(row[5])
			except:
				globalData[districtBoi]["dead"] = 0

			try:
				globalData[districtBoi]["state"] = str(row[2])
			except:
				globalData[districtBoi]["state"] = ""

	infectedMax = 0
	deadMax = 0

	infectedTotal = 0
	deadTotal = 0
	districtsAffected = []
	statesAffected = []

	for districtBoi in globalData:
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
	TotalIndianCases = df[0].iloc[[-1]][2].values[0] # TOTAL CONFIRMED CASES INDIAN
	TotalForeignCases = df[0].iloc[[-1]][3].values[0] # TOTAL CONFIRMED CASES FOREIGN
	TotalCured = df[0].iloc[[-1]][4].values[0] # CURED/DISCHARGED
	TotalDeath = df[0].iloc[[-1]][5].values[0] # DEATH

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
		
		if line == '\t<!-- Custom Imports -->\n':
			newHTML.append(line)
			STRING = "\t<link rel=\"stylesheet\" href=\"../styles.css\" type=\"text/css\">\n"
			newHTML.append(STRING)
			flagSkip = True
			continue

		if line == '\t\t\t<!-- MAX VALUE EDIT -->\n':
			newHTML.append(line)
			STRING = "\t\t\t<text id=\"lowValue\" x=\"175\" y=\"27\" text-anchor=\"start\">" + str(infectedMax) +  "</text>\n"
			newHTML.append(STRING)
			continue

		if line == '\t\t\t\t<!-- INFECTED COUNT -->\n':
			newHTML.append(line)
			newHTML.append("\t\t\t\t<h6 style=\"font-size: bold; font-size: 1.5em;\">Infected: "+str(TotalNumberCases)+" <span style=\"color: #A9A9A9\">|</span> Cured: "+str(TotalCured)+" <span style=\"color: #A9A9A9\">|</span> Deaths: "+str(TotalDeath)+"</h6>\n")
			continue

		if line == '\t\t\t<!-- LIST COUNT -->\n':
			newHTML.append(line)
			districtsList = districtsAffected[0]
			statesList = statesAffected[0]
			for distNum in range(1, len(districtsAffected)):
				districtsList += ", " + districtsAffected[distNum]
			for stateNum in range(1, len(statesAffected)):
				statesList += ", " + statesAffected[stateNum]
			newHTML.append("\t\t\t<p>Districts Affected: "+districtsList+"</p>"+"<br><p>States Affected: "+statesList+"</p>\n")
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


	with open("index.html", 'w') as FPtr:
		FPtr.writelines(newHTML)

if __name__ == '__main__':
	do_thing()