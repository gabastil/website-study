/*
    filename: index.js
    author: glenn abastillas
    created: 2020-02-27
    description: stylesheet for the input, button, and form element study
 */

 $(document).ready(function(){

    const TEXT = $("input[type='text']"),
          TEXTAREA = $("textarea"),
          EMAIL = $("input[type='email']"),
          PASSWORD = $("input[type='password']"),

          DROPDOWN = $("select#dropdown"),
          DROPDOWN_EMPTY = $("select#dropdown-empty"),
          MULTIPLE_SELECT = $("select#multiple-select"),

          RANGE = $("input[type='range']"),

          BUTTON = $("button[name='button']"),
          SUBMIT = $("submit[type='submit']"),

          COLOR = $("input[type='color']"),

          FILE_TXT = $("input[name='open-file-txt']"),
          FILE_IMG = $("input[name='open-file-img']"),
          OUTPUT1 = $("div#output"),
          OUTPUT2 = $("img#output");

    console.log(DROPDOWN_EMPTY);

    function readText(){
        // Read user specified text file in <input type="file">
        let text_ = TEXT.val() + TEXTAREA.val();
        let option = `<option>${EMAIL.val()}</option>`;

        DROPDOWN_EMPTY.append(option);
        console.log(EMAIL.val());
        console.log(PASSWORD.val());

        if (OUTPUT1.text().length > 100){
            OUTPUT1.text(text_);
        } else {
            OUTPUT1.text(OUTPUT1.text() + text_);
        }
    };


    function loadFile(event){
        // Read user specified image file in <input type="file">
        let reader = new FileReader();

        reader.onload = function(e){
            OUTPUT2.attr("src", reader.result);
        }

        reader.readAsDataURL(FILE_IMG[0].files[0]);
    }


    function updateNumber(event){
        let ranger_label = $('label[for="range"]');
        ranger_label.text(`Range ${RANGE.val()}`);
    }


    function getColor(event){
        // Change the font color of the color input label to user specified
        let color_label = $("label[for='color']");

        console.log(COLOR);
        console.log(COLOR.val());

        color_label.css('color', COLOR.val());
    }


    function reset(){
        OUTPUT1.text("");
        OUTPUT2.attr("src", "");
    }

    function updateOption1(){
        OUTPUT1.text($(this).val());
    }

    BUTTON.click(readText);
    SUBMIT.click(loadFile);
    RANGE.change(updateNumber);
    COLOR.change(getColor);
    MULTIPLE_SELECT.change(updateOption1);


 });