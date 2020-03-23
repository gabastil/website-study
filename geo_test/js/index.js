/**
 * filename : index.js
 * author : glenn abastillas
 * created : march 19, 2020
 * description : javascript to draw and (force) animate svg objects in index.html
 */

$(document).ready(function(){
    var dragged,
        prev = {x:0,y:0},
        curr = {x:0,y:0};

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
    let object1 = $('#canvas-1 #object-1'),
        canvas1 = $('#canvas-1'),
        top = parseInt(canvas1.position().top),
        left = parseInt(canvas1.position().left + object1.width()),
        bottom = parseInt(canvas1.height() - object1.height()),
        right = parseInt(canvas1.width() - object1.width());

    // Randomly place the square object
    object1.css('top', randint(top, bottom))
           .css('left', randint(left, right));

    object1.on('dragstart', study1_dragstart)
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
    var study3 = d3.select('#canvas-3'),
        object = d3.selectAll('#canvas-3 rect'),
        drag = d3.drag();

    var deltaX, deltaY;

    function study3_dragstart(){
        let current = d3.select(this);
        current.raise();
        deltaX = parseInt(current.attr('x')) - d3.event.x;
        deltaY = parseInt(current.attr('y')) - d3.event.y;
    }

    function study3_dragover(){
        let current = d3.select(this);
        current.attr('x', d3.event.x + deltaX + 'px')
               .attr('y', d3.event.y + deltaY + 'px')
               .style('fill', 'SeaGreen');
    }

    function study3_dragend(){
        let current = d3.select(this);
        current.style('fill', 'red');
    }

    drag.on('start', study3_dragstart)
        .on('drag', study3_dragover)
        .on('end', study3_dragend);
    drag(object);


    // Study 4 : Drag with D3 and update positions per d3.force
    var study4 = d3.select('#canvas-4'),
        drag4 = d3.drag();

    var deltaX, deltaY;

    function study4_dragstart(){
        let current = d3.select(this);
        current.raise();
        deltaX = parseInt(current.attr('x')) - d3.event.x;
        deltaY = parseInt(current.attr('y')) - d3.event.y;
    }

    function study4_dragover(){
        let current = d3.select(this);
        current.attr('x', d3.event.x + deltaX + 'px')
               .attr('y', d3.event.y + deltaY + 'px')
               .style('fill', 'SeaGreen');

        let idx = $(this).attr('id') - 1;

        study4data[idx].x = d3.event.x + deltaX;
        study4data[idx].y = d3.event.y + deltaY;
    }

    function study4_dragend(){
        let current = d3.select(this);
        current.style('fill', 'red');
        console.log('end');

        let simulation = d3.forceSimulation(study4data)
                           .force('charge', d3.forceManyBody().strength(-5))
                           .force('collide', d3.forceCollide(12))
                           .on('tick', function(){tick(study4, study4data)});

        function tick(selection, data){
            let u = selection.selectAll('rect').data(data);

            u.enter()
             .append('rect')
             .merge(u)
             .attr('id', function(d){return d.id})
             .attr('fill', 'cornflowerblue')
             .attr('x', function(d){return d.x})
             .attr('y', function(d){return d.y})

            // u.transition().duration(1000).attr('fill', 'red');

            u.exit().remove();
        }
    }

    let study4data = [
                        {id : 1, x : randint(left, right), y : randint(top, bottom)},
                        {id : 2, x : randint(left, right), y : randint(top, bottom)},
                        {id : 3, x : randint(left, right), y : randint(top, bottom)},
                        {id : 4, x : randint(left, right), y : randint(top, bottom)},
                     ];


    let object4 = d3.selectAll('#canvas-4 rect');

    drag4.on('start', study4_dragstart)
        .on('drag', study4_dragover)
        .on('end', study4_dragend);

    drag4(object4);

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
