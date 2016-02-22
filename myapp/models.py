from __future__ import unicode_literals

from django.db import models
# Create your models here
class User(models.Model):
	name = models.CharField(max_length = 30)
	password = models.CharField(max_length = 15)
	avatar_url = models.CharField(max_length = 100)
class Comment(models.Model):
	contentType = models.CharField(max_length = 7)
	content = models.CharField(max_length = 400)
	movie_id = models.IntegerField
	user_id = models.IntegerField
	tags = models.CharField(max_length=20)
