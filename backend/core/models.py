from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    ROLES = [
        ('admin', 'Admin'),
        ('secretar', 'Secretar'),
        ('transportator', 'Transportator'),
        ('inactiv', 'Inactiv'),
    ]
    role = models.CharField(max_length=30, choices=ROLES, default="inactiv")

    # Create your own user fields