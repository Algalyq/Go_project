# Generated by Django 4.0.3 on 2023-02-08 18:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('furni', '0018_rating_iaa'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='rating',
            name='iaa',
        ),
    ]