$(document).ready(function() {
    var myArray = ["dog", "cat", "turtle", "eagle", "zebra"];

    for (var i = 0; i < myArray.length; i++) {
        $("#animal-btns").append('<button id="animal-btn" animal-name="' + myArray[i] + '">' + myArray[i]+ '</button>');
    }

});