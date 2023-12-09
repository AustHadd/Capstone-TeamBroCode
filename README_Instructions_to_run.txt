Deployment Process

Installing required components

for the backend required libraries:
	run the 'install_req.bat file'. It should install all necessary python libraries for running the backend server. 

# to run the backend server
	make sure the working directory is in BackEnd/FirstDjango/ directory.
	In this directory is the manage.py file, which is how the server and background tasks are activated.

Commands:

	to run the server, in the BackEnd/FirstDjango/ directory, use this command: python manage.py runserver
		make sure the working directory is in BackEnd/FirstDjango/ directory.

	to start the background tasks (checking and updating the pre-existing parking lots): python manage.py process_tasks

		you can use a separate terminal to signal for the server to start doing its routine background tasks
		you can interrupt both with ctrl-c
		to check its effect, you can look at the Lot_availability.csv in the same folder, which will update to reflect any changes since the last background update
		(csv will show the parking lot's name, available spots, and total spots)

	to create new parking spots: run the ‘runCreateLots.bat’ file and select a video file for the lot you wish to edit/create.

		The pre-existing parking lots are in the lots folder under their name.
		Click and drag to create a box. Right click in a box to delete it.
		space bar quits and saves the current setup of the parking lot

	we provided a new video in the provided video folder to test out creating a brand new lot.
	WHEN EDITING AN EXISTING LOT, make sure the background task isn't running or else there could be errors with changing the lot as its updating.
	you can interrupt the update with ctrl-c. The server is fine, but the availability of a lot can't be updated while an admin is changing it
	 
	In order to deploy the front end the following instructions need to be followed. 
		User needs to install Expo go on your phone directly from App Store 
		Open FirstApp File and open the terminal
		Once you are on the FirstApp you will need to install these dependencies in order to run the project 
			npm install @react-navigation/native
			npm install react-native-reanimated react-native-gesture-handler react-native-screens
			npm install @react-navigation/material-top-tabs
			npm install react-navigation
		Once these libraries are installed the project can be deployed by just typing npm start on terminal and a QR code will be generated. You should access your camera and scan the QR code. This will open expo  go and deploy the application. From this step you should be fine to navigate through it. 
		Finally, if you want to test the fetching version of the project is as simple as following the previous steps and changing one line of code. This line of code is located in 
			BackEnd\FirstApp\components\globalContext
			It is the 5ft line of code and it looks like this const [domain, setDomain ] = useState("xxx.x.x.x:8000")
			You will only need to change the ”xxx.x.x.x” for your IPv4, and every time you want to check the state of this it should fetch and you can only type control v and it should fetch successfully.

	To test fetching:
		The above commands work fine to test the front and backend, but if you wanted to specifically test the fetching, follow these instructions

		Into a terminal, type ipconfig and copy the local IPv4 address.

		In the BackEnd/FirstDjango/FirstDjango/settings.py file replace the ‘xxx.xxx.x.xx’ in “ALLOWED_HOSTS = [‘localhost’, ‘xxx.xxx.x.xx’]” with the local IPv4 copied above.

		Use the same command as above to start the server, but use: “python manage.py runserver xxx.xxx.x.xx:8000” with the same local IPv4 address replacing the x’s.
