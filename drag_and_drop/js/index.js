/**
 * filename : index.js
 * author : glenn abastillas
 * created : march 19, 2020
 * description : javascript to draw and (force) animate svg objects in index.html
 */

$(document).ready(function(){
    var dragged, prev = {x:0,y:0}, curr = {x:0,y:0};
    // Make all objects draggable
    $('.object').attr('draggable', true);

    // Study 1: Dragging Shapes
    function study1_dragstart(e){
        dragged = e.target;
        dragged.style.border = 'solid 2px black';
        dragged.style.opacity = 0.5;
        curr.x = e.pageX, curr.y = e.pageY;

        // let img = new Image();
        // img.src = null;
        // e.dataTransfer.setDragImage(img, 0, 0);
    }

    function study1_dragover(e){
        let target = e.target;

        console.log(target.style);
        console.log(target.style.left);
        console.log(target.style.top);

        prev.x = curr.x - e.pageX;
        prev.y = curr.y - e.pageY;
        curr.x = e.pageX;
        curr.y = e.pageY;

        target.style.left =  target.offsetLeft - prev.x + "px";
        target.style.top =  target.offsetTop - prev.y + "px";

        console.log([prev, curr]);
        console.log([e.pageX, e.pageY]);
    }

    function study1_dragend(e){
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
                            .on('drag', study1_dragover)
                            .on('dragend', study1_dragend);

    // Study 2 : Drag and Drop Zones
    $('.zone .object').attr('draggable', true);

    function study2_dragstart(e){
        console.log(e.dataTransfer);
        // e.dataTransfer.setData('text/plain', null);
        dragged = e.target;
    }

    function study2_dragover(e){
        e.preventDefault();
        curr.x = prev.x - e.pageX;
        curr.y = prev.y - e.pageY;
        prev.x = e.pageX;
        prev.y = e.pageY;
        this.style.left = this.style.offsetX - prev.x;
        this.style.top = this.style.offsetY - prev.y;
    }
    function study2_dragend(e){
        e.preventDefault();

        if (e.target.className === 'zone') {
            e.target.style.background = 'pink';
            dragged.parseNode.removeChild(dragged);
            e.target.appendChild(dragged);
        }
    }

    $('#canvas-2 #object-1').on('dragstart', study2_dragstart)
                            .on('drag', study2_dragover)
                            .on('dragend', study2_dragend);

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

function dragstart(event){}
function drag(event){}
function dragend(event){}

// Object for Study 1 : Simple Drag Functions
// const study_1 = {
//     start : {x : 0, y : 0},
//     end : {x : 0, y : 0},
//     obj : '#object-1',

//     dragElement : function(element){
//         $(document).mousedown(this.dragstart);
//         $(document).mouseup(this.dragend);
//     },

//     dragstart : function(event){
//         event.preventDefault();
//         study_1.start.x = event.clientX;
//         study_1.start.y = event.clientY;
//         $(document).mouseup(study_1.dragend);
//         $(document).mousemove(study_1.drag);
//     },

//     drag : function(event){
//         event.preventDefault();
//         study_1.end.x = study_1.start.x - event.clientX;
//         study_1.end.y = study_1.start.y - event.clientY;
//         study_1.start.x = event.clientX;
//         study_1.start.y = event.clientY;

//         console.log(study_1.end);
//         $(study_1.obj).attr('top', $(study_1.obj).offset().top - study_1.end.y);
//         $(study_1.obj).attr('left', $(study_1.obj).offset().left - study_1.end.x);

//     },

//     dragend : function(event){
//         $(document).mouseup(null);
//         $(document).mousemove(null);
//     },
// }