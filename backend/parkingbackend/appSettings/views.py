from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status  # Import status for HTTP status codes

from .models import Setting


class SettingsView(APIView):
    def get(self, request, format=None):
        settingsDict = {}
        try:
            settingObjects = Setting.objects.all()
            for setting in settingObjects:
                settingsDict[setting.name] = setting.value

            return Response(settingsDict, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, format=None):
        # This view is going to create new settings in the DB
        # Json Object: {"settings" : [{"NAME: NAME, "VALUE": VALUE}, {"NAME": NAME, "VALUE": VALUE}]}
        # Use .get() to handle missing key gracefully
        settings = request.data.get('settings', [])
        bad_settings = []

        for setting in settings:
            try:
                new_setting = Setting(name=setting.get(
                    'NAME'), value=setting.get('VALUE'))
                new_setting.save()
            except Exception as e:
                bad_settings.append(setting)

        if len(bad_settings) > 0:
            return Response({"INVALID SETTINGS": bad_settings}, status=200)
        else:
            return Response(status=200)
