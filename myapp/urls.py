from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.base, name='base'),
    url(r'^movies/', views.movies, name='movies'),
    url(r'^tvShows/', views.tvShows, name='tvShows'),
]