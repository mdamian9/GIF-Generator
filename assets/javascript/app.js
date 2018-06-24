$(document).ready(function () {
    var myArray = ["dog", "cat", "turtle", "eagle", "zebra"];

    for (var i = 0; i < myArray.length; i++) {
        $("#animal-btns").append('<button class="animal-btn" animal-data="' + myArray[i] + '">' + myArray[i] + '</button>');
    };

    $(".animal-btn").on("click", function () {
        var animal = $(this).attr("animal-data");
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
                var newImage = $("<img>");
                newImage.attr("src", results[i].images.fixed_height.url);
                newDiv.append(p);
                newDiv.append(newImage);
                $("#animal-gifs").prepend(newDiv);

            };

        });
    });

    $("#animal-form").submit(function (e) {
        e.preventDefault();

        // when user clicks submit -- need the following
        // obtain user input and set to variable
        // create a loop (do while?) that creates and appends animal buttons to the page
        // set it up so that it obtains data from giphy api

    });



});