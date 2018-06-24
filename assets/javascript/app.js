$(document).ready(function () {
    var myArray = ["dog", "cat", "turtle", "eagle", "zebra"];

    for (var i = 0; i < myArray.length; i++) {
        $("#animal-btns").append('<button class="animal-btn" data-animal="' + myArray[i] + '">' + myArray[i] + '</button>');
    };

    $(".animal-btn").on("click", function () {
        var animal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var newDiv = $("<div>");
                var p = $("<p>");
                p.text("Rating: " + results[i].rating);
                var newImage = $("<img class='gif-img' data-animate='" + results[i].images.fixed_height.url + "' data-still='" +
                    results[i].images.fixed_height_still.url + "' data-state='still'>");
                newImage.attr("src", results[i].images.fixed_height_still.url);
                newDiv.append(p);
                newDiv.append(newImage);
                $("#animal-gifs").prepend(newDiv);

            };

        });
    });

    // this function is not working properly yet
    $(".gif-img").on("click", function () {

        alert("click on gif works");

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            state = $(this).attr("data-state", "animate");
        } else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            state = $(this).attr("data-state", "still");
        };

        console.log(state);

    });

    // Prevents page from refreshing when clicking on "Submit"
    $("#animal-form").submit(function (e) {
        e.preventDefault();

        // when user clicks submit -- need the following
        // obtain user input and set to variable
        // create a loop (do while?) that creates and appends animal buttons to the page
        // set it up so that it obtains data from giphy api

    });



});

// Fix start / stop gif by clicking on gif
// Obtain user input
// Save user input to variable
// Create new button based on user input
// Give new button same functionality as the rest

// When button is clicked, CSS is changed (?)
