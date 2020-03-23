"""
	Ah yes, the minion that quietly does it's work whenever called. This little bad boy of ours can crunch data and saves them
	to our data/ directory. It also does the magic of inserting stuff into HTML

	Minion's daily motivation:
		This youtube video explaining the beauty of life. This video, according to the minion, captures the essence
		of life, the universe and everything. The minion believes that this video is fundamental to the universe just as you and I are made
		up of atoms. As you can see, this video is everything to the minion. Please make sure that YouTube never takes it down because if
		YouTube was going to let us down, I don't know what minion would do:
		https://www.youtube.com/watch?v=dQw4w9WgXcQ

	Author: IceCereal + achal.ochod
"""

import gspread
from oauth2client.service_account import ServiceAccountCredentials
from datetime import datetime
from json import dump, load

# Yes, the minion has it's own slaves to work.
from BigDataBox.utils.daily_dates.daily_dates import daily_dates
from BigDataBox.utils.latest_updates.latest_updates import latest_updates_V2
from BigDataBox.utils.general.general import general
from BigDataBox.utils.general.district_values import district_values
from BigDataBox.utils.states_affected_numbers.states_affected_numbers import states_affected_numbers

# Directories
DIR_DATA = "../data/"
DIR_RES = "res/"
DIR_PRODUCTION = "live/"

def do_your_work():
	"""
		Get the damn data from our google sheet and crunch these numbers.
		Store the numbers in your DIR_DATA, slave.
	"""

	scope = ['https://spreadsheets.google.com/feeds']
	creds = ServiceAccountCredentials.from_json_keyfile_name(DIR_RES + 'creds.json',scope)
	client = gspread.authorize(creds)
	with open(DIR_RES + "URL", 'r') as F:
		URL = F.read()
	sheet = client.open_by_url(URL).worksheet('Sheet1')

	data = sheet.get()
	data = data[1:]

	print ("Computing daily-dates...")
	daily_dates(data)
	
	print ("Computing states-affected-numbers...")
	states_affected_numbers(data)

	print ("Computing general...")
	globalData, returnData = general(data)

	print ("Computing latest-updates...")
	latest_updates_V2(data, 5)

	print ("Computing district-values...")
	district_values(globalData)

if __name__ == "__main__":
	do_your_work()
