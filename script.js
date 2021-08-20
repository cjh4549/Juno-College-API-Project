const app = {};

app.key = '781ededf-134b-4441-8359-258955d153a3';

app.$dogSelection = $('.dogSelection');
app.$breedTemp = $('.breedTemp');
app.$dogNo = $('.dogNo');

app.displayNewPage = () => {
    $('#show').on('click', function(){
        $('.container').css('animation', 'disappear .5s ease-in-out forwards');
        app.$dogSelection.addClass('dogContainer').removeClass('displayNone');
        app.setDogBreed();
    })
}

app.randomizer = (array) => {
    console.log(array);
    const randomNumber = Math.floor(Math.random() * array.length);
    return array[randomNumber]
}

app.randomTextPosition = () => {
    const randomPosition = Math.floor(Math.random() * 70);
    return randomPosition
}

app.clickNo = () => {
    app.$dogNo.on('click', function(){
        app.$breedTemp.empty();
        app.setDogBreed();
    })
}

//The goal of the app was to make the user press YES or NO button depending on  whether they like the breed's temperaments. When YES button is pressed, I wanted to call the matching breed and append it to html with the breed's img url and its descriptions. Each time button NO is pressed, I wanted to produce a new set of temperanments. But as you can see in the console, for some weird reason, the click event multipliess arrays of temperanment with each click of NO button. If you could help me figure out what's the issue in the code, that would be much appreciated! I also wanted to display the temperanments in random positions but not too random that they don't stack on top of one another, which happens occassionally. If you could also give me an idea/ general direction on how to creatively bring about the effect, that would be awesome too! Thank you :)

app.getDogData = () => {
    return $.ajax({
        url: 'https://api.thedogapi.com/v1/breeds',
        method: 'GET',
        dataType: 'json',
        data: {
            api_key: app.key
        }
    })
}

app.setDogBreed = () => {
    const dogDetail = app.getDogData();
    dogDetail.then(function(breed){
        const breedTemp = app.randomizer(breed).temperament.split(','); //breedTemp returns an array
        console.log(breedTemp)
        breedTemp.forEach(temperament => {
            app.$breedTemp.append(`<p style="top: ${app.randomTextPosition()}%; left: ${app.randomTextPosition()}%">${temperament}</p>`);
        });
        app.clickNo();    
    })
}

app.init = function(){
    app.displayNewPage();
};

$(document).ready(function(){
    app.init();  
})