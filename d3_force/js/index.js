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

    let nodes1 = d3.range(10).map((data,index,array) => nodes(data,4,30));
    let nodes2 = d3.range(10).map((data,index,array) => nodes(data,4,20));
    let nodes3 = d3.range(10).map((data,index,array) => nodes(data,4,15));
    let links1 = d3.range(10).map((data,index,array) => links(data,0,10));
    let links2 = d3.range(10).map((data,index,array) => links(data,0,10));
    let links3 = d3.range(10).map((data,index,array) => links(data,0,10));
    let colors = ['red', 'yellow', 'green', 'blue', 'orange', 'purple'];
    let sim1, sim2, sim3;

    // This is the main D3 Force Simulation initialization step.
    sim1 = d3.forceSimulation(nodes1)
            .force('charge', d3.forceManyBody().strength(10))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(function(d){return d.r+1}))
            .on('tick', function(){ticked(svg1, nodes1)});

    // Study 2 : Creating links between nodes
    sim2 = d3.forceSimulation(nodes2)
            .force('charge', d3.forceManyBody().strength(-40))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('link', d3.forceLink().links(links2).distance(20))
            .on('tick', function(){ticked(svg2, nodes2, links2, true)});

    // Study 3 : Creating links between nodes that respond to mouse events
    sim3 = d3.forceSimulation(nodes3)
            .force('charge', d3.forceManyBody().strength(-5))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('link', d3.forceLink().links(links3).distance(20))
            .on('tick', function(){ticked(svg3, nodes3, links3, false, colors)});


    // Study 3 : Dragstarted, dragged, dragended functions

    /**
     * Function to call on drag start
     * @param {object} d - default argument passed through by d3.drag
     */
    function dragstarted(d){
        d3.select(this).raise().attr("stroke", "black");
    }

    function dragged(d){
        d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    }

    function dragended(d){
        d3.select(this).attr("stroke", null);
    }

    function clicked(d, i){
        console.log("inside clicked");
        d3.select(this).transition()
          .attr('fill', 'black')
          .attr('r', d.r * 2)
          .transition()
          .attr('r', d.r)
          .attr('fill', colors[i % colors.length]);
    }

    let drag = d3.drag()
                 .on('start', dragstarted)
                 .on('drag', dragged)
                 .on('end', dragended);

    console.log("Pre click");

    svg3.selectAll('circle')
        .transition().duration(1000)
        .attr("r", 30);

    console.log(svg3);
});

/**
 * Dummy function to create node data
 * @param {integer} data - array data element
 * @param {integer} min - starting index for a range
 * @param {integer} max - ending index for a range
 *
 * @returns {object} - node with attributes
 */
function nodes(data, min=0, max=10){
    return {id : data, r : randint(min, max)}
}
/**
 * Dummy function to create node data
 * @param {integer} data - array data element
 * @param {integer} min - starting index for a range
 * @param {integer} max - ending index for a range
 *
 * @returns {object} - node with attributes
 */
function links(data, min=0, max=10){
    return {source : randint(min, max), target : randint(min, max)}
}

/**
 * Function to plot circles on the specified selection
 * @param {d3 selection} selection - the specified d3 SVG canvas to plot in
 * @param {object} data - variables to plot in the selection
 */
function randint(min=5, max=10){
    let random = Math.random() * max;
    return Math.max(min, Math.floor(random));
}

/**
 * Function to assess and plot SVG objects for the forceSimulation function
 * @param {d3 selection} selection - the specified d3 SVG canvas to plot in
 * @param {object} data - variables to plot in the selection
 * @param {object} links - variables to plot links in the selection
 * @param {boolean} text - indicate whether or not the data is text or circles
 * @param {array} colors - array of colors to fill circles with
 */
function ticked(selection=svg1, data=nodes1, links=undefined, text=false, colors=undefined){
    if (links !== undefined) {
        update_links(selection, links);
    }

    if (text) {
        plot_text(selection, data);
    } else {
        plot_circles(selection, data, colors);
    }
}

/**
 * Function to plot circles on the specified selection
 * @param {d3 selection} selection - the specified d3 SVG canvas to plot in
 * @param {object} data - variables to plot in the selection
 */
function plot_circles(selection, data, colors=undefined){
    let u = selection.selectAll("circle").data(data);

    u.enter()
     .append('circle')
     .attr('r', function(d) {return d.r})
     .attr('id', function(d) { return d.id })
     .merge(u)
     .attr('cx', function(d) { return d.x })
     .attr('cy', function(d) { return d.y });

    if (colors !== undefined){
        u.attr('fill', function(d) {return colors[d.id % colors.length]});
    }
    u.exit().remove();
}

/**
 * Function to plot text on the specified selection
 * @param {d3 selection} selection - the specified d3 SVG canvas to plot in
 * @param {object} data - variables to plot in the selection
 * @param {object} links - variables to plot links in the selection
 */
function plot_text(selection, data, links=undefined){
    let v = selection.selectAll("text").data(data);

    v.enter()
     .append('text')
     .text(function(d) { return d.id })
     .merge(v)
     // .attr('r', function(d) { return d.r })
     .attr('id', function(d) { return d.id })
     .attr('x', function(d) { return d.x})
     .attr('y', function(d) { return d.y});

    v.exit().remove();
}

/**
 * Function to plot linking lines on the specified selection
 * @param {d3 selection} selection - the specified d3 SVG canvas to plot in
 * @param {object} data - variables to plot in the selection
 */
function update_links(selection, data){
    var k = selection.selectAll('line').data(data);

    k.enter()
     .append('line')
     .merge(k)
     .attr('x1', function(d) { return d.source.x })
     .attr('y1', function(d) { return d.source.y })
     .attr('x2', function(d) { return d.target.x })
     .attr('y2', function(d) { return d.target.y });

    k.exit().remove();
}
