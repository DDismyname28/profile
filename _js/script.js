$(document).ready(function(event){
	$('body').click(function(event){
		var x = $(event.target);
		var x = x.parent();
		var z = x[0].attributes[2];
		console.log(x[0].localName);
		let tag = x[0].localName;
		if(tag !== 'a'){
			$('#layout').stop().slideToggle(1300);
			$(this).unbind('click');
		}else {
			$('body').bind('click');
			$('body').click(function(){
				console.log(x[0].localName);
			});
		}
	});
	
/*	$('#layout').click(function(event){
		let x = $(event.target);
		let id = x[0].id;

		if(id == 'about-me'){
			console.log(id);

		}else if(id == 'employment-history'){
			console.log(id);
		}
	});
*/
	$('#about-me').click(function(){
		$('#layout').slideUp(1000,function(){
			$('.branding').fadeOut(800);
				$('#about-page').fadeIn(1000,function(){
			});
		});
	});

	$('.close-about-page').click(function(){
		$('#about-page').fadeOut(1000);
		$('#layout').stop().slideDown(1000);
	});

	$('#employment-history').click(function(){
		$('#layout').slideUp(1000,function(){
			$('.branding').fadeOut(800);
				$('#employment-page').fadeIn(1000,function(){
			});
		});
	});

	$('.close-employment-page').click(function(){
		$('#employment-page').fadeOut(1000);
		$('#layout').stop().slideDown(1000);
	});

	$('#attainments-trainings').click(function(){
		$('#layout').slideUp(1000,function(){
			$('.branding').fadeOut(800);
				$('#attainments-page').fadeIn(1000,function(){
			});
		});
	});

	$('.close-attainments-page').click(function(){
		$('#attainments-page').fadeOut(1000);
		$('#layout').stop().slideDown(1000);
	});

	$('#graphics').click(function(){
		$('#layout').slideUp(1000,function(){
			$('.branding').fadeOut(800);
				$('#graphics-page').fadeIn(1000,function(){
			});
		});
	});

	$('.close-graphics-page').click(function(){
		$('#graphics-page').fadeOut(1000);
		$('#layout').stop().slideDown(1000);
	});

	$('#web-development').click(function(){
		$('#layout').slideUp(1000,function(){
			$('.branding').fadeOut(800);
				$('#web-development-page').fadeIn(1000,function(){
			});
		});
	});

	$('.close-web-development-page').click(function(){
		$('#web-development-page').fadeOut(1000);
		$('#layout').stop().slideDown(1000);
	});

	$('#contact').click(function(){
		$('#layout').slideUp(1000,function(){
			$('.branding').fadeOut(800);
				$('#contact-page').fadeIn(1000,function(){
			});
		});
	});

	$('.close-contact-page').click(function(){
		$('#contact-page').fadeOut(1000);
		$('#layout').stop().slideDown(1000);
	});

});