/*!
 * jquery-slider v1.1
 * Author: Cavasoft
 */

(function ( $ ) {
 
    $.fn.CavasoftSlider = function( options ) {
 
       
        this.each(function(index, val) {
        	
    		//Set Defaults options

	        var $self = $(this);
	        var nbr_slide = $self.find('.slide-body').length;
	        var isAnimating = false;

	        var settings = $.extend({
	        	slideAuto: {
	        		slideAutoActive: false,
	        		slideAutoTime: 1000,
	        		slideDirection: 'next-slide'
	        	},
	            slideArrow: true,
	            slideStep: true,
	            slideStepImg: false

	        }, options );

	        if($self.Data('time')){
	        	settings.slideAuto.slideAutoTime = $self.Data('time');
	        }

	        if($self.Data('direction')){
	        	settings.slideAuto.slideDirection = $self.Data('direction');
	        }

	        if($self.Data('arrow')){
	        	settings.slideArrow = $self.Data('arrow');
	        }

	        if($self.Data('step')){
	        	settings.slideStep = $self.Data('step');
	        }

	        if($self.Data('auto')){
	        	settings.slideAuto.slideAutoActive = $self.Data('auto');
	        }

	        //-------------

	        $self.init = function() {
	        	switch (options) {
				  	case 'refresh':

				  		$self.refreshSlider();

				    	break;
				    // case 'destroy':

				  		// $self.destroySlider();

				    // 	break;
				   	default:

				   		$self.constructSlider();

				}
	        	
	        };

	        $self.refreshSlider = function() {

	        	$self.find('.step-img-slide').unbind('click').on('click',function(){
	        		$button = $(this);

	        		if (isAnimating) {
				        return;
				    }

				    isAnimating = true;

				    setTimeout(function() {
				        isAnimating = false;
				        sliderStep_clickEvent($button);
				    }, 400);
	        		
	        	});

	        	$self.find('.step-slide').unbind('click').on('click',function(){
	        		$button = $(this);

	        		if (isAnimating) {
				        return;
				    }

				    isAnimating = true;

				    setTimeout(function() {
				        isAnimating = false;
				        sliderStep_clickEvent($button);
				    }, 400);
	        	});

	        	$self.find('.arrow-slide').unbind('click').on('click',function(){
	        		$button = $(this);

	        		if (isAnimating) {
				        return;
				    }

				    isAnimating = true;

				    setTimeout(function() {
				        isAnimating = false;
				        sliderArrow_clickEvent($button);
				    }, 400);
	        	});

	        	if(settings.slideAuto.slideAutoActive){
	        		$self.constructSlider.Auto();
	        	}

	        };

	        $self.destroySlider = function() {

	        	$self.find('.slider-step').remove();
	        	$self.find('.slider-arrow').remove();

	        	if (typeof sliderAutoTimeout === 'undefined'){}
	        	else{
					clearTimeout(sliderAutoTimeout);
				}

	        };

	        $self.constructSlider = function() {
	        	if(settings.slideArrow){
	        		$self.constructSlider.Arrow();
	        	}
	        	if(settings.slideStep){
	        		$self.constructSlider.Step();
	        	}
	        	if(settings.slideStepImg){
	        		$self.constructSlider.StepImg();
	        	}
	        	if(settings.slideAuto.slideAutoActive){
	        		$self.constructSlider.Auto();
	        	}
	        };

	        $self.constructSlider.Arrow = function() {

	        	var arrow_container = $('<div class="slider-arrow"></div>');

		        var btn_left = $('<button class="arrow-slide arrow-left" data-type="prev-slide" data-value="-1"><i class="fas fa-angle-left"></i></button>');
		        var btn_right = $('<button class="arrow-slide arrow-right" data-type="next-slide" data-value="1"><i class="fas fa-angle-right"></i></button>');

		        btn_left.on('click',function(){
		        	$button = $(this);

	        		if (isAnimating) {
				        return;
				    }

				    isAnimating = true;

				    setTimeout(function() {
				        isAnimating = false;
				        sliderArrow_clickEvent($button);
				    }, 400);
		        	
		        });

		        btn_right.on('click',function(){
		        	$button = $(this);

	        		if (isAnimating) {
				        return;
				    }

				    isAnimating = true;

				    setTimeout(function() {
				        isAnimating = false;
				        sliderArrow_clickEvent($button);
				    }, 400);
		        	
		        });

		        arrow_container.append(btn_left);
		        arrow_container.append(btn_right);

		        $self.append(arrow_container);

	        };

	        $self.constructSlider.Step = function() {

	        	var step_container = $('<div class="slider-step"></div>');
	        	var button = {};
	        	var slide_current = $self.find('.slide-body.active').index();

	        	for (var i = 0; i < nbr_slide; i++) {

	        		if(slide_current == i){
	        			var active = 'active';
	        		}else{
	        			var active = '';
	        		}

	        		button[i] = $('<button class="step-slide '+active+'" data-value="'+i+'"></button>');
	        		button[i].on('click', function(){
	        			$button = $(this);

		        		if (isAnimating) {
					        return;
					    }

					    isAnimating = true;

					    setTimeout(function() {
					        isAnimating = false;
					        sliderStep_clickEvent($button);
					    }, 400);
	        			
	        		});

	        		step_container.append(button[i]);

	        	};

	        	$self.append(step_container);

	        };

	        $self.constructSlider.StepImg = function() {

	        	var step_img_container = $('<div class="slider-step-img"></div>');
	        	var button_step_img = {};
	        	var slide_current = $self.find('.slide-body.active').index();

	        	$self.find('.slide-body').each(function(i, el) {

	        		if(slide_current == i){
	        			var active = 'active';
	        		}else{
	        			var active = '';
	        		}

	        		var step_img_src = $(this).find('.slide-img img').first().attr('src');
	        		button_step_img[i] = $('<div class="step-img-slide '+active+'" data-value="'+i+'"><img src="'+step_img_src+'"></img></div>');

	        		button_step_img[i].on('click', function(){
	        			$button = $(this);

		        		if (isAnimating) {
					        return;
					    }

					    isAnimating = true;

					    setTimeout(function() {
					        isAnimating = false;
					        sliderStep_clickEvent($button);
					    }, 400);
	        			
	        		});

	        		step_img_container.append(button_step_img[i]);

	        	});
	        	$self.append(step_img_container);

	        };

	        $self.constructSlider.Auto = function() {

	        	sliderAuto_Event($self);

	        };

	        return $self.init();

        });
	 
	};

	var slider_GetSlide = function ($slider, $this, actionType) {

		/* --- Set Parameters --- */

	        var slideParams = {};

	        var currentSlide = {};
        	var newSlide = {};

        	var betweenSlide = {};
        	var betweenSlideLeft = {};
        	var betweenSlideRight = {};

	        slideParams.nbrSlide = $slider.find('.slide-body').length - 1;
	        slideParams.actionType = actionType;

	        slideParams.type = $this.Data('type');
	        slideParams.value = $this.Data('value');

	        if(slideParams.actionType == 'auto'){

	        	if($this.Data('time')){
		        	slideParams.time = $this.Data('time');
		        }else{
		        	slideParams.time = 1000;
		        }

		        if($this.Data('direction')){
		    		slideParams.type = $this.Data('direction');
		    	}else{
		    		slideParams.type = 'next-slide';
		    	}

		    	if(slideParams.type == 'next-slide'){
		    		slideParams.value = 1;
		    	}else if(slideParams.type == 'prev-slide'){
		    		slideParams.value = -1;
		    	}

	        }


        /* --------------- */


        /* --- Get Current Slide --- */

	        currentSlide.index = $slider.find('.slide-body.active').index();
	        currentSlide.object = $slider.find('.slide-body.active');

	        slideParams.currentSlide = currentSlide;

        /* --------------- */


        /* --- Get New Slide --- */

        	switch(slideParams.actionType) {
			    case 'step':

			        	newSlide.index = slideParams.value;

			        	//Set Step type

			        	if(currentSlide.index > newSlide.index){
				        	slideParams.type = 'prev-slide';
				        }else if(currentSlide.index < newSlide.index){
				        	slideParams.type = 'next-slide';
						}

			        break;
			    default:

		    		if(currentSlide.index == 0 && slideParams.type == 'prev-slide'){

			          newSlide.index = slideParams.nbrSlide;

			        }else if(currentSlide.index == slideParams.nbrSlide  && slideParams.type == 'next-slide'){

			          newSlide.index = 0;

			        }else{

			          newSlide.index = currentSlide.index + slideParams.value;

			        } 
			}

	        

	        newSlide.object = $slider.find('.slide-body').eq(newSlide.index);
	        slideParams.newSlide = newSlide;



        /* --------------- */


        /* --- Get Between Slide Left --- */

        	betweenSlideLeft.index = newSlide.index - 1;

	        if(betweenSlideLeft.index < 0){

	          betweenSlideLeft.index = slideParams.nbrSlide;

	        }

	        betweenSlideLeft.object = $slider.find('.slide-body').eq(betweenSlideLeft.index);
	        betweenSlide.betweenSlideLeft = betweenSlideLeft;

        /* --------------- */


        /* --- Get Between Slide Right --- */
        	
        	betweenSlideRight.index = newSlide.index + 1;
			
			if(betweenSlideRight.index > slideParams.nbrSlide){

	          betweenSlideRight.index = 0;

	        }

	        betweenSlideRight.object = $slider.find('.slide-body').eq(betweenSlideRight.index);
	        betweenSlide.betweenSlideRight = betweenSlideRight;

        /* --------------- */


        slideParams.betweenSlide = betweenSlide;




        return slideParams;

    }



    var sliderArrow_clickEvent = function($this){

    	/* --- Set Parameters --- */

	        var $slider = $this.parents('.slider-cavasoft');
			var slideParams = slider_GetSlide($slider, $this, 'arrow');

		/* --------------- */


        if(slideParams.currentSlide.index != slideParams.newSlide.index){
	        if($slider.hasClass('slide')){
	        	sliderAnimation_Slide(slideParams.newSlide, slideParams.currentSlide, slideParams.type);
	        }else if($slider.hasClass('centered')){
	        	sliderAnimation_Centered($slider, slideParams.betweenSlide, slideParams.newSlide, slideParams.currentSlide, slideParams.type);
	        }else{
	        	sliderAnimation_Other(slideParams.newSlide, slideParams.currentSlide, slideParams.type);
	        }

	        sliderChangeStep_Event($slider, slideParams.newSlide.index);
	    }

    };

    var sliderStep_clickEvent = function($this){

    	/* --- Set Parameters --- */

	        var $slider = $this.parents('.slider-cavasoft');
			var slideParams = slider_GetSlide($slider, $this, 'step');

        /* --------------- */

        if(slideParams.currentSlide.index != slideParams.newSlide.index){

	        if($slider.hasClass('slide')){
	        	sliderAnimation_Slide(slideParams.newSlide, slideParams.currentSlide, slideParams.type);
	        }else if($slider.hasClass('centered')){
	        	sliderAnimation_Centered($slider, slideParams.betweenSlide, slideParams.newSlide, slideParams.currentSlide, slideParams.type);
	        }else{
	        	sliderAnimation_Other(slideParams.newSlide, slideParams.currentSlide);
	        }

	        sliderChangeStep_Event($slider, slideParams.newSlide.index);

        }

    };

    var sliderAuto_Event = function ($this){
   
    	/* --- Set Parameters --- */

	        var $slider = $this;
	        var slideParams = slider_GetSlide($slider, $this, 'auto');

        /* --------------- */


        if($slider.hasClass('slide')){
        	sliderAnimation_Slide(slideParams.newSlide, slideParams.currentSlide, slideParams.type);
        }else if($slider.hasClass('centered')){
	        sliderAnimation_Centered($slider, slideParams.betweenSlide, slideParams.newSlide, slideParams.currentSlide, slideParams.type);
	    }else{
        	sliderAnimation_Other(slideParams.newSlide, slideParams.currentSlide);
        }
        

        sliderChangeStep_Event($slider, slideParams.newSlide.index);

    	sliderAutoTimeout = setTimeout(() => sliderAuto_Event($this), slideParams.time)

    };

    var sliderChangeStep_Event = function ($slider, new_slide){

    	$slider.find('.slider-step .step-slide.active').removeClass('active');
        $slider.find('.slider-step .step-slide[data-value="'+new_slide+'"]').addClass('active');

        $slider.find('.slider-step-img .step-img-slide.active').removeClass('active');
        $slider.find('.slider-step-img .step-img-slide[data-value="'+new_slide+'"]').addClass('active');

    };

    var sliderAnimation_Slide = function (slide_new, slide_current, type){

    	if(type == 'prev-slide'){

        	var CLASS_CURRENT = 'active slide-body-right';
        	var CLASS_NEW = 'slide-body-prev slide-body-right';

        }else if(type == 'next-slide'){

        	var CLASS_CURRENT = 'active slide-body-left';
        	var CLASS_NEW = 'slide-body-next slide-body-left';

        }

        slide_new['object'].addClass(CLASS_NEW);
        slide_current['object'].addClass(CLASS_CURRENT);

        setTimeout(function() {

        	slide_new['object'].removeClass(CLASS_NEW).addClass('active');
        	slide_current['object'].removeClass(CLASS_CURRENT);
        	
        },400);
    };


    var sliderAnimation_Other = function (slide_new, slide_current){

        var CLASS_CURRENT = 'active';
        
        slide_new['object'].addClass(CLASS_CURRENT);
        slide_current['object'].removeClass(CLASS_CURRENT);

    };

    var sliderAnimation_Centered = function ($slider, slideBetween, slide_new, slide_current, type) {
    	
    	if(type == 'prev-slide'){
    		var slide = slideBetween.betweenSlideLeft;
    		var slide_current = slideBetween.betweenSlideRight;
    		var CLASS_CURRENT = 'slide-right';
	        var CLASS_NEW = 'active';
	        var CLASS_OPPOSITE = 'slide-left animated pulse';
	    }else if(type == 'next-slide'){
	    	var slide = slideBetween.betweenSlideRight;
	    	var slide_current = slideBetween.betweenSlideLeft;
	    	var CLASS_CURRENT = 'slide-left';
	        var CLASS_NEW = 'active';
	        var CLASS_OPPOSITE = 'slide-right animated pulse';
	    }

        $slider.find('.slide-container .slide-body').removeClass('active slide-right slide-left animated pulse');

        slide_new['object'].addClass(CLASS_NEW);
        slide_current['object'].addClass(CLASS_CURRENT);
        slide['object'].addClass(CLASS_OPPOSITE);

    };


    $('.slider-cavasoft').CavasoftSlider('refresh');
 
}( jQuery ));