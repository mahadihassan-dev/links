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
    // Filter Button
    // $("#filter_toggle_btn").click(function() {
    //     $("#filter_box_card").toggle(250);
    // });
});

// Filter Button Custom Functions
let toggleBtn = document.getElementById('filter_toggle_btn');
let FilterFiled = document.getElementById('filter_box_card');

function FilterToggleButton() {
    FilterFiled.classList.toggle('FilterHide');
    FilterFiled.style.transition = 'all linear .3s';
}
// BlockURLList Button Custom Functions
let URLtoggleBtn = document.getElementById('blockURLToggle_Button');
let URLField = document.getElementById('blockURLListBox');

function blockURLToggleButton() {
    URLField.classList.toggle('FilterHide');
    URLField.style.transition = 'all linear .3s';
}