# Generated by Django 5.0 on 2024-01-08 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='status',
            field=models.CharField(choices=[('LISTED', 'Listed'), ('SOLD', 'Sold'), ('PURCHASED', 'Purchased')], default='LISTED', max_length=10),
        ),
    ]