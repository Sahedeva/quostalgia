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
              var resultStr ="<li class='movieListings'><h2>"+data['title']+"</h2><h5>"+data['release_date']+"</h5><img class='backdrop' src='http://image.tmdb.org/t/p/w500/"+data['backdrop_path']+"'/><img class='moviePoster' src='http://image.tmdb.org/t/p/w500/"+data['poster_path']+"'/><br><a target='_blank' href='"+data['homepage']+"'>"+data['homepage']+"</a><br><h4>"+data['tagline']+"</h4><h5>"+data['overview']+"</h5></li><div class='castDiv'>";
              for (i=0;i<data['credits']['cast'].length;i++) {
                if(i%6==0){
                  resultStr +="<div style='height: 220px max-height:220px overflow:auto' class='row'>"
                }
                resultStr += "<div class='col-xs-2'><br><img class='castPoster' src='http://image.tmdb.org/t/p/w500/"+data['credits']['cast'][i]['profile_path']+"'/><br><span style='color:red!important'>"+data['credits']['cast'][i]['character']+"</span><br><span class='castName' style='color:blue!important' title='"+data['credits']['cast'][i]['id']+"'>"+data['credits']['cast'][i]['name']+"</span></div>";
                if((i+1)%6==0||i==(data['credits']['cast'].length-1)){
                  resultStr +="</div>"
                }
              }
              resultStr +="</div>"
              $("#results").append(resultStr);
              $(".castName").on('click', function(){
                var personId = $(this).attr('title');
                $.ajax({
                  url: "http://api.themoviedb.org/3/person/"+personId+"?api_key=5da4693192fc98b8390ac6cebfc81c82",
                  dataType: "json",
                  method: "GET",
                  success: function(data, textStatus, jqXHR){
                    console.log(data)
                  }
                });
              });
            },
          });
        }
      },
    });
	});
});