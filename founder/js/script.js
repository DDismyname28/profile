$(document).ready(function(){
	$(document).ready(function(){
		$('.slider').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			dots: false,
			centerMode: true,
			focusOnSelect: true,
			autoplay: true,
			arrows: false
		});

		const y = $('#sec_1').html();
		$('#play-video, #video1, .thumbnail-vid img, .thumbnail-vid, .watch').magnificPopup({
		    items: {
		      src: 'https://www.youtube.com/watch?v=1mm_xDbz19w'
		    },
		    type: 'iframe' // this is default type
		});
		
		
		if($(window).width() < 992) {
			var series_header = $('.heading-series').remove().html();
			var lessons_content = $('#content-wrap').remove().html();
			
			$('#swaps').before(series_header);
			$('.video-series ul').after(lessons_content);

		}else {
			$('#sec_1').html(y);
		}
		$(window).on('resize', function() {
				
	        if ($(window).width() < 992) {
	        var series_header = $('.heading-series').remove().html();
				var lessons_content = $('#content-wrap').remove().html();
				$('#swaps').before(series_header);
				$('.video-series ul').after(lessons_content);
	        }else {	
	        	$('#sec_1').html(y);
	        }
		});
    });
});
