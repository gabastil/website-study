/**
 * filename : index.js
 * author : glenn abastillas
 * created : march 19, 2020
 * description : javascript to draw and (force) animate svg objects in index.html
 */

$(document).ready(function(){
    var dragged,
        prev = {x:0,y:0}, curr = {x:0,y:0};
    $('.object').attr('draggable', true);
    $('.zone .object').attr('draggable', true);
    $('.canvas .object').attr('draggable', true);

    // Study 1: Dragging Shapes
    function study1_dragstart(e){
        dragged = e.target;
        dragged.style.border = 'solid 2px black';
        dragged.style.opacity = 0.5;
        curr.x = e.pageX, curr.y = e.pageY;
    }

    function study1_dragover(e){
        e.preventDefault();
        let target = e.target;

        prev.x = curr.x - e.pageX;
        prev.y = curr.y - e.pageY;
        curr.x = e.pageX;
        curr.y = e.pageY;

        target.style.left =  target.offsetLeft - prev.x + "px";
        target.style.top =  target.offsetTop - prev.y + "px";
    }

    function study1_dragend(e){
        e.preventDefault();
        let canvas = $('#canvas-1');
        let target = e.target;
        let border_top = canvas.offset().top,
            border_left = canvas.offset().left,
            border_bottom = canvas.height() + border_top,
            border_right = canvas.width() + border_left;
        let offset_top = target.offsetTop - target.style.height,
            offset_left = target.offsetLeft - target.style.width;


        if (offset_left > border_right) {
            target.style.left = +border_right - target.style.width + 'px';
        }

        if (offset_top > border_bottom) {
            target.style.top = +border_bottom - target.style.width + 'px';
        }

        dragged.style.border = '';
        dragged.style.opacity = '';

    }

    $('#canvas-1 #object-1').on('dragstart', study1_dragstart)
                            .on('dragover', study1_dragover)
                            .on('dragend', study1_dragend);

    // Study 2 : Drag and Drop Zones
    var dragged2;

    function study2_dragstart(e){
        dragged2 = e.target;
        dragged2.style.background = 'blue';
    }

    function study2_dragover(e){
        e.preventDefault();
    }

    function study2_drop(e){
        e.preventDefault();
        dragged2.style.background = 'SeaGreen';
        e.target.appendChild(dragged2);
    }

    $('.zone #object-1').on('dragstart', study2_dragstart);
    $('#canvas-2 .zone').on('dragover', study2_dragover)
                          .on('drop', study2_drop);


    // Study 3 : Drag and Drop with D3
    var dragged3, object = $('#canvas-3 .object');

    function study3_mousedown(e){
        curr.x = e.pageX, curr.y = e.pageY;
        object.on('mousemove', study3_mousemove)
              .on('mouseup', study3_mouseup);
    }

    function study3_mousemove(e){

        prev.x = curr.x - e.pageX;
        prev.y = curr.y - e.pageY;
        curr.x = e.pageX;
        curr.y = e.pageY;

        object.attr('x', object.offset().left - prev.x + 'px');
        object.attr('y', object.offset().top - prev.y + 'px');

        console.log([object.attr('x'), object.attr('y')]);

        object.on('mouseup', study3_mouseup);
    }
    function study3_mouseup(e){
        object.on('mousemove', null);
    }

    object.on('click', function(e){console.log(e)});
    object.on('mousedown', study3_mousedown);
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