# Generated by Django 3.2 on 2023-03-16 16:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('furni', '0004_alter_productimages_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productimages',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to='media/static'),
        ),
    ]