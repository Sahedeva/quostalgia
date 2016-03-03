$(document).ready(function() {
console.log("%c                                                     \n             *     ,MMM8&&&.            *            \n                  MMMM88&&&&&    .                   \n                 MMMM88&&&&&&&                       \n     *           MMM88&&&&&&&&                       \n                 MMM88&&&&&&&&                       \n                 'MMM88&&&&&&'                       \n                 'MMM88&&&&&&'                       \n                   'MMM8&&&'      *                  \n          |\\___/|                                    \n          )     (             .              '       \n         =\\     /=                                   \n           )===(       *                             \n          /     \\                                    \n          /     \\                                    \n          |     |                                    \n         /       \\                                   \n         \\       /                                   \n  _/\\_/\\_/\\__  _/_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_        \n  |  |  |  |( (  |  |  |  |  |  |  |  |  |  |        \n  |  |  |  | ) ) |  |  |  |  |  |  |  |  |  |        \n  |  |  |  |(_(  |  |  |  |  |  |  |  |  |  |        \n  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |        \n  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |        \n  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |        \n                                                     \n         consoleCat - by Bob   (MEOW)                \n                                                     ","color:white; background-color:black;");

	$('form').on('submit', function(){
		$("#results").html("");
		var title = $('#title').val();
		$('#title').val("");
		console.log("%c                                                 \n           __..--''``\\--....___   _..,_          \n       _.-'    .-/\";  `        ``<._  ``-+'~=.   \n   _.-' _..--.'_    \\                    `(^) )  \n  ((..-'    (< _     ;_..__               ; `'   \n             `-._,_)'      ``--...____..-'       \n                                                 \n                                                 \n            consoleCat - by Bob                  \n                                                 ", "color:yellow;background-color:black;");
    $.ajax({
      url: "http://api.themoviedb.org/3/search/tv?api_key=5da4693192fc98b8390ac6cebfc81c82&query="+title,
      dataType: "json",
      method: "GET",
      success: function(data, textStatus, jqXHR){
        console.log("Success");
        console.log(data);
        var entriesNum = data['results'].length;
        var entriesName = [];
        var entriesId = [];
        for (i=0;i<entriesNum;i++){
        	entriesName.push(data['results'][i]['name']);
        	entriesId.push(data['results'][i]['id']);
        }
        for (i=0;i<data['results'].length;i++){
          var movieId = data['results'][i]['id'];
          $.ajax({
            url: "http://api.themoviedb.org/3/tv/"+movieId+"?api_key=5da4693192fc98b8390ac6cebfc81c82&append_to_response=credits",
            dataType: "json",
            method: "GET",
            success: function(data, textStatus, jqXHR){
            	console.log('tv/id/credits: ',data);
            	console.log('this should add nav links to each result');
            	var resultStr = "<div style='position:relative;'><div class='tvNavLinks'><ul style='list-style:none;'>"
            	for (i=0;i<data['number_of_seasons']+1;i++){
            		resultStr += "<li><a href='#"+data['id']+i+"'>Season "+i+"</a></li>";
            	}
            	resultStr += "</ul></div>";
            	resultStr += "<div class='tvRightNavLinks'><ol>"
            	for (i=0;i<entriesNum;i++){
            		resultStr += "<li><a href='#"+entriesId[i]+"'>"+entriesName[i]+"</a></li>";
            	}
            	resultStr += "</ol></div>";
              resultStr += "<li class='movieListings'><h2 id='"+data['id']+"' style='color:yellow!important; text-shadow: 2px 2px 2px black;'>"+data['name']+"</h2><form style='display:none;' class='quoteCommentButton'><input type='checkbox' name='gender' value='other'> Tag this for quote/comment</form><div class='tvInfo'>";
              if (data['original_name']) {
              	if(data['original_name']!=data['name']){
              		resultStr +="<h4>Original Name: <span style='color:red!important; text-shadow: 2px 2px 2px black;font-size:22px;'>"+data['original_name']+"</span></h4>"
              	}
              }
              if (data['original_language']) {
              	if(data['original_language']=="ja"){
              		resultStr +="<h4>Original Language: <span style='color:green!important;font-size:20px;'>Japanese</span></h4>";
              	}
              }
              if (data['first_air_date']==null){
                      var easyDate = "First air date not available";
                    } else {
                      var year = data['first_air_date'].substring(0,4);
                      var date = data['first_air_date'].substring(5,10);
                      var easyDate = date+"-"+year;
                    }
              resultStr += "<h5>First air date: "+easyDate+"</h5>";
              if (data['last_air_date']==null){
                      var easyDate = "Last air date not available";
                    } else {
                      var year = data['last_air_date'].substring(0,4);
                      var date = data['last_air_date'].substring(5,10);
                      var easyDate = date+"-"+year;
                    }
              resultStr += "<h5>Last air date: "+easyDate+"</h5>";
							resultStr += "<h5>Status: "+data['status']+"</h5></div>";
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
              resultStr += "<br><div class='tvInfo'>";
              if (data['homepage']) {
                resultStr +="<br><a style='font-size:20px' target='_blank' href='"+data['homepage']+"'>"+data['homepage']+"</a><br>";
              }
              resultStr +="<h4 id='overview'><br>"+data['overview']+"</h4></li></div>";
              if (data['seasons']) {
              	resultStr +="<div class='tvInfo'><h4 style='text-align:center;'>Number of Seasons: "+data['seasons'].length+"</h4></div>"
              }
              if (data['credits']['crew'].length!=0){
              	resultStr += "<h2 style='text-align:center;color:yellow;font-weight:bold;'>Crew</h2><div class='crewDiv'>";
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
              if (directingCrewArray.length!=0) {
              	resultStr += "<h3 style='text-align:center;color:0060;font-weight:bold;padding-top:8px;'>Directing Department</h3>";
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
	                resultStr += "<br><span class='castCrewTitle'>"+directingCrewArray[i]['job']+"</span><br><button type='button' class='castName' data-toggle='modal' data-target='#myModal' style='color:blue!important; border-radius:20px;' title='"+directingCrewArray[i]['id']+"'>"+directingCrewArray[i]['name']+"</button></div>";
	                if((i+1)%6==0||i==(directingCrewArray.length-1)){
	                  resultStr +="</div>"
	                }
	              }
		          }
	            if (writingCrewArray.length!=0) {
	              resultStr += "<h3 style='text-align:center;color:0060;font-weight:bold;'>Writing Department</h3>";
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
	                resultStr += "<br><span class='castCrewTitle'>"+writingCrewArray[i]['job']+"</span><br><button type='button' class='castName' data-toggle='modal' data-target='#myModal' style='color:blue!important; border-radius:20px;' title='"+writingCrewArray[i]['id']+"'>"+writingCrewArray[i]['name']+"</button></div>";
	                if((i+1)%6==0||i==(writingCrewArray.length-1)){
	                  resultStr +="</div>"
	                }
	              }
	            }
	            if (producingCrewArray.length!=0) {
	              resultStr += "<h3 style='text-align:center;color:0060;font-weight:bold;'>Production Department</h3>";
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
	                resultStr += "<br><span class='castCrewTitle'>"+producingCrewArray[i]['job']+"</span><br><button type='button' class='castName' data-toggle='modal' data-target='#myModal' style='color:blue!important; border-radius:20px;' title='"+producingCrewArray[i]['id']+"'>"+producingCrewArray[i]['name']+"</button></div>";
	                if((i+1)%6==0||i==(producingCrewArray.length-1)){
	                  resultStr +="</div>"
	                }
	              }
		          }
		          if (soundCrewArray.length!=0) {
	              resultStr += "<h3 style='text-align:center;color:0060;font-weight:bold;'>Sound Department</h3>";
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
	                resultStr += "<br><span class='castCrewTitle'>"+soundCrewArray[i]['job']+"</span><br><button type='button' class='castName' data-toggle='modal' data-target='#myModal' style='color:blue!important; border-radius:20px;' title='"+soundCrewArray[i]['id']+"'>"+soundCrewArray[i]['name']+"</button></div>";
	                if((i+1)%6==0||i==(soundCrewArray.length-1)){
	                  resultStr +="</div>"
	                }
	              }
	            }
	          }
	          if (data['credits']['cast'].length!=0){
              resultStr +="<br></div><h2 style='text-align:center; color:yellow;font-weight:bold;'>Cast</h2><div class='castDiv'>";
              for (i=0;i<data['credits']['cast'].length;i++) {
                if(i%6==0){
                  resultStr +="<div style='height: 220px max-height:220px overflow:auto' class='row'>"
                }
                if (data['credits']['cast'].length==5&&i==0) {
	                  resultStr += "<div class='col-xs-1'></div>";
	                  resultStr += "<div class='col-xs-2'>";
	                } else if (data['credits']['cast'].length==5){
	                  resultStr += "<div class='col-xs-2'>";
	                } else if (data['credits']['cast'].length<6) {
	                  resultStr += "<div class='col-xs-"+12/(data['credits']['cast'].length)+"'>";
	                } else {
	                  resultStr += "<div class='col-xs-2'>";
	                }
                if (data['credits']['cast'][i]['profile_path']==null) {
                  resultStr += "<img class='castPoster' src='/static/images/nullImage.jpg'/>"
                } else {
                  resultStr +="<img class='castPoster' src='http://image.tmdb.org/t/p/w500/"+data['credits']['cast'][i]['profile_path']+"'/>"
                }
                resultStr += "<br><div class='castCrewTitle'>"+data['credits']['cast'][i]['character']+"</div><br><button type='button' class='castName' data-toggle='modal' data-target='#myModal' style='color:blue!important; border-radius:20px;max-width:115px;margin-top:-15px;' title='"+data['credits']['cast'][i]['id']+"'>"+data['credits']['cast'][i]['name']+"</button></div>";
                if((i+1)%6==0||i==(data['credits']['cast'].length-1)){
                  resultStr +="</div>"
                }
              }
          	}
          	var numSeasons = data['seasons'].length;
          	var tvShowId = data['id'];
          	for (var j=0;j<numSeasons;j++){
          		var seasonId = data['seasons'][j]['id'];
          		var seasonNum = data['seasons'][j]['season_number'];	
	            $.ajax({
	            	url: "http://api.themoviedb.org/3/tv/"+data['id']+"/season/"+seasonNum+"?api_key=5da4693192fc98b8390ac6cebfc81c82&append_to_response=credits",
	              dataType: "json",
	              method: "GET",
	              success: function(data, textStatus, jqXHR){
	              	console.log('tv/id/season/season#/credits: ',data);
	              	resultStr +="<br></div>";
	              	resultStr += "<div style='position:relative;'><div class='tvNavLinks'><ul style='list-style:none;'><div style='width:400px;' class='row'>"
            				for (i=0;i<numSeasons;i++){
            					if (i%15==0) {
            						resultStr += "<div class='col-xs-3'>"
            					}
            					resultStr += "<li><a href='#"+tvShowId+i+"'>Season "+i+"</a></li>";
            					if (i%14==0&&i!=0||i==numSeasons-1){
            						resultStr +="</div>"
            					}
            				}
            			resultStr += "</ul></div></div>";
            			resultStr += "<div id='"+tvShowId+data['season_number']+"'></div><div class='anchor'></div><h2 style='text-align:center; color:yellow;font-weight:bold;'>"+data['name']+"</h2>"
	              	if (data['poster_path']==null) {
		                resultStr +="<div class='seasonDiv'><img class='seasonPoster' src='/static/images/posterNull.png'/></div>";
		              } else {
		                resultStr +="<div class='seasonDiv'><img class='seasonPoster' src='http://image.tmdb.org/t/p/w500/"+data['poster_path']+"'/></div>";
		              }
		              if (data['credits']['cast'].length!=0){
			              resultStr +="<br></div><h2 style='text-align:center; color:yellow;font-weight:bold;'>Cast</h2><div class='castDiv'>";
			              for (i=0;i<data['credits']['cast'].length;i++) {
			                if(i%6==0){
			                  resultStr +="<div style='height: 220px max-height:220px overflow:auto' class='row'>"
			                }
			                if (data['credits']['cast'].length==5&&i==0) {
				                  resultStr += "<div class='col-xs-1'></div>";
				                  resultStr += "<div class='col-xs-2'>";
				                } else if (data['credits']['cast'].length==5){
				                  resultStr += "<div class='col-xs-2'>";
				                } else if (data['credits']['cast'].length<6) {
				                  resultStr += "<div class='col-xs-"+12/(data['credits']['cast'].length)+"'>";
				                } else {
				                  resultStr += "<div class='col-xs-2'>";
				                }
			                if (data['credits']['cast'][i]['profile_path']==null) {
			                  resultStr += "<img class='castPoster' src='/static/images/nullImage.jpg'/>"
			                } else {
			                  resultStr +="<img class='castPoster' src='http://image.tmdb.org/t/p/w500/"+data['credits']['cast'][i]['profile_path']+"'/>"
			                }
			                resultStr += "<br><div class='castCrewTitle'>"+data['credits']['cast'][i]['character']+"</div><br><button type='button' class='castName' data-toggle='modal' data-target='#myModal' style='color:blue!important; border-radius:20px;max-width:115px;margin-top:-15px;' title='"+data['credits']['cast'][i]['id']+"'>"+data['credits']['cast'][i]['name']+"</button></div>";
			                if((i+1)%6==0||i==(data['credits']['cast'].length-1)){
			                  resultStr +="</div>"
			                }
			              }
			          	}	
	              	resultStr += "</div><br><h2 style='text-align:center; color:yellow;font-weight:bold;'>Episodes</h2><div class='episodeDiv'>";
	                if (data['episodes'].length!=0){
			              for (i=0;i<data['episodes'].length;i++) {
			                if(i%3==0){
			                  resultStr +="<div style='height: 220px max-height:220px overflow:auto' class='row'>"
			                }
			                resultStr += "<div class='col-xs-4'><h3 style='text-align:center; color:black;font-weight:bold;'>Episode "+(i+1)+"</h3>";
			                if (data['episodes'][i]['still_path']==null) {
			                  resultStr += "<img class='castPoster' src='/static/images/nullImage.jpg'/>"
			                } else {
			                  resultStr +="<img class='castPoster' src='http://image.tmdb.org/t/p/w500/"+data['episodes'][i]['still_path']+"'/>"
			                }
			                resultStr += "<br><br><button type='button' class='episodeName' data-toggle='modal' data-target='#myModal' style='color:blue!important; border-radius:20px;max-width:115px;margin-top:-15px;' form='"+tvShowId+"' name='"+data['episodes'][i]['season_number']+"' title='"+data['episodes'][i]['episode_number']+"'>"+data['episodes'][i]['name']+"</button></div>";
			                if((i+1)%3==0||i==(data['episodes'].length-1)){
			                  resultStr +="</div>"
			                }
			              }
			              // console.log('resultStr after episode for loop', resultStr);
			          	}
	              },
	              async:false
	            });
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
                    bodyStr += "<div style='max-height:575px;overflow:auto;' class='col-xs-9'><div style='font-weight:bold' class='row'><div class='col-xs-12'><span style='font-weight: bold; color: blue'>Place of birth: </span>"+birthPlace+"</div><div class='col-xs-12'><span style='font-weight:bold; color:blue'>Birthday: </span>"+easyDate+"</div><div class='col-xs-12'><span style='font-weight: bold; color: blue'>Biography: </span>"+biography+"</div></div></div>";
                    $('.modal-body').html(bodyStr);
                  },
                });
							});
							$(".episodeName").on('click', function(){
								var seriesId = $(this).attr('form');
								var seasonNum = $(this).attr('name');
              	var episodeNum = $(this).attr('title');
                $.ajax({
                  url: "http://api.themoviedb.org/3/tv/"+seriesId+"/season/"+seasonNum+"/episode/"+episodeNum+"?api_key=5da4693192fc98b8390ac6cebfc81c82",
                  dataType: "json",
                  method: "GET",
                  success: function(data, textStatus, jqXHR){
                    if (data['air_date']==null){
                      var easyDate = "Not available";
                    } else {
                      var year = data['air_date'].substring(0,4);
                      var date = data['air_date'].substring(5,10);
                      var easyDate = date+"-"+year;
                    }
                    $('.modal-title').html(data['name']);
                    var bodyStr = "<div style='max-height:575px;overflow-y:auto;overflow-x:hidden;'><div class='row'><div class='col-xs-12'>"
                    if (data['still_path']==null) {
                      bodyStr += "<img style='display:block;margin:auto;' class='castPoster' src='/static/images/nullImage.jpg'/></div>";
                    } else {
                      bodyStr +="<img style='display:block;margin:auto;' class='castPoster' src='http://image.tmdb.org/t/p/w500/"+data['still_path']+"'/></div></div>";
                    }
                    if (data['vote_average']==null){
                      var voteAverage = "Not available";
                    } else {
                      var voteAverage = data['vote_average'];
                    }
                    if (data['overview']==null){
                      var overview = "Not available";
                    } else {
                      var overview = data['overview'];
                    }
                    bodyStr += "<div style='font-weight:bold' class='row'><div class='col-xs-12'><span style='font-weight: bold; color: blue'>Vote Average: </span>"+voteAverage+"</div><div class='col-xs-12'><span style='font-weight:bold; color:blue'>Air date: </span>"+easyDate+"</div><div class='col-xs-12'><span style='font-weight: bold; color: blue'>Overview: </span>"+overview+"</div></div>";
					          if (data['guest_stars'].length!=0) {
				              bodyStr += "<h3 style='text-align:center;color:0060;font-weight:bold;'>Guest Stars</h3>";
				              for (i=0;i<data['guest_stars'].length;i++) {
				                if(i%4==0){
				                  bodyStr +="<div style='height: 220px max-height:220px overflow:auto' class='row'>"
				                }
				                if (data['guest_stars'].length<4) {
				                  bodyStr += "<div style='text-align:center' class='col-xs-"+12/(data['guest_stars'].length)+"'>";
				                } else {
				                  bodyStr += "<div style='text-align:center' class='col-xs-3'>";
				                }
				                if (data['guest_stars'][i]['profile_path']==null) {
				                  bodyStr += "<img class='castPoster' src='/static/images/nullImage.jpg'/>"
				                } else {
				                  bodyStr +="<img class='guestCastPoster' src='http://image.tmdb.org/t/p/w500/"+data['guest_stars'][i]['profile_path']+"'/>"
				                }
				                bodyStr += "<br><span class='guestStarTitle'>"+data['guest_stars'][i]['character']+"</span><br><span class='guestStarName'><button type='button' class='guestStarName' data-toggle='modal' data-target='#guestModal' style='color:blue!important; background-color:palegreen;border-radius:20px;' title='"+data['guest_stars'][i]['id']+"'>"+data['guest_stars'][i]['name']+"</button></span></div>";
				                if((i+1)%4==0||i==(data['guest_stars'].length-1)){
				                  bodyStr +="</div>"
				                }
				              }
					          } else {
					          	bodyStr += "</div>";
					          }
					          bodyStr += "</div></div>";
                    $('.modal-body').html(bodyStr);
                    $(".guestStarName").on('click', function(){
                			var personId = $(this).attr('title');
    									if(personId) { 
    									$.ajax({
			                  url: "http://api.themoviedb.org/3/person/"+personId+"?api_key=5da4693192fc98b8390ac6cebfc81c82",
			                  dataType: "json",
			                  method: "GET",
			                  success: function(data, textStatus, jqXHR){
			                    if (data['birthday']==null){
			                      var easyDate = "Not available";
			                    } else {
			                      var year = data['birthday'].substring(0,4);
			                      var date = data['birthday'].substring(5,10);
			                      var easyDate = date+"-"+year;
			                    }
			                    $('.guestTitle').html(data['name']);
			                    var bodyStr = "<div style='min-height:173px;' class='row'><div class='col-xs-3'>"
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
			                    bodyStr += "<div style='max-height:595px;overflow:auto;margin-left: -10px;' class='col-xs-9'><div style='font-weight:bold' class='row'><div class='col-xs-12'><span style='font-weight: bold; color: blue'>Place of birth: </span>"+birthPlace+"</div><div class='col-xs-12'><span style='font-weight:bold; color:blue'>Birthday: </span>"+easyDate+"</div><div class='col-xs-12'><span style='font-weight: bold; color: blue'>Biography: </span>"+biography+"</div></div></div>";
			                    $('.guestBody').html(bodyStr);
			                  },
			                });
											}
										});
                  },
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
