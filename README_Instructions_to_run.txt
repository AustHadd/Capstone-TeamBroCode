# installing required components

run the 'install_req.bat file'. It should install all necessary python libraries for running the backend server.

# to run the backend server
make sure the working directory is in BackEnd/FirstDjango/ directory.
In this directory is the manage.py file, which is how the server and background tasks are activated

commands:
to run the server, in the BackEnd/FirstDjango/ directory, use this command: python manage.py runserver

to start the background tasks (checking and updating the pre-existing parking lots): python manage.py process_tasks
    you can use a separate terminal to signal for the server to start doing its routine background tasks
    you can interrupt both with ctrl-c
    to check its effect, you can look at the csv in the same folder, which will update to reflect any changes since the last background update
    (csv will show the parking lot's name, available spots, and total spots)

to create new parking spots: run the runCreateLots.bat file and select a video file for the lot you wish to edit/create.
    the pre-existing parking lots are in the lots folder under their name.
    Click and drag to create a box. Right click in a box to delete it.
    space bar quits and saves the current setup of the parking lot

    we provided a new video in the provided video folder to test out creating a brand new lot.
    WHEN EDITING AN EXISTING LOT, make sure the background task isn't running or else there could be errors with changing the lot as its updating.
    you can interrupt the update with ctrl-c. The server is fine, but the availability of a lot can't be updated while an admin is changing it

# TODO: front end use
use ipconfig command in terminal and copy your IPv4 address. in the BackEnd/FirstDjango/FirstDjango/settings.py file
in "ALLOWED_HOSTS = ['localhost', 'xxx.xxx.x.xx']" replace the 'xxx.xxx.x.xx' with the local ipv4 address