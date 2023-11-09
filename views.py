# parking/views.py

from django.shortcuts import render
from .forms import SearchForm
from .models import Car

def search_cars(request):
    if request.method == 'POST':
        form = SearchForm(request.POST)
        if form.is_valid():
            plate_number = form.cleaned_data.get('plate_number')
            color = form.cleaned_data.get('color')

            cars = Car.objects.filter(
                plate_number__icontains=plate_number,
                color__icontains=color
            )

            return render(request, 'parking/search_results.html', {'cars': cars, 'form': form})
    else:
        form = SearchForm()

    return render(request, 'parking/search.html', {'form': form})
