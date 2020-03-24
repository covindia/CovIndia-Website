"""
	This slave's daily motivation: https://www.youtube.com/watch?v=aqmhzwSU12I
	I urge you to check it out. Like seriously, you're going through this code, why the heck not?

	It's not a Rick-Roll.

	Author: IceCereal and not Rick Astley
"""

from json import dump

DIR_DATA = "../data/"

def district_values(globalData):
	"""
		The API function for district-values. Saves output to DIR_DATA / APIData / district_values.json
	"""
	for district in globalData:
		globalData[district].pop("source", None)

	with open(DIR_DATA + "APIData/district_values.json", 'w') as FPtr:
		dump(globalData, FPtr)

	return 1

	# Yeah, that's it. So what?
