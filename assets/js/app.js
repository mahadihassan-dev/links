$(document).ready(function() {
    $('.review_slider').slick({
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
    $('.banner_offer_card_slider').slick({
        dots: true,
        arrows: true,
        infinite: true,
        autoplay: false,
        prevArrow: '<i class="fal fa-chevron-left banner_slide_btn banner_slide_prev_btn"></i>',
        nextArrow: '<i class="fal fa-chevron-right banner_slide_btn banner_slide_next_btn"></i>',
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
    // Filter Button
    // $("#filter_toggle_btn").click(function() {
    //     $("#filter_box_card").toggle(250);
    // });
});