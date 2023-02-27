$(document).ready(function(){

    $('.carousel__inner').slick({
        speed: 2000,
        //adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg" /></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg" /></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ],
        autoplay: true,
        autoplaySpeed: 3000,
        // fade: true,
        // cssEasy: 'linear'
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');


    //modal-window
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });
    //modal-window закрытие по модального окна по клику вне окна
    $(document).mouseup( function(e) { 
		const div = $( "#consultation, #thanks, #order");
		if ( !div.is(e.target)
		    && div.has(e.target).length === 0 ) {
            $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
		}
	});
    //modal-window закрытие по модального окна по нажатию escape
    $(document).on('keyup', function(e) {
        if ( e.key == "Escape" ) {
            $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
        }
    });

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: 'required'
            },
            messages: {
                name: {
                    required: "Будь ласка, введіть своє ім'я",
                    minlength: jQuery.validator.format("Введіть {0} символу!")
                  },
                phone: "Будь ласка, введіть свій номер телефону"
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask('+38 (999) 999-99-99');

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //Smooth scroll and pageup
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1140) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    })
   
    $("a[href='#up']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+50+"px"});
        return false;
    });

    //smooth transition to anchor
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();      
        const sc = $(this).attr("href"),
            dn = $(sc).offset().top;
        
        $('html, body').animate({scrollTop: dn}, 1000);
    });

    //увеличиваем картинку при клике на картинку
    $('.in img').click(function(event) {
        event.preventDefault();
        const imgSrc = $(this).attr("href");
        $('#img_container img').attr({src: imgSrc});
        $('#img_container').fadeIn('slow');
    });
    $('#img_container').click(function() {
        $(this).fadeOut();
    });
    
    $('.image').magnificPopup({type:'image'});

    new WOW().init();
});

//выравнивает текстовые блоки по высоте самого высокого
function someHight(itemClass){
    let item = document.querySelectorAll(itemClass);
    let hightItem = 0;
    for (let i = 0; i < item.length; i++) {
      if (hightItem < item[i].offsetHeight) hightItem = item[i].offsetHeight;
    }
    for (let i = 0; i < item.length; i++) {
      item[i].style.height = hightItem + 'px';
    }
}

someHight('.catalog-item__descr');