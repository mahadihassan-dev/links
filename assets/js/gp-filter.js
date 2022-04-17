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