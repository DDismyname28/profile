$(document).ready(() => {
	$('#searchbtn').on('click',(e) => {
		
		let search = $('#search').val();
		let URL = 'https://www.omdbapi.com/?apikey=36b2ea25&s=' + search;

		$.ajax({
			type: 'POST',
			url: URL,
			dataType: 'json',
			beforeSend: () => {
				$('#spin').addClass('spinnerOverlay');
				$('#spin').addClass('spinner');
			},
			success: (movies) => {
				if(movies.Response == 'False'){
					output = '<div class="col-12"><p>No Results Found!</p></div>';
					$('#content').html(output);
				}else{
					let movies1 = (movies.Search);
					let output = '';
					$.each(movies1,(index, movie) => {
						if(movie.Poster == 'N/A' || movie.Poster == '') {
							movie.Poster = 'images/NA.gif';
						}
				output += '<div class="col-lg-2 col-md-3 col-sm-4 col-6"><div class="content" id="content-box"><a href="#" onclick="return view(\''+ movie.imdbID +'\')"><div class="thumbnail"><img  src="' + movie.Poster + '" alt="" class="img-fluid"></div><h6>'+ movie.Title +'</h6></div></a></div>';
				}); 
					$('#content').html(output);
				}
		  	},
		  	complete: () => {
		  		$('#spin').removeClass('spinnerOverlay');
				$('#spin').removeClass('spinner');
		  	}
		}).catch((err) => {
			console.log(err);
		});
	});

	$('#search').on('keypress',(e) => {
		//console.log(e);
		if(e.which ==  13 || e.keycode ==13){
			let search = $('#search').val();
			let URL = 'https://www.omdbapi.com/?apikey=36b2ea25&s=' + search;

			$.ajax({
				type: 'POST',
				url: URL,
				dataType: 'json',
				beforeSend: () => {
					$('#spin').addClass('spinnerOverlay');
					$('#spin').addClass('spinner');
				},
				success: (movies) => {
					if(movies.Response == 'False'){
						output = '<div class="col-12"><h2 style="color: #fff;">No Results Found!</h2></div>';
						$('#content').html(output);
					}else{
						let movies1 = (movies.Search);
						let output = '<div id="result-section" class="col-lg-12"><h2 style="color: #fff;">Results for: ' + search + '<h2></div>';
						$.each(movies1,(index, movie) => {
							if(movie.Poster == 'N/A' || movie.Poster == '') {
								movie.Poster = 'images/NA.gif';
							}
					output += '<div class="col-lg-2 col-md-3 col-sm-4 col-6"><div class="content" id="content-box"><a href="#" onclick="return view(\''+ movie.imdbID +'\')"><div class="thumbnail"><img  src="' + movie.Poster + '" alt="" class="img-fluid"></div><h6>'+ movie.Title +'</h6></div></a></div>';
					}); 
						$('#content').html(output);
					}
			  	},
			  	complete: () => {
			  		$('#spin').removeClass('spinnerOverlay');
					$('#spin').removeClass('spinner');
			  	}
			}).catch((err) => {
				console.log(err);
			});
		}
	});

	//slides();
});


function view(id){

	console.log(id);
	sessionStorage.setItem('id',id)

	window.location.href = "movie.html";

	return false;	
}

function movieinfo(){

	let id = sessionStorage.getItem('id');

	let URL = 'https://www.omdbapi.com/?apikey=36b2ea25&plot=full&i=' + id;
	let output = "";
	$.ajax({
		type: 'POST',
		url: URL,
		dataType: 'json',
		success: (movie) => {
			console.log(movie);
			output += '<div class="col-md-4"><img class="img-fluid mb-3" src="'+ movie.Poster +'" alt=""></div><div class="col-md-8"><ul class="list-group"><li class="list-group-item"><span>Title</span>: '+ movie.Title +'</li><li class="list-group-item"><span>Description</span>: '+ movie.Plot +'</li><li class="list-group-item"><span>Director</span>: '+ movie.Director +'</li><li class="list-group-item"><span>Actors</span>: '+ movie.Actors +'</li><li class="list-group-item"><span>Released</span>: '+ movie.Released +'</li><li class="list-group-item"><span>Awards</span>: '+ movie.Awards +'</li></ul><a class="btn btn-primary back mt-3" href="index.html">Back to Search</a></div>';

			$('#movie-info').html(output);
		}
	});
}


function slides(){
	//$(window).on('load', (e) => {
		console.log('hello');
		let URL = 'https://www.omdbapi.com/?apikey=36b2ea25&s=spiderman';
		$.ajax({
			type: 'POST',
			url: URL,
			dataType: 'json',
			success: (movies) => {
				if(movies.Response == 'False'){
					output = '<div class="col-12"><p>No Results Found!</p></div>';
					$('#test').html(output);
				}else{
					let movies1 = (movies.Search);
					let output = '';
					$.each(movies1,(index, movie) => {
						if(movie.Poster == 'N/A' || movie.Poster == '') {
							movie.Poster = 'images/NA.gif';
						}
				output += '<div class="col-sm-2"><a href="#" onclick="return view(\''+ movie.imdbID +'\')"><img  src="' + movie.Poster + '" alt="" class="" width="300" height="300"></a></div>';
				}); 
					$('#film_roll').html(output);
				}
		  }
		}).catch((err) => {
			console.log(err);
		});
	//});	
}