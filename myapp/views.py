from django.shortcuts import render
from django.template import RequestContext
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from forms import MyRegistrationForm
from django.template.context_processors import csrf
from imdb import IMDb

# Create your views here.
def base(request):
	if request.user.is_authenticated():
		username = None
		username = request.user.username
		return render(request, 'base.html', {'username': username})
	return render(request, 'base.html')

def movies(request):
	return render(request, 'movies.html')

def tvShows(request):
	ia = IMDb()
	a = 'test'
	print a


  # movie_list is a list of Movie objects, with only attributes like 'title'
  # and 'year' defined.
	movie_list = ia.search_movie('the passion')
	# the first movie in the list.
	first_match = movie_list[0]
	# only basic information like the title will be printed.
  	print first_match.summary()
  # update the information for this movie.
  	ia.update(first_match)
  # a lot of information will be printed!
  	print first_match.summary()
  # retrieve trivia information and print it.
  	ia.update(first_match, info=['trivia'])
  	print first_match['trivia']
  # retrieve both 'quotes' and 'goofs' information (with a list or tuple)
  	
  # retrieve every available information.
 

	myMovieId = []
	myMovieTitle = []
	for movie in ia.search_movie('point break'):
		print movie['title']
		print movie.movieID
		myMovieId.append(movie.movieID)
		myMovieTitle.append(movie['title'])
	print myMovieId[0]
	print myMovieTitle[0]
	pBQuote = ia.get_movie('2058673')
	myPersonList = []
	for person in ia.search_person('Mel Gibson'):
		print person.personID, person['name']
		myPersonList.append(person['name'])
	print myPersonList

	return render(request, 'tvShows.html', {'testId': myMovieId[0], 'testTitle':myMovieTitle[0]})

def login(request):
	c= {}
	c.update(csrf(request))
	return render(request, 'login.html', c)

def auth_view(request):
	username = request.POST.get('username', '')
	password = request.POST.get('password', '')
	user = authenticate(username=username, password=password)
	if user is not None:
		if user.is_active:
			auth_login(request, user)
			return HttpResponseRedirect('/accounts/loggedin/')
		else:
			print ("The password is valid, but the account has been disabled!")
	else:
		return HttpResponseRedirect('/accounts/invalid/')

def loggedin(request):
	print request.user
	if request.user.is_authenticated():
		username = None
		username = request.user.username
		return render(request, 'loggedin.html', {'full_name': username})
	return render(request, 'loggedin.html', {'full_name': request.user.username})

def invalid_login(request):
	return render(request, 'invalid_login.html')

def logout(request):
	auth_logout(request)
	return render(request, 'logout.html')

def register_user(request):
	if request.method == 'POST':
		form = MyRegistrationForm(request.POST)
		print form.errors
		if form.is_valid():
			form.save()
			return HttpResponseRedirect('/accounts/register_success/')
		else:
			print "form is not valid"
			return render(request, 'register_success.html', form.errors)
		# print request.POST
		# if form.is_valid():
		# 	print form
		# 	form.save()
		# 	console.log("form submitted")
		# 	return render(request, 'register_success.html')
			# return HttpResponseRedirect('/acounts/register_success')

	args = {}
	args.update(csrf(request))

	args['form'] = MyRegistrationForm()

	return render(request, 'register.html', args)

def register_success(request):
	return render(request, 'register_success.html')

# def login(request):
# 	return render(request, 'login.html')

# def register(request):
# 	return render(request, 'register.html')

# def movie(request):
#     if request.method == 'POST':
#         title = request.POST.get('title')
#         release = request.POST.get('release')
#         movieType = request.POST.get('movieType')
        
#         response_data = {}

#         response_data['result'] = 'Create post successful!'
#         response_data['postpk'] = post.pk
#         response_data['text'] = post.text
#         response_data['created'] = movie.created.strftime('%B %d, %Y %I:%M %p')

#         return HttpResponse(
#             json.dumps(response_data),
#             content_type="application/json"
#         )
#     else:
#         return HttpResponse(
#             json.dumps({"nothing to see": "this isn't happening"}),
#             content_type="application/json"
#         )
