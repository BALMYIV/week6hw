var sportsCars = ["nsx", "GTO", "Chevelle", "chevy nova"];

    
    sportsCars.forEach(function(car) {
    var gifButton = $("<button>").attr( {'class': 'carButton btn-large', 'data-input': car}).html(car);
    gifButton.appendTo(".button-field");
    console.log(car);

})


$('#new-car').click(function() {
    event.preventDefault();

    var newCar = $('#gif-input').val();
    var userGifButton = $('<button>').attr({'class' : 'carButton btn-large', 'data-input': newCar }).html(newCar)
    userGifButton.appendTo(".button-field");
    console.log(newCar);

    $("#gif-input").val("");


    }); 


$(document.body).on("click", ".carButton", function() {
    var a = $(this).attr('data-input');
    apiCall(a);
});

function apiCall(a) {

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=f8905f50214141e680a439bf7f9d6530&q="+ a +"&limit=10&rating=G"  ;

    console.log(queryURL);



    $.ajax({
        url: queryURL ,
        method: 'GET'
    }).done(function(response) {
        console.log(response)
        var data = response.data; 
        console.log(data);
        $(".gif-field").empty();

        for (var i =0; i < data.length; i++){
            var stillImg = data[i].images.fixed_height_still.url;
            var animateImg = data[i].images.fixed_height.url;
            var rating = data[i].rating;

            var carDiv = $('<div class="carDiv">')
            carDiv.append($('<div class="rating">').text(rating));
            var gif = $('<img>').attr({'class': 'carImg', 'data-still': stillImg, 'data-animate': animateImg, 'data-state': 'still', 'src': stillImg});
            carDiv.append(gif);
            $('.gif-field').append(carDiv);
        }
    })


};

$(document).on("click", ".carImg", function () {
    var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }


});
