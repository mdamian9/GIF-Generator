$(document).ready(function () {

    // Create array of animals.
    var myArray = ["dog", "cat", "turtle", "eagle", "zebra"];

    // For every animal in array, create and append a new button element with the following attributes:
    for (var i = 0; i < myArray.length; i++) {
        $("#animal-btns").append('<button class="animal-btn" data-animal="' + myArray[i] + '">' + myArray[i] + '</button>');
    };

    // When user clicks on submit button in the form #animal-form, execute the following function:
    $("#animal-form").submit(function (e) {

        // Prevents page from refreshing when clicking on "Submit".
        e.preventDefault();

        // Take value of user input and store it in var animalName.
        var animalName = $("#animal-input").val();

        // If user clicked submit without any input, alert user of error. If there is valid input, then create and append a new 
        // animal button with the same attributes as the originals.
        if ($("#animal-input").val() === "") {
            alert("There was no input. Please try again!");
        } else {
            $("#animal-btns").append('<button class="animal-btn" data-animal="' + animalName + '">' + animalName + '</button>');
        };

    });

    // When user clicks on an element with class=".animal-btn" inside an element with id="animal-btns" - execute the following function:
    $("#animal-btns").on("click", ".animal-btn", function () {

        // Clear any content in #animal-gifs, where gifs will be displayed. This is so that gifs aren't appended forever.
        $("#animal-gifs").html("");

        // Store the name of the animal (value of "data-animal") in new var animal. Store query URL in new var queryURL, make ajax
        // request, then once response is obtained execute the following function, passing response as a parameter.
        var animal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // Take response.data (array of gifs data) and store it into results
            var results = response.data;

            // For every gif in array: create new div element, and new p element. Display rating in p element. Create and append new image 
            // tag with data from ajax request. Gif will be still in the beginning. 
            for (var i = 0; i < results.length; i++) {

                var newDiv = $("<div>");
                var p = $("<p>");
                p.text("Rating: " + results[i].rating);
                var newImage = $("<img class='gif-img' data-animate='" + results[i].images.fixed_height.url + "' data-still='" +
                    results[i].images.fixed_height_still.url + "' data-state='still'>");
                newImage.attr("src", results[i].images.fixed_height_still.url);
                newDiv.append(p);
                newDiv.append(newImage);
                $("#animal-gifs").append(newDiv);

            };

        });

    });

    // If user clicks "Reset Buttons" button, clear added buttons and go back to original ones from array
    $("#reset-btns").on("click", function () {

        // Clear #animal-btns content, append original buttons
        $("#animal-btns").html("");
        for (var i = 0; i < myArray.length; i++) {
            $("#animal-btns").append('<button class="animal-btn" data-animal="' + myArray[i] + '">' + myArray[i] + '</button>');
        };

    });

    // When user clicks on an element with class=".gif-img" inside an element with id="animal-gifs" - execute function
    $("#animal-gifs").on("click", ".gif-img", function () {

        // Store gif data-state value into var state
        var state = $(this).attr("data-state");

        // If image is still then make gif animate. If gif is animating, make gif still
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            state = $(this).attr("data-state", "animate");
        } else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            state = $(this).attr("data-state", "still");
        };

    });

});
