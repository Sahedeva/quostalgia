$(document).ready(function() {
console.log("%c                                                     \n             *     ,MMM8&&&.            *            \n                  MMMM88&&&&&    .                   \n                 MMMM88&&&&&&&                       \n     *           MMM88&&&&&&&&                       \n                 MMM88&&&&&&&&                       \n                 'MMM88&&&&&&'                       \n                 'MMM88&&&&&&'                       \n                   'MMM8&&&'      *                  \n          |\\___/|                                    \n          )     (             .              '       \n         =\\     /=                                   \n           )===(       *                             \n          /     \\                                    \n          /     \\                                    \n          |     |                                    \n         /       \\                                   \n         \\       /                                   \n  _/\\_/\\_/\\__  _/_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_        \n  |  |  |  |( (  |  |  |  |  |  |  |  |  |  |        \n  |  |  |  | ) ) |  |  |  |  |  |  |  |  |  |        \n  |  |  |  |(_(  |  |  |  |  |  |  |  |  |  |        \n  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |        \n  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |        \n  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |        \n                                                     \n         consoleCat - by Bob   (MEOW)                \n                                                     ","color:white; background-color:black;");

	$('form').on('submit', function(){
    $("#results").html("");
		var title = $('#title').val();
		console.log("%c                                                 \n           __..--''``\\--....___   _..,_          \n       _.-'    .-/\";  `        ``<._  ``-+'~=.   \n   _.-' _..--.'_    \\                    `(^) )  \n  ((..-'    (< _     ;_..__               ; `'   \n             `-._,_)'      ``--...____..-'       \n                                                 \n                                                 \n            consoleCat - by Bob                  \n                                                 ", "color:yellow;background-color:black;");
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
              var resultStr ="<li class='movieListings'><h2>"+data['title']+"</h2>"
              if (data['release_date']==null){
                      var easyDate = "Release date not available";
                    } else {
                      var year = data['release_date'].substring(0,4);
                      var date = data['release_date'].substring(5,10);
                      var easyDate = date+"-"+year;
                    }
              resultStr += "<h5>"+easyDate+"</h5>";
              if (data['backdrop_path']==null) {
                resultStr +="<img class='backdrop' src='/static/images/backdropNull.png'/>";
              } else {
                resultStr +="<img class='backdrop' src='http://image.tmdb.org/t/p/w500/"+data['backdrop_path']+"'/>";
              }
              if (data['poster_path']==null) {
                resultStr +="<img class='moviePoster' src='/static/images/posterNull.png'/>";
              } else {
                resultStr +="<img class='moviePoster' src='http://image.tmdb.org/t/p/w500/"+data['poster_path']+"'/>";
              }
              resultStr += "<br><a target='_blank' href='"+data['homepage']+"'>"+data['homepage']+"</a><br><h4>"+data['tagline']+"</h4><h5>"+data['overview']+"</h5></li><h2 style='text-align:center; color:yellow;'>Crew</h2><div class='crewDiv'>";
              var directingCrewArray = [];
              var producingCrewArray = [];
              var writingCrewArray = [];
              var soundCrewArray = []; 
              for (i=0;i<data['credits']['crew'].length;i++) {
                if (data['credits']['crew'][i]['department']=="Directing") {
                  directingCrewArray.push(data['credits']['crew'][i]);
                } else if (data['credits']['crew'][i]['department']=="Writing") {
                  writingCrewArray.push(data['credits']['crew'][i]);
                } else if (data['credits']['crew'][i]['department']=="Production") {
                  producingCrewArray.push(data['credits']['crew'][i]);
                } else if (data['credits']['crew'][i]['department']=="Sound") {
                  soundCrewArray.push(data['credits']['crew'][i]);
                }
              }
              resultStr += "<br><h3 style='text-align:center;color:green;text-shadow:1px 1px 1px black;margin-top:5px;'>Directing Department</h3>";
              for (i=0;i<directingCrewArray.length;i++) {
                if(i%6==0){
                  resultStr +="<div style='height: 220px max-height:220px overflow:auto' class='row'>"
                }
                if (directingCrewArray.length==5&&i==0) {
                  resultStr += "<div class='col-xs-1'></div>";
                  resultStr += "<div class='col-xs-2'>";
                } else if (directingCrewArray.length==5){
                  resultStr += "<div class='col-xs-2'>";
                } else if (directingCrewArray.length<6) {
                  resultStr += "<div class='col-xs-"+12/(directingCrewArray.length)+"'>";
                } else {
                  resultStr += "<div class='col-xs-2'>";
                }
                if (directingCrewArray[i]['profile_path']==null) {
                  resultStr += "<img class='castPoster' src='/static/images/nullImage.jpg'/>"
                } else {
                  resultStr +="<img class='castPoster' src='http://image.tmdb.org/t/p/w500/"+directingCrewArray[i]['profile_path']+"'/>"
                }
                resultStr += "<br><span class='castCrewTitle'>"+directingCrewArray[i]['job']+"</span><br><button type='button' class='castName' data-toggle='modal' data-target='#myModal' style='color:blue!important; border-radius:20px;max-width:115px;' title='"+directingCrewArray[i]['id']+"'>"+directingCrewArray[i]['name']+"</button></div>";
                if((i+1)%6==0||i==(directingCrewArray.length-1)){
                  resultStr +="</div>"
                }
              }
              resultStr += "<br><h3 style='text-align:center;color:green;text-shadow:1px 1px 1px black;margin-top:5px;'>Writing Department</h3>";
              for (i=0;i<writingCrewArray.length;i++) {
                if(i%6==0){
                  resultStr +="<div style='height: 220px max-height:220px overflow:auto' class='row'>"
                }
                if (writingCrewArray.length==5&&i==0) {
                  resultStr += "<div class='col-xs-1'></div>";
                  resultStr += "<div class='col-xs-2'>";
                } else if (writingCrewArray.length==5){
                  resultStr += "<div class='col-xs-2'>";
                } else if (writingCrewArray.length<6) {
                  resultStr += "<div class='col-xs-"+12/(writingCrewArray.length)+"'>";
                } else {
                  resultStr += "<div class='col-xs-2'>";
                }
                if (writingCrewArray[i]['profile_path']==null) {
                  resultStr += "<img class='castPoster' src='/static/images/nullImage.jpg'/>"
                } else {
                  resultStr +="<img class='castPoster' src='http://image.tmdb.org/t/p/w500/"+writingCrewArray[i]['profile_path']+"'/>"
                }
                resultStr += "<br><span class='castCrewTitle'>"+writingCrewArray[i]['job']+"</span><br><button type='button' class='castName' data-toggle='modal' data-target='#myModal' style='color:blue!important; border-radius:20px;max-width:115px;' title='"+writingCrewArray[i]['id']+"'>"+writingCrewArray[i]['name']+"</button></div>";
                if((i+1)%6==0||i==(writingCrewArray.length-1)){
                  resultStr +="</div>"
                }
              }
              resultStr += "<h3 style='text-align:center;color:green;text-shadow:1px 1px 1px black;margin-top:5px;'>Production Department</h3>";
              for (i=0;i<producingCrewArray.length;i++) {
                if(i%6==0){
                  resultStr +="<div style='height: 220px max-height:220px overflow:auto' class='row'>"
                }
                if (producingCrewArray.length==5&&i==0) {
                  resultStr += "<div class='col-xs-1'></div>";
                  resultStr += "<div class='col-xs-2'>";
                } else if (producingCrewArray.length==5){
                  resultStr += "<div class='col-xs-2'>";
                } else if (producingCrewArray.length<6) {
                  resultStr += "<div class='col-xs-"+12/(producingCrewArray.length)+"'>";
                } else {
                  resultStr += "<div class='col-xs-2'>";
                }
                if (producingCrewArray[i]['profile_path']==null) {
                  resultStr += "<img class='castPoster' src='/static/images/nullImage.jpg'/>"
                } else {
                  resultStr +="<img class='castPoster' src='http://image.tmdb.org/t/p/w500/"+producingCrewArray[i]['profile_path']+"'/>"
                }
                resultStr += "<br><span class='castCrewTitle'>"+producingCrewArray[i]['job']+"</span><br><button type='button' class='castName' data-toggle='modal' data-target='#myModal' style='color:blue!important; border-radius:20px;max-width:115px;' title='"+producingCrewArray[i]['id']+"'>"+producingCrewArray[i]['name']+"</button></div>";
                if((i+1)%6==0||i==(producingCrewArray.length-1)){
                  resultStr +="</div>"
                }
              }
              resultStr += "<br><h3 style='text-align:center;color:green;text-shadow:1px 1px 1px black;margin-top:5px;'>Sound Department</h3>";
              for (i=0;i<soundCrewArray.length;i++) {
                if(i%6==0){
                  resultStr +="<div style='height: 220px max-height:220px overflow:auto' class='row'>"
                }
                if (soundCrewArray.length==5&&i==0) {
                  resultStr += "<div class='col-xs-1'></div>";
                  resultStr += "<div class='col-xs-2'>";
                } else if (soundCrewArray.length==5){
                  resultStr += "<div class='col-xs-2'>";
                } else if (soundCrewArray.length<6) {
                  resultStr += "<div class='col-xs-"+12/(soundCrewArray.length)+"'>";
                } else {
                  resultStr += "<div class='col-xs-2'>";
                }
                if (soundCrewArray[i]['profile_path']==null) {
                  resultStr += "<img class='castPoster' src='/static/images/nullImage.jpg'/>"
                } else {
                  resultStr +="<img class='castPoster' src='http://image.tmdb.org/t/p/w500/"+soundCrewArray[i]['profile_path']+"'/>"
                }
                resultStr += "<br><span class='castCrewTitle'>"+soundCrewArray[i]['job']+"</span><br><button type='button' class='castName' data-toggle='modal' data-target='#myModal' style='color:blue!important; border-radius:20px;max-width:115px;' title='"+soundCrewArray[i]['id']+"'>"+soundCrewArray[i]['name']+"</button></div>";
                if((i+1)%6==0||i==(soundCrewArray.length-1)){
                  resultStr +="</div>"
                }
              }
              resultStr +="<br></div><h2 style='text-align:center; color:yellow;'>Cast</h2><div class='castDiv'>";
              for (i=0;i<data['credits']['cast'].length;i++) {
                if(i%6==0){
                  resultStr +="<div style='height: 220px max-height:220px overflow:auto' class='row'>"
                }
                resultStr += "<div class='col-xs-2'>";
                if (data['credits']['cast'][i]['profile_path']==null) {
                  resultStr += "<img class='castPoster' src='/static/images/nullImage.jpg'/>"
                } else {
                  resultStr +="<img class='castPoster' src='http://image.tmdb.org/t/p/w500/"+data['credits']['cast'][i]['profile_path']+"'/>"
                }
                resultStr += "<br><span class='castCrewTitle'>"+data['credits']['cast'][i]['character']+"</span><br><button type='button' class='castName' data-toggle='modal' data-target='#myModal' style='color:blue!important; border-radius:20px;max-width:115px;' title='"+data['credits']['cast'][i]['id']+"'>"+data['credits']['cast'][i]['name']+"</button></div>";
                if((i+1)%6==0||i==(data['credits']['cast'].length-1)){
                  resultStr +="</div>"
                }
              }
              resultStr +="<br></div>"
              $("#results").append(resultStr);
              $(".castName").on('click', function(){
                var personId = $(this).attr('title');
                $.ajax({
                  url: "http://api.themoviedb.org/3/person/"+personId+"?api_key=5da4693192fc98b8390ac6cebfc81c82",
                  dataType: "json",
                  method: "GET",
                  success: function(data, textStatus, jqXHR){
                    console.log(data)
                    if (data['birthday']==null){
                      var easyDate = "Not available";
                    } else {
                      var year = data['birthday'].substring(0,4);
                      var date = data['birthday'].substring(5,10);
                      var easyDate = date+"-"+year;
                    }
                    $('.modal-title').html(data['name']);
                    var bodyStr = "<div class='row'><div class='col-xs-3'>"
                    if (data['profile_path']==null) {
                      bodyStr += "<img style='display:block;margin-left:auto;' class='castPoster' src='/static/images/nullImage.jpg'/></div>";
                    } else {
                      bodyStr +="<img style='display:block;margin-left:auto;' class='castPoster' src='http://image.tmdb.org/t/p/w500/"+data['profile_path']+"'/></div>";
                    }
                    if (data['place_of_birth']==null){
                      var birthPlace = "Not available";
                    } else {
                      var birthPlace = data['place_of_birth'];
                    }
                    if (data['biography']==null){
                      var biography = "Not available";
                    } else {
                      var biography = data['biography'];
                    }
                    bodyStr += "<div class='col-xs-9'><div style='font-weight:bold' class='row'><div class='col-xs-12'><span style='font-weight: bold; color: blue'>Place of birth: </span>"+birthPlace+"</div><div class='col-xs-12'><span style='font-weight:bold; color:blue'>Birthday: </span>"+easyDate+"</div><div class='col-xs-12'><span style='font-weight: bold; color: blue'>Biography: </span>"+biography+"</div></div></div>";
                    $('.modal-body').html(bodyStr);
                  }
                });
              });
            },
          });
        }
      },
    });
    return false; 
	});
});