"""
	This slave's motivation comes from: https://youtu.be/feA64wXhbjo?t=20

	It has one motto: Shoot to the Stars. If you don't work hard and reach your dreams, what is the meaning of life?
	Be passionate about what you do. Don't give up. Learn from your mistakes.

	... yeah this bot is a real annoying piece of work to deal with. Too much positive energy.... *shudders*.

	And back to self-quarantine I go.

	Author: IceCereal
"""

from datetime import datetime
from json import dump, load

DIR_DATA = "../data/"

def latest_updates_V2(data, number_of_latest_updates):
	"""
		Calculate the difference between old data and new data. Saves output to DIR_DATA / APIData / latest_updates.json

		Version 2 of Latest_Updates. The cooler older brother who does stuff better without thinking
		brainlessly.
	"""
	data.reverse()
	DATA_latest_updates = {}

	count = 0
	for entry in data:
		if (count > number_of_latest_updates-1):
			break

		# No source -_-, get the source scrapbois. Goddamnit.
		if entry[6] == '' or entry[6] == " ":
			continue

		state = str(entry[2])
		district = str(entry[3])

		infectedNumber = False
		deathNumber = False
		display_string = ""

		try:
			infectedNumber = int(entry[4])
		except:
			pass

		try:
			deathNumber = int(entry[5])
		except:
			pass

		districtFlag = True
		if district == "DIST_NA":
			districtFlag = False

		if infectedNumber:
			display_string = "<b>" + str(infectedNumber) + "</b> confirmed case"
			if infectedNumber > 1:
				display_string += "s"
			display_string += " reported in "
			if districtFlag:
				display_string += "<b>" + district + "</b>, "
			display_string += "<b>" + state + "</b> | Source: "
			display_string += "<a href=\"" + entry[6] + "\">[Link]</a><br>"
		
		if deathNumber:
			display_string = "<b>" + str(deathNumber) + "</b> death"
			if deathNumber > 1:
				display_string += "s"
			display_string += " reported in "
			if districtFlag:
				display_string += "<b>" + district + "</b>, "
			display_string += "<b>" + state + "</b> | Source: "
			display_string += "<a href=\"" + entry[6] + "\">[Link]</a><br>"

		DATA_latest_updates[str(count)] = display_string
		count += 1

	with open(DIR_DATA + "APIData/latest_updates.json", 'w') as FPtr:
		dump(DATA_latest_updates, FPtr)

	return 1

###### DEPRECATED ######
def latest_updates_V1(diffsList):
	###### DEPRECATED ######
	"""
		###### DEPRECATED ######
		Calculate the difference between old data and new data. Return some html looking thing

		This was a hodge podge of random code. Pls ignore it and forget it ever existed. Exists only
		in the event a certain cereal eater might require to revert back in the future.

		LOOK BELOW TO LATEST_UPDATES_V2 (Seriously, check that. Not this load of garbage.)

		You'd have to be a savage to use a deprecated function.
	"""
	with open(DIR_RES + "lastUpdate.json", 'r') as FPtr:
		PrevData = load(FPtr)

	# diffsList = diffsList[0]

	diff = {}
	for district in diffsList:
		# print (district)
		# print (diffsList[district], type(diffsList[district][0]))
		new = {}
		if district in PrevData:
			for sourceEntry in diffsList[district]:
				for field in sourceEntry:
					if (field == "infected") or (field == "dead"):
						new[field] = sourceEntry[field] - PrevData[district][field]
					else:
						new[field] = sourceEntry[field]
			new["status"] = "OLD"
		else:
			new = diffsList[district][0]
			new["status"] = "NEW"
		diff[district] = new

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

	with open(DIR_DATA + "APIData/latestupdates.json", 'w') as FPtr:
		dump(latestUpdates, FPtr)