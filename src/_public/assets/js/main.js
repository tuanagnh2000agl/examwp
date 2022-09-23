
$(document).ready(function () {

    // slick slider header
    $(".c-mainvisual__slick").slick({
        dots: false,
        speed: 500,
        fade: true,
        cssEase: "linear",
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000
    });

    // slick slider pickup
    $(".c-pickup__slider").slick({
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        variableWidth: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        speed: 300,
        centerMode: true,
        prevArrow: '<div class="c-btn__prev"><img src="./assets/img/prev.png" alt="Icon prev"></div>',
        nextArrow: '<div class="c-btn__next"><img src="./assets/img/next.png" alt="Icon next"></div>',
        responsive: [
    
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            },
    
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            },
    
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
    
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 4,
                }
            }
        ]
    });
    // slick slider post company
    $(".c-corporate__slider").slick({
        dots: true,
        infinite: true,
        // autoplay: true,
        autoplaySpeed: 2000,
        speed: 300,
        arrows: false,
        cssEase: "linear",
    });


    // show menu
    $("#is-showmenu").click(function(){
        $("#is-menu").fadeIn();
        $("body").addClass("is-scroll");
        $(".c-header__closeright").click(function(){
            $("#is-menu").fadeOut();
            $("body").removeClass("is-scroll");
        });

        $('li').click(function(){
            $("#is-menu").fadeOut();
            $("body").removeClass("is-scroll");
        });
    });

    // When you click on it, you will be redirected to another page -- page about
    $(".is-examp").click(function(){
        window.open('http://www.example.co.jp/');
    });
    // When you click on it, you will be redirected to another page -- page about
    $(".is-mail").click(function(){
        window.open('mailto:example@gmail.com');
    });

    // call when on sp screen -- footer
    $(window).on('resize', function() {
        if($(this).width() < 767) {
            $(".is-call").addClass("is-call__phone");
            $(".is-call").css("cursor", "pointer");
            $(".is-call").click(function(){
                window.open("tel:+0899471411");
            });
        }else{
            $(".is-call").css("cursor", "default");
        }
    });

});


