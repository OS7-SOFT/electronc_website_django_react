# Generated by Django 4.2.8 on 2024-01-09 17:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0015_rename_slod_count_product_sold_count'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='rating',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10, null=True),
        ),
    ]
