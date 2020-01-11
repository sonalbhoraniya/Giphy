$(document).ready(function () {

    var topics = ["cinderella", "frozen", "snow white", "aladdin", "sleeping beauty"];

    function buttonCreation() {

        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("movie");
            gifButton.attr("movie-name", topics[i]);
            gifButton.text(topics[i]);
            $("#buttons-view").append(gifButton);

        }

    }
    buttonCreation();

    $("#add-movie").on("click", function (event) {
        event.preventDefault();
        var movie = $("#movie-input").val().trim();
        // topics.push(movie);
        // console.log(movie); 
        // buttonCreation();
        var gifB = $("<button>");
            gifB.addClass("movie");
            gifB.attr("movie-name", movie);
            gifB.text(movie);
            $("#buttons-view").append(gifB);

    });

})

//     $("button").on("click", function () {

        

// })

$(document).on("click", "button", function(event) {


    $("#gifs-appear-here").empty();

    var disney = $(this).attr("movie-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + disney + "&api_key=Pj78Bz6fTLsQVlcVRKrDgmCdb1GfHTKi&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {

            console.log(queryURL);
            console.log(response);

            var results = response.data;


            for (var i = 0; i < results.length; i++) {

                console.log(results[i].images.fixed_height_small_still.url);

                var movieDiv = $("<div>");

                var p = $("<p>").text("Rating: " + results[i].rating);

                var movieImage = $("<img>");
                movieImage.addClass("gif");
                movieImage.attr("data-state", "still");
                movieImage.attr("data-still", results[i].images.fixed_height_small_still.url)
                movieImage.attr("data-animate", results[i].images.fixed_height_small.url)

                movieImage.attr("src", results[i].images.fixed_height_small_still.url);

                movieDiv.append(p);
                movieDiv.append(movieImage);

                $("#gifs-appear-here").prepend(movieDiv);

            }

            $(".gif").on("click", function () {

                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            })
        })

})