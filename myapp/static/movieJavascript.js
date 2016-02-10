$(document).ready(function() {
	$('.submit-btn').on('click', function(){
		var title = $('#title').val();
		console.log('title',title);
    $.ajax({
      url: "http://api.themoviedb.org/3/search/movie?api_key=5da4693192fc98b8390ac6cebfc81c82&query="+title,
      dataType: "json",
      method: "GET",
      success: function(data, textStatus, jqXHR){
        console.log("Success");
        for (i=0;i<data['results'].length;i++){
          var movieId = data['results'][i]['id'];
          $.ajax({
            url: "http://api.themoviedb.org/3/movie/"+movieId+"?api_key=5da4693192fc98b8390ac6cebfc81c82&append_to_response=credits",
            dataType: "json",
            method: "GET",
            success: function(data, textStatus, jqXHR){
              console.log(data);
              console.log(data['credits']['cast'])
              $("#results").append("<li class='movieListings'><h2>"+data['title']+"</h2><h5>"+data['release_date']+"</h5><a href='"+data['homepage']+"'>"+data['homepage']+"</a><br><img class='moviePoster' src='http://image.tmdb.org/t/p/w500/"+data['poster_path']+"'/><h4>"+data['tagline']+"</h4><h5>"+data['overview']+"</h5></li>");
              for (i=0;i<data['credits']['cast'].length;i++) {
                $("#results").append("<li><img class='moviePoster' src='http://image.tmdb.org/t/p/w500/"+data['credits']['cast'][i]['profile_path']+"'/><br>Character: "+data['credits']['cast'][i]['character']+"<br>Played by: "+data['credits']['cast'][i]['name']+"</li>");
              }
              
            },
          });
        }
      },
    });
	});
});