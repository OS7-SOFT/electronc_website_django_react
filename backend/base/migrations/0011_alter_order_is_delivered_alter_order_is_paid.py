# Generated by Django 4.2.8 on 2024-01-07 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_rename_orderitems_orderitem'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='is_delivered',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='is_paid',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]