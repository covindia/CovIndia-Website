"""
	This slave's daily motivation: https://youtu.be/4v8ek9TEeOU?t=40

	This video makes this lil dude laugh like crazy. You should see the slave laugh.
	Pffftt.... it thinks it has freedom. :evil-overlord-vibes:

	It literally goes UwU when it laughs. UwU? More like eww. :eyes-roll:

	Author: IceCereal
"""

from datetime import datetime
from json import dump

DIR_DATA = "../data/"

def daily_dates(data):
	"""
		The API function for daily-dates.  Saves output to DIR_DATA / APIData / daily_date.json
	"""
	DATA_daily_dates = {}
	for row in data:
		date = str(row[0])

		try:
			cutoff = datetime(2020, 3, 1)
			if datetime.strptime(date, "%d/%m/%Y") > cutoff:
				DATA_daily_dates[str(date)] += int(row[4])
		except:
			try:
				DATA_daily_dates[str(date)] += 0
			except:
				DATA_daily_dates[str(date)] = 0

	with open(DIR_DATA + "APIData/daily_dates.json", 'w') as FPtr:
		dump(DATA_daily_dates, FPtr)