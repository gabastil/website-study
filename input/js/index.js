/*
    filename: index.js
    author: glenn abastillas
    created: 2020-02-27
    description: stylesheet for the input, button, and form element study
 */

 $(document).ready(function(){

    function readText(){
        let text = $("input[type='text']");
        let textarea = $("textarea[name='textarea']");
        let email = $("input[type='email']");
        let password = $("input[type='password']");

        let text_ = text.val() + textarea.val();
        let output = $("div#output");

        console.log(email.val());
        console.log(password.val());

        if (output.text().length > 100){
            output.text(text_);
        } else {
            output.text(output.text() + text_);
        }
    };

    function loadFile(event){
        let file_img = $("input[name='open-file-img']")[0];
        let file = $("input[name='open-file']")[0];

        let target_img = $("img[id='output']");
        let reader = new FileReader();

        reader.onload = function(e){
            // console.log(reader.result);
            target_img.attr("src", reader.result);
        }
        // console.log(event.files);

        reader.readAsDataURL(file_img.files[0]);
    }

    $("button[name='button']").click(readText);
    $("input[name='submit']").click(loadFile);

 });