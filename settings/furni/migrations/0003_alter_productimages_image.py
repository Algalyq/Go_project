# Generated by Django 3.2 on 2023-03-16 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('furni', '0002_alter_productimages_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productimages',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to='static/medai'),
        ),
    ]