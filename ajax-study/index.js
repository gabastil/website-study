$(document).ready(function(){
    const submit = $('button#submit'),
          panel = $('div.content'),
          api = 'http://newsapi.org/v2';


    submit.click(function(){
        let country = $("input[name='country']").val(),
            api_key = $("input[name='api-key']").val();

        let request = `${api}/top-headlines\?country=${country}&category=business&apiKey=${api_key}`;

        let results = $.ajax({

        });
    });

});
