/**
 * filename : index.js
 * author : glenn abastillas
 * created : march 19, 2020
 * description : javascript to draw and (force) animate svg objects in index.html
 */

$(document).ready(function(){
    // study_1.dragElement();
    let start = {x:0, y:0}, end = {x:0, y:0};

    // Make all objects draggable
    $('div[class="object"]').attr('draggable', true);

    // Study 1 : Drag an object and have it stay with the new coordinates
    // $(function(){$('#canvas-1 #object-1').draggable()});

    $('#canvas-1 #object-1').on('dragstart', function(a,b,c){console.log([a,b,c])});
                            // .attr('ondragover', study[1].dragover)
                            // .attr('ondragend', study[1].dragend);




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

function study1_dragstart(event){
    console.log(event);
}
function study1_drag(event){}
function study1_dragend(event){}

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