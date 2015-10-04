$(document).ready(function(){
	$('.page-scroll').click(function(){
		$('.page-scroll').parent().removeClass('active');
		$(this).parent().addClass('active');
	});

/*	var section = 1;
	$(window).bind('keydown',(function(e){	
		//down arrow pressed
		if(e.keyCode == 40){
			e.preventDefault();
			if(section == 1){
				window.location.hash = "#first-step-album"
				var target = $('#first-step-album');
				console.log('target : ' + target);
				var yPosition = target.offset().top; //position de l'ancre
				console.log('yPosition :' + target.offset());
				section++;
 				$('html,body').animate({scrollTop: yPosition - 40});
			}
			else if(section == 2){
				window.location.hash = "#second-step-album"
				var target = $("#second-step-album");
				var yPosition = target.offset().top; //position de l'ancre
				section++;
 				$('html,body').animate({scrollTop: yPosition - 40});
			}
			else if(section == 3){
				window.location.hash = "#album"
				var target = $("#album");
				var yPosition = target.offset().top; //position de l'ancre
				section++;
 				$('html,body').animate({scrollTop: yPosition - 40});
			}
			else if(section == 4){
				window.location.hash = "#demo"
				var target = $("#demo");
				var yPosition = target.offset().top; //position de l'ancre
				section++;
 				$('html,body').animate({scrollTop: yPosition - 40});
			}

			console.log('section = ' + section);
		}

		//up arrow pressed
		else if(e.keyCode == 38){
			e.preventDefault();
			if(section == 2){
				window.location.hash = "#home"
				var target = $("#home");
				var yPosition = target.offset().top; //position de l'ancre
 				$('html,body').animate({scrollTop: yPosition - 40});
				section--;
			}
			else if(section == 3){
				window.location.hash = "#first-step-album"
				var target = $("#first-step-album");
				var yPosition = target.offset().top; //position de l'ancre
 				$('html,body').animate({scrollTop: yPosition - 40});
				section--;
			}
			else if(section == 4){
				window.location.hash = "#second-step-album"
				var target = $("#second-step-album");
				var yPosition = target.offset().top; //position de l'ancre
 				$('html,body').animate({scrollTop: yPosition - 40});
				section--;
			}
			else if(section == 5){
				window.location.hash = "#album"
				var target = $("#album");
				var yPosition = target.offset().top; //position de l'ancre
 				$('html,body').animate({scrollTop: yPosition - 40});
				section--;
			}
			console.log('section = ' + section);
		}
	}));*/
});