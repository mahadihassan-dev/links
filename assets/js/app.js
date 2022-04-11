$(document).ready(function() {
    $('.review_slider').slick({
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
    $('.banner_offer_card_slider').slick({
        dots: true,
        arrows: true,
        infinite: true,
        autoplay: true,
        prevArrow: '<i class="fal fa-chevron-left banner_slide_btn banner_slide_prev_btn"></i>',
        nextArrow: '<i class="fal fa-chevron-right banner_slide_btn banner_slide_next_btn"></i>',
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
});