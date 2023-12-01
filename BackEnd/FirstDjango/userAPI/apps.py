from django.apps import AppConfig


class UserapiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'userAPI'

    def ready(self):
        from . tasks import schedule_update
        schedule_update(repeat=60, repeat_until=None)
