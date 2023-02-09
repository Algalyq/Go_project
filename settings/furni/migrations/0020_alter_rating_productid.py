# Generated by Django 4.1.3 on 2023-02-08 19:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('furni', '0019_remove_rating_iaa'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rating',
            name='ProductID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ratings', to='furni.products', verbose_name='furniture'),
        ),
    ]
