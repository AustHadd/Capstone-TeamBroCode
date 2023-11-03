from django.shortcuts import render
from .models import ParkingFacility
from django.http import JsonResponse

def search_parking(request):
    query = request.GET.get('query', '').lower()
    results = ParkingFacility.objects.filter(models.Q(name__icontains=query) | models.Q(location__icontains=query))

    data = []
    for facility in results:
        data.append({
            "id": facility.id,
            "name": facility.name,
            "location": facility.location,
            "capacity": facility.capacity,
            "available_spaces": facility.available_spaces,
        })

    return JsonResponse(data, safe=False)
