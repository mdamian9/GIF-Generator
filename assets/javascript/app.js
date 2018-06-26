$(document).ready(function () {

    // Create array of fictional characters.
    var myArray = ["borat", "bear jew", "one punch man", "venom snake", "deadpool", "mr poopy butthole", "jon snow", "morty",
        "rick sanchez", "goku"];

    // For every character in array, create and append a new button element with the following attributes:
    for (var i = 0; i < myArray.length; i++) {
        $("#char-btns").append('<button class="char-btn" data-char="' + myArray[i] + '">' + myArray[i] + '</button>');
    };

    // When user clicks on submit button in the form #char-form, execute the following function:
    $("#char-form").submit(function (e) {

        // Prevents page from refreshing when clicking on "Submit".
        e.preventDefault();

        // Take value of user input and store it in var charName. Trim any additional whitespaces.
        var charName = $("#char-input").val().trim();

        // If user clicked submit without any input, alert user of error. If there is valid input, then create and append a new 
        // character button with the same attributes as the originals.
        if (charName === "") {
            alert("There was no input. Please try again!");
        } else {
            $("#char-btns").append('<button class="char-btn" data-char="' + charName + '">' + charName + '</button>');
        };

        // Clear form #char-input after subission.
        $("#char-input").val("");

    });

    // When user clicks on an element with class=".char-btn" inside an element with id="char-btns" - execute the following function:
    $("#char-btns").on("click", ".char-btn", function () {

        // Clear any content in #char-gifs, where gifs will be displayed. This is so that gifs aren't appended forever.
        $("#char-gifs").html("");

        // Store the name of the character (value of "data-char") in new var char. Store query URL in new var queryURL, make ajax
        // request, then once response is obtained execute the following function, passing response as a parameter.
        var character = $(this).attr("data-char");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            character + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // Take response.data (array of gifs data) and store it into results.
            var results = response.data;

            // For every gif in array: create new div element, and new p element. Display rating in p element. Create and append new  
            // image tag with data from ajax request. Gif will be still in the beginning. 
            for (var i = 0; i < results.length; i++) {

                var newDiv = $("<div>");
                var p = $("<p>");
                p.text("Rating: " + results[i].rating);
                var newImage = $("<img class='gif-img' data-animate='" + results[i].images.fixed_height.url + "' data-still='" +
                    results[i].images.fixed_height_still.url + "' data-state='still'>");
                newImage.attr("src", results[i].images.fixed_height_still.url);
                newDiv.append(p);
                newDiv.append(newImage);
                $("#char-gifs").append(newDiv);

            };

        });

    });

    // If user clicks "Reset Character Buttons" button, clear added buttons and go back to original ones from array.
    $("#reset-btns").on("click", function () {

        // Clear #char-btns content, append original buttons.
        $("#char-btns").html("");
        for (var i = 0; i < myArray.length; i++) {
            $("#char-btns").append('<button class="char-btn" data-char="' + myArray[i] + '">' + myArray[i] + '</button>');
        };

    });

    // When user clicks on an element with class=".gif-img" inside an element with id="char-gifs" - execute function:
    $("#char-gifs").on("click", ".gif-img", function () {

        // Store gif data-state value into var state.
        var state = $(this).attr("data-state");

        // If image is still then make gif animate. If gif is animating, make gif still.
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            state = $(this).attr("data-state", "animate");
        } else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            state = $(this).attr("data-state", "still");
        };

    });

});
