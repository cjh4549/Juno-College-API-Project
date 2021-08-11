const app = {};

app.key = '781ededf-134b-4441-8359-258955d153a3';

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

app.getResponse = () => {
    const result = app.getDogData();
    result.then(function(res){
        console.log(res);
    })
}

app.init = function(){
    app.getResponse();
};

$(document).ready(function(){
    app.init();  
})