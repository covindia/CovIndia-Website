"""
	This is the master program that takes care of everything. It summons other programs and does the necessary
	things required to keep https://covindia.com running.

	Overlord does a lot of work, indeed. What must be it's motivation, you ask? It's this stackoverflow answer:
	https://stackoverflow.com/a/1732454

	Have fun going down that hole.

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

# TODO: Complete todos

args = parser.parse_args()

DIR_RES = "res/"
DIR_PRODUCTION = "live/"
DIR_SRC = "src/"

DIR_DATA = "../data/"

if __name__ == "__main__":

	# Set our working variables
	branch = 'master'
	minutes = args.minutes[0]

	while True:
		# Check if our code has changed from the git repository
		run(['git', 'fetch'])
		run(['git', 'pull', 'origin', branch])

		# Make minion run and do our dirty work
		minion.do_your_work() # I know, cute right?

		# Data needs to be distributed amongst droplets. Triggers through git hooks
		run('git add .'.split(), cwd=DIR_DATA)
		run(['git', 'commit', '-a', '-m', '"Update ' + datetime.now().strftime("%Y-%m-%d %H:%M")+'"'], cwd=DIR_DATA)

		run(['git', 'push'], cwd=DIR_DATA)

		print ("Sleeping...")

		sleep (60*minutes)
