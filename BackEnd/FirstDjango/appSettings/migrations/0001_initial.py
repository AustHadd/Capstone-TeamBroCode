# Generated by Django 3.2.2 on 2023-09-09 18:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Setting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='Settings_name', max_length=256)),
                ('value', models.CharField(blank=True, default='', max_length=256)),
            ],
        ),
    ]
