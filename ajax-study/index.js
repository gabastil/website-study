$(document).ready(function(){
    const submit = $('button#submit'),
          display = $('div.display'),
          api = 'http://newsapi.org/v2';


    submit.click(function(){
        let country = $("input[name='country']").val(),
            apiKey = '869eb8187df5436c87f1e5c84a3b664f';

        display.empty();

        if (country){
            let url = `${api}/top-headlines`;
            let data = {
                country : country,
                category : 'business',
                apiKey : apiKey
            };

            url += `?country=${data.country}&category=${data.category}&apiKey=${data.apiKey}`;

            // console.log(url);
            $.get(url, updateDisplay);

            function updateDisplay(data){
                // console.log(data);
                let status = data.status, articles = data.articles;

                if (status === 'ok'){
                    let article = '';

                    articles.forEach(datum => {
                        // console.log(datum);
                        if (datum !== undefined){
                            article += `<div class='article'>
                                       <h2>${titleCase(datum.title)}</h2>
                                       <p>${datum.author || 'Anonymous'}</p>
                                       <p>Description: ${datum.description}</p>
                                       <p>Content: ${datum.content}</p>
                                       <p><a href='${datum.url}' target='blank'>Link to Source</a></p>
                                       </div>`;
                        }
                    });
                    display.append(article);
                } else {
                    display.append('<p>There was an error in retrieving your data via AJAX. No data to display.</p>');
                }
            }
        } else {
            alert('No country entered.')
        }
    });
});

function titleCase(string){
    let output = '';

    string.split(" ").forEach(element => {
        if (element !== undefined){
            output += element[0].toUpperCase() + element.slice(1) + ' ';
        }
    })

    return output.trim();
}