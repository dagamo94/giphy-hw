var gifsArr = ["zebra", "linx", "tiger", "elephant"];


function displayGifs(){
    var currentGif = $(this).attr("data-name")
    alert(currentGif);
    var displayLimit = 10;

    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
    currentGif + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=" + displayLimit;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        console.log(response);
    });
}

function renderButtons(){
    $("#buttons-view").empty();

    for(var i = 0; i <gifsArr.length; i++){
        var button = $("<button>").addClass("gif-button").attr("data-name", gifsArr[i]).text(gifsArr[i]);
        
        $("#buttons-view").append(button);
    }
}

$("#add-gifs").on("click", function(event){
    event.preventDefault();
    var gif = $("#gifs-input").val().trim();
    console.log(gif);

    gifsArr.push(gif);
    
    renderButtons();
    $("#gifs-input").val("");
});

$("#buttons-view").on("click", ".gif-button", displayGifs);
renderButtons();

