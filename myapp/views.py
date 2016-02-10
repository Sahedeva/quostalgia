from django.shortcuts import render
from django.template import RequestContext
# Create your views here.
def index(request):
	return render(request, 'index.html')

def movies(request):
	return render(request, 'movies.html')

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
