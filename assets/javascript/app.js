var gifsArr = ["zebra", "linx", "tiger", "elephant"];
var displayLimit = 10;


function displayGifs(){
    $("#gifs-view").empty();
    var currentGif = $(this).attr("data-name")
    var gifsNumber = $("#gifs-number").val();
    displayLimit = gifsNumber;

    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
    currentGif + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=" + displayLimit;



    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var results = response.data;

        for(var i = 0; i < results.length; i++){
            if(results[i].rating != 'r' && results[i] != 'pg-13'){
                var stillImg = results[i].images.fixed_height_still.url;
                var playImg = results[i].images.fixed_height.url;
                var gifDiv = $("<div>").addClass("float-left");
                var ratingP = $("<p>");
                var gifImage = $("<img>");

                ratingP.append("Rating: " + results[i].rating);

                gifImage.attr("src", stillImg).addClass("play-pause").attr("data-state", "still").attr("data-still", stillImg).attr("data-animate", playImg);

                gifDiv.append(ratingP, gifImage);

                $("#gifs-view").prepend(gifDiv);
            }
        }
    });
}

function playpause(){
    // alert($(this).attr("src"));
    console.log(this);
    var pressed = $(this).attr("data-state");
    var stillUrl = $(this).attr("data-still");
    var animateUrl = $(this).attr("data-animate");
    console.log(pressed);

    if(pressed === "still"){
        $(this).attr("src", animateUrl).attr("data-state", "animate");
    } else {
        $(this).attr("src", stillUrl).attr("data-state", "still");
    }

}

function renderButtons(){
    $("#buttons-view").empty();

    for(var i = 0; i <gifsArr.length; i++){
        var button = $("<button>").addClass("gif-button btn btn-light").attr("data-name", gifsArr[i]).text(gifsArr[i]);
        
        $("#buttons-view").append(button);
    }
}

$("#add-gifs").on("click", function(event){
    event.preventDefault();
    var gif = $("#gifs-input").val().trim();

    console.log(gif);

    if(gif !== ""){
        gifsArr.push(gif);
        
        renderButtons();

        console.log("display limit: ", displayLimit);

        $("#gifs-input").val("");
    }

});

$("#buttons-view").on("click", ".gif-button", displayGifs);


$("#gifs-view").on("click", ".play-pause", playpause);

renderButtons();