from django.apps import AppConfig
#This stats the server and it request the updates, this is connected to tasks.py

class UserapiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'userAPI'

    def ready(self):
        from . tasks import schedule_update
        schedule_update(repeat=60, repeat_until=None)
