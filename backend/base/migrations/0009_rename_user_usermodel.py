# Generated by Django 4.2.8 on 2024-01-07 14:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('admin', '0003_logentry_add_action_flag_choices'),
        ('auth', '0012_alter_user_first_name_max_length'),
        ('base', '0008_rename_brandmodel_brand_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='User',
            new_name='UserModel',
        ),
    ]
