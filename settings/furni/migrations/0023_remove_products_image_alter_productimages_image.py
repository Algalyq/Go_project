# Generated by Django 4.1.3 on 2023-02-09 14:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('furni', '0022_products_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='products',
            name='image',
        ),
        migrations.AlterField(
            model_name='productimages',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to='img'),
        ),
    ]