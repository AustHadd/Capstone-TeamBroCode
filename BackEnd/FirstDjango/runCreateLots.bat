@echo off & py -x "%~f0" %* & goto :eof
import sys
from createLots import create_parking_spots

create_parking_spots()
