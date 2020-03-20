import gspread
from oauth2client.service_account import ServiceAccountCredentials#Create scope
from datetime import datetime
from json import dump


def do_your_work():
	scope = ['https://spreadsheets.google.com/feeds']
	creds = ServiceAccountCredentials.from_json_keyfile_name('coronatracker-3b2e7c0f2396.json',scope)
	client = gspread.authorize(creds)
	with open("URL", 'r') as F:
		URL = F.read()
	sheet = client.open_by_url(URL).worksheet('Sheet1')

	# cachedBoi data
	statesBoi = {}	# States
	dgdBoi = {}	# Daily Graph Data

	firstRowCount = False

	data = sheet.get()

	for row in data:
		if not firstRowCount:
			firstRowCount = not firstRowCount
			continue

		try:
			state = str(row[2])
		except:
			print ("extracting state name failed .... {", row, "}")

		try:
			date = str(row[0])
		except:
			date = datetime.now().strftime("%d/%m/%Y")
		
		print (state, date)

		try:
			statesBoi[state] += int(row[4])
		except:
			try:
				statesBoi[state] += 0
			except:
				statesBoi[state] = 0

		try:
			dgdBoi[str(date)] += int(row[4])
		except:
			try:
				dgdBoi[str(date)] += 0
			except:
				dgdBoi[str(date)] = 0

	with open("cachedBoi/states.json", 'w') as FPtr:
		dump(statesBoi, FPtr)

	with open("cachedBoi/dgd.json", 'w') as FPtr:
		dump(dgdBoi, FPtr)

	return True

if __name__ == "__main__":
	do_your_work()