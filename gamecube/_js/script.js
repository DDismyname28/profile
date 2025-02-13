$(document).ready(function(){
	var target = $('#navigation-main').position().top;

	$(window).on('scroll', function(){
		var position = $(window).scrollTop();
		if(position >= target){
			$('.main-nav').addClass('fixed-nav');
			$('.featured.row').css({
				'padding-top' : '71px'
			});
		}else if(position < target){
			$('.main-nav').removeClass('fixed-nav');
			$('.featured.row').css({
				'padding-top' : '15px'
			});
		}
	});
	$(window).resize(function(){
			var target1 = $('#navigation-main').position().top;
			
			$(window).on('scroll', function(){
			var position = $(window).scrollTop();
			if(position >= target1){
				$('.main-nav').addClass('fixed-nav');
				$('.featured.row').css({
					'padding-top' : '71px'
				});

			}else if(position < target1){
				$('.main-nav').removeClass('fixed-nav');
				$('.featured.row').css({
					'padding-top' : '15px'
				});
			}
		});
	});

});
/*$(window).on('click', function(){
	var id = $('a.activeMemberNav').attr('id');
	window.location.href="https://members.nightsatthegametable.com/membership-area20166518?page="+id;

	var path = "https://members.nightsatthegametable.com/membership-area20166518?page="+id; 
    window.history.pushState("","",path);
}
*/


/*			if (jQuery) {
				var x = document.getElementsByClassName("elIMG");
				var i;
				var org_html = x[1].innerHTML;
				$('#agreement').click(function() {

					console.log(org_html);
					console.log("Check = " + this.checked);
					if (this.checked == false) {
						//Direct to video
						redir = 'https://taoofbadass.com/special-presentation';
						console.log('Test' + x[1]);
						$(x[1]).parent().wrap("<a href='https://taoofbadass.com/special-presentation' onclick='window.location.href = \"https://taoofbadass.com/special-presentation\"' id='redirect'></a>");
					} else {
						//Go to mail
						$(x[1]).parent().unwrap();
						// x[1].innerHTML = org_html;

					}
				});
			}*/





 /*   jQuery(function(){
        jQuery("#btnsubmit").bind("click",function(){
            _firstname = jQuery("#contact_fields_first_name").val();
            _emailadd = jQuery("#contact_fields_email").val();
            if(_firstname == "" || _firstname == "Enter Your Name"){
                alert("You must enter your name.");
                return false;
            }
            if(_emailadd == "" || _emailadd == "Enter Your Email Address" || _emailadd.indexOf('@')==-1){
                alert("Enter Your Valid Email Address");
                return false;
            }
            return true;
        });
    });
    

	
	$(document).ready(function() {
		$("#btnsubmit").bind("click",function(){
			var _firstname = $("#contact_fields_first_name").val();
            var _emailadd = $("#contact_fields_email").val();
            if(_firstname == "" || _firstname == "Enter Your Name"){
                alert("You must enter your name.");
                return false;
            }
            if(_emailadd == "" || _emailadd == "Enter Your Email Address" || _emailadd.indexOf('@')==-1){
                alert("Enter Your Valid Email Address");
                return false;
            }
            return true;
		}); 
	});

*/