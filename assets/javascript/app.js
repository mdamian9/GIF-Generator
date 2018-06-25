$(document).ready(function () {
    var myArray = ["dog", "cat", "turtle", "eagle", "zebra"];

    for (var i = 0; i < myArray.length; i++) {
        $("#animal-btns").append('<button class="animal-btn" data-animal="' + myArray[i] + '">' + myArray[i] + '</button>');
    };

    // Prevents page from refreshing when clicking on "Submit"
    $("#animal-form").submit(function (e) {
        e.preventDefault();

        // var animalName = $("#animal-input").val();

        if ($("#animal-input").val() === "") {
            alert("There was no input. Please try again!");
        } else {
            $("#animal-btns").append('<button class="animal-btn" data-animal="' + $("#animal-input").val() + '">' +
                $("#animal-input").val() + '</button>');
        };

        console.log($("#animal-input").val());

        // when user clicks submit -- need the following
        // obtain user input and set to variable
        // create a loop (do while?) that creates and appends animal buttons to the page
        // set it up so that it obtains data from giphy api

        // var x;
        // x = $("#animal-input").value;
        // console.log(x);

    });

    $("#animal-btns").on("click", ".animal-btn", function () {
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

    // Function: when user clicks on an element with class=".gif-img" inside an element with id="animal-gifs" - if image is still then
    // make gif animate. If gif is animating, make gif still
    $("#animal-gifs").on("click", ".gif-img", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            state = $(this).attr("data-state", "animate");
        } else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            state = $(this).attr("data-state", "still");
        };

    });

});
