/**
 * filename : index.js
 * author : glenn abastillas
 * created : march 19, 2020
 * description : javascript to draw and (force) animate svg objects in index.html
 */

$(document).ready(function(){
    let $svg1 = $('svg[id="canvas-1"]'),
        $svg2 = $('svg[id="canvas-2"]'),
        $svg3 = $('svg[id="canvas-3"]');
    let svg1 = d3.select('svg[id="canvas-1"]'),
        svg2 = d3.select('svg[id="canvas-2"]'),
        svg3 = d3.select('svg[id="canvas-3"]');

    let height = $svg1.height(), width = $svg1.width();

});

/**
 * Function to plot circles on the specified selection
 * @param {d3 selection} selection - the specified d3 SVG canvas to plot in
 * @param {object} data - variables to plot in the selection
 */
function randint(min=5, max=10){
    let random = Math.random() * max;
    return Math.max(min, Math.floor(random));
}


function drag(element, e){
    e.preventDefault();
    let canvas = $("div[id='canvas-1']"),
        canvas_x = canvas.position().left,
        canvas_y = canvas.position().top;
    let x = e.clientX,
        y = e.clientY;

    // console.log(element.style);
    console.log(element.style['top']);
    console.log(element.style['left']);
    console.log(`x ${x} and y ${y}`);
    console.log(`Canvas-X ${canvas_x} and canvas-y ${canvas_y}`);
    console.log(`x - canvas-X ${x - canvas_x} and y - canvas-y ${y - canvas_y}`);

    element.style.left = `${x}px`;
    element.style.top = `${y}px`;

    // Calculate new cursor position
    // $(element).css("top", y).css("left", x);
}

function drop(e){
    // console.log(e.pageX);
    // console.log($(this).attr('top'));
    // $(this).css('top', `${e.pageY}px`).css('left', `${e.pageX}px`);
}