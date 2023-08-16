$(function() {


    $('.review-info__pay-show').click(function(e) {
        e.preventDefault()
        $(this).prev().addClass('active')
        $(this).hide()
    });

    // SCROLL DOWN

    $(window).scroll(function() {
        var $height = $(window).scrollTop();
      if($height > 500) {
            $('.down').addClass('active');
        } else {
            $('.down').removeClass('active');
        }
    });

    // JS CLIPBORAD

    var clipboard = new ClipboardJS('.promocode-btn');

    clipboard.on('success', function(e) {
        var theButton = $(e.trigger);
      
        // Сохраняем исходный текст, чтобы потом вернуть
        var originalText = theButton.closest('.promocode').find('.promocode-value').text();
      
        // Изменяем текст кнопки и ждем 2 секунды перед возвратом исходного текста
        theButton.closest('.promocode').find('.promocode-value').text('Copied!');
        setTimeout(function() {
          theButton.closest('.promocode').find('.promocode-value').text(originalText);
        }, 2000);
      });


    // ADAPTIVE MENU

    $('.header .hamburger').click(function() {
        $('.menu .hamburger').addClass('is-active');
        $('.menu').addClass('open');
    });

    $('.menu .hamburger').click(function() {
        $('.menu .hamburger').removeClass('is-active');
        $('.menu').removeClass('open');
    });

    $('.c-menu-toggler').click(function() {
        $('.c-menu').addClass('open');
    });

    $('.c-menu__close').click(function() {
        $('.c-menu').removeClass('open');
    });


    //  MENU
    
    $('.menu-inner__list > li > a').click(function() {
        $
        $(this).toggleClass('active').next().slideToggle()
    });

    $('.menu-list > li > a').click(function() {
        $
        $(this).next().addClass('open')
    });

    $('.menu-inner__close').click(function() {
        $
        $(this).closest('.menu-inner').removeClass('open')
    });


    // SHOW MORE

    setTimeout(function() { 
        $('.js-show p').slice(0,2).addClass('shown');
        $('.js-show p').not('.shown').hide();
        $('.showMore').find('.btn-text').text('Show More')
        $('.showMore').on('click',function(e){
            e.preventDefault()
            $('.js-show p').not('.shown').toggle(300);
            $(this).toggleClass('showLess');
            if ($(this).hasClass('showLess')) {
                $(this).find('.btn-text').text('Show Less')
            } else {
                $(this).find('.btn-text').text('Show More')
            }
        });
    }, 3000);


    if ($('.showMore').hasClass('showLess')) {
        $('.showMore').find('.btn-text').text('Show More')
    } else {
        $('.showMore').find('.btn-text').text('Show less')
    }

    $('.copy-show p').slice(0,1).addClass('shown');
    $('.copy-show p').not('.shown').hide();
    $('.copy-showBtn').on('click',function(e){
        e.preventDefault()
        $('.copy-show p').not('.shown').toggle(300);
        $(this).toggleClass('showLess');
        if ($(this).hasClass('showLess')) {
            $(this).text('read less')
        } else {
            $(this).text('read more')
        }
    });


    //  ACCORDION

    // ACCORDION JQUERY

    $('.faq-accordion > li:eq(0) a').addClass('active').next().slideDown();

    $('.faq-accordion a').click(function(j) {
        var dropDown = $(this).closest('li').find('.faq-accordion__hidden');

        $(this).closest('.faq-accordion').find('.faq-accordion__hidden').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.faq-accordion').find('a.active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(false, true).slideToggle();

        j.preventDefault();
    });

    //  SEARCH
    
    $('.search-toggler').click(function() {
        $('.search').addClass('open');
    });

    $('.search-close').click(function() {
        $('.search').removeClass('open');
    });

     // Lang

    $('.lang-toggler').click(function() {
        $(this).toggleClass('active');
        $('.lang').toggleClass('open');
    });

    $('.footer-lang__toggler').click(function() {
        $(this).toggleClass('active');
        $('.footer-lang__drop').toggleClass('open');
    });

    
    // SCROLL TO ANY SECTION

    $('.down[href*="#"]').on('click', function(e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500, 'linear');
    });


    // SLICK SLIDER INIT

    $('.blogs-slider').slick({
        rows: false,
        slidesToShow: 3,
        dots: true,
        appendDots: '.check .slider-dots',
        prevArrow: '.slider-nav__prev--blogs',
        nextArrow: '.slider-nav__next--blogs',
        responsive: [{
            breakpoint: 1000,
            settings: {
                slidesToShow: 2,
            }
        }, 
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
            }
        }, 
        ]
    })

    $('.user-slider').slick({
        rows: false,
        slidesToShow: 3,
        dots: true,
        centerMode: true,
        appendDots: '.user .slider-dots',
        prevArrow: '.slider-nav__prev--user',
        nextArrow: '.slider-nav__next--user',
        responsive: [{
            breakpoint: 1000,
            settings: {
                slidesToShow: 2,
            }
        }, 
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
            }
        }, 
        ]
    })


    $('.home-slider').slick({
        rows: false,
        slidesToShow: 1,
        dots: true,
        autoplay: true, 
        autoplaySpeed: 3000,
        pauseOnHover: false, 
        pauseOnFocus: false,
        appendDots: '.home-nav .slider-dots',
        prevArrow: '.slider-nav__prev--home',
        nextArrow: '.slider-nav__next--home',
        asNavFor: '.home-slider-nav',
        responsive: [{
            breakpoint: 767,
            settings: {

            }
        }, ]
    })

    $('.home-slider-nav').slick({
        rows: false,
        slidesToShow: 2,
        prevArrow: '.slider-nav__prev--home',
        nextArrow: '.slider-nav__next--home',
        asNavFor: '.home-slider',
        focusOnSelect: true,
        responsive: [{
            breakpoint: 767,
            settings: {

            }
        }, ]
    })

});