"""
	This is the master program that takes care of everything. It summons other programs and does the necessary
	things required to keep https://covindia.com running.

	Author: IceCereal
"""

from subprocess import run
from datetime import datetime
from time import sleep
from BigDataBox import minion
from json import load, dump
from argparse import ArgumentParser

parser = ArgumentParser(description="https://covindia.com's complete overlord. Warning: Can be slightly moody  once in a while")
parser.add_argument("--minutes", '-m', type=int, nargs=1, required=False, default=[10], help="amount of time (in minutes, duh) to sleep for between updates of the website")

# TODO: Add arguments for RES, PUBLISH, SRC _DIRS
# TODO: Add arguments for branch
# TODO: Add verbosity

args = parser.parse_args()

DIR_RES = "res/"
DIR_PRODUCTION = "live/"
DIR_SRC = "src/"

DIR_DATA = "../data/"

if __name__ == "__main__":

	# Set our working variables
	branch = 'master'
	minutes = args.minutes[0]

	# Dictionaries that'll help us calculate the delta (i.e. live updates)
	PrevData = {}
	Data = {}

	# Get the last live update recorded
	prevDataFile = DIR_RES + "lastUpdate.json"

	while True:
		with open(prevDataFile, 'r') as F:
			PrevData = load(F)

		# Check if our code has changed from the git repository
		run(['git', 'fetch'])
		run(['git', 'pull', 'origin', branch])

		# Make minion run and do our dirty work
		Data, DiffsList = minion.do_your_work() # I know, cute right?

		# Calculate old data: Used for sending it to delta()
		diff = {}
		for district in Data:
			new = {}
			if district in PrevData:
				for field in Data[district]:
					if (field == "infected") or (field == "dead"):
						new[field] = Data[district][field] - PrevData[district][field]
					else:
						new[field] = Data[district][field]
				new["status"] = "OLD"
			else:
				new = Data[district]
				new["status"] = "NEW"
			diff[district] = new

		# Calculates Live Updates. Does it's thing. It's a slave, get over it.
		minion.delta(diff, DiffsList)

		# index.html got changed because of minion.do_your_work. Push it to origin for CD and deploying the build
		run(['git', 'add', DIR_PRODUCTION])
		run(['git', 'commit', '-a', '-m', '"Update ' + datetime.now().strftime("%Y-%m-%d %H:%M")+'"'])
		run(['git', 'push', 'origin', branch])

		# Data needs to be distributed amongst droplets. Triggers through git hooks
		run('git add .'.split(), cwd=DIR_DATA)
		run(['git', 'commit', '-a', '-m', '"Update ' + datetime.now().strftime("%Y-%m-%d %H:%M")+'"'], cwd=DIR_DATA)

		run(['git', 'push'], cwd=DIR_DATA)

		print ("Sleeping...,")

		sleep (60*minutes)
