/*
 *   App-Name: Filter App
 *   Version: 1
 *   Author: Mahadi Hassan
 *   Author URI: https://mahedihassan.com
 *   This app is Under GPL and MIT License. All rights are Reserved by Mahedi Hassan.
 *   This App Script is Fully Free to use. You can use it's Script Fully Free.
 *   Please Use Author Attribute. and Help Author to get Coffee.
 *   
 *   DO NOT COPY THIS. AND USE YOUR NAME AS AUTHOR.
 */
"use strict"
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

// Selected Row

let SelectedKwFiled_boxField = document.getElementById('SelectedKwFiled_boxFiled');