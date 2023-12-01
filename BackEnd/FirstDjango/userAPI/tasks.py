from background_task import background
from background_task.models import Task
import updateLots

Task.objects.all().delete()

# Asynchronous task for removing old records
@background(schedule=5)
def schedule_update():
    # here is where we put the scheduled update for the parking lots
    print("Scheduled update beginning")
    updateLots.update_availability()
    print("Scheduled update complete")
#this is it where it is defined and thorws what the background task is and then we have to call it
