# Generated by Django 4.2.8 on 2024-01-06 20:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_rename_image_productmodel_image_url'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_price', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('is_paid', models.BooleanField(default=False)),
                ('paid_date', models.DateTimeField(blank=True, null=True)),
                ('is_delivered', models.BooleanField(default=False)),
                ('delivered_date', models.DateTimeField(blank=True, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterModelOptions(
            name='productmodel',
            options={'ordering': ['-updated', '-created']},
        ),
        migrations.RenameField(
            model_name='productmodel',
            old_name='create',
            new_name='created',
        ),
        migrations.RenameField(
            model_name='productmodel',
            old_name='update',
            new_name='updated',
        ),
        migrations.CreateModel(
            name='ShippingAddressModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(blank=True, max_length=100, null=True)),
                ('address', models.CharField(blank=True, max_length=100, null=True)),
                ('email', models.CharField(blank=True, max_length=100, null=True)),
                ('city', models.CharField(blank=True, max_length=100, null=True)),
                ('country', models.CharField(blank=True, max_length=100, null=True)),
                ('zip_code', models.IntegerField(blank=True, null=True)),
                ('phone', models.IntegerField(blank=True, null=True)),
                ('order', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.ordermodel')),
            ],
        ),
        migrations.CreateModel(
            name='ReviewModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.CharField(blank=True, max_length=500, null=True)),
                ('rating', models.IntegerField(blank=True, default=0, null=True)),
                ('craeted', models.DateTimeField(auto_now_add=True)),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.productmodel')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='OrderItemsModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, null=True)),
                ('quantity', models.IntegerField(blank=True, default=0, null=True)),
                ('order', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.ordermodel')),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.productmodel')),
            ],
        ),
    ]
