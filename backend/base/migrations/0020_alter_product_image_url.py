# Generated by Django 4.2.8 on 2024-01-10 14:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0019_alter_product_image_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image_url',
            field=models.ImageField(blank=True, default='placeholder.jpg', null=True, upload_to='images'),
        ),
    ]
