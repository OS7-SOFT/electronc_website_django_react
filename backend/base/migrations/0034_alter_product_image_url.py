# Generated by Django 4.2.8 on 2024-01-28 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0033_alter_product_image_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image_url',
            field=models.ImageField(blank=True, default='/placeholder.jpg', upload_to='static/images'),
        ),
    ]