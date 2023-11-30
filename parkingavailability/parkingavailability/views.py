import queue
import threading

from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import redirect


def home(request):
    context = {
        "title": "HELLO"
    }
    return render(request, "index.html", context)


def make_parking_spots(request):
    if request.method == 'POST' and 'edit_parking' in request.POST:
        from . import main

        # threading is probably unnecessary, but just in case
        que = queue.Queue()
        thread1 = threading.Thread(target=main.parking_availability())
        thread1.start()

        return redirect(request.META.get('HTTP_REFERER'))


def update_parking_spots(request):
    if request.method == 'POST' and 'update_parking' in request.POST:
        from . import main

        # threading is probably unnecessary, but just in case
        que = queue.Queue()
        thread1 = threading.Thread(target=main.update_availability())
        thread1.start()

        return redirect(request.META.get('HTTP_REFERER'))

#def read_csv():
#   if whatever
#       read csv
#       do stuff with csv data