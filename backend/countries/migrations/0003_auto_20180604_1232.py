# Generated by Django 2.0.5 on 2018-06-04 17:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('countries', '0002_auto_20180604_1118'),
    ]

    operations = [
        migrations.RenameField(
            model_name='countryinfo',
            old_name='country_code',
            new_name='code',
        ),
        migrations.RenameField(
            model_name='countryinfo',
            old_name='country_name',
            new_name='name',
        ),
    ]