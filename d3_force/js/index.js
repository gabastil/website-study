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
    let nodes1 = d3.range(0, 10).map(function(d){return {id : d, r : Math.max(3, Math.random() * 20)}});

    // This is the main D3 Force Simulation initialization step.
    let sim = d3.forceSimulation(nodes1)
                .force('charge', d3.forceManyBody().strength(10))
                .force('center', d3.forceCenter(width / 2, height / 2))
                .force('collision', d3.forceCollide().radius(function(d) { return d.r + 1 }))
                .on('tick', ticked_1);

    function ticked_1(){
        let u = svg1.selectAll("circle").data(nodes1);

        u.enter()
         .append('circle')
         .attr('r', function(d) {return d.r})
         .attr('id', function(d) { return d.id })
         .merge(u)
         .attr('cx', function(d) { return d.x })
         .attr('cy', function(d) { return d.y });

        u.exit().remove();
    }


    // Study 2 : Creating links between nodes
    let nodes2 = d3.range(0, 10).map(function(d){return {id : d, r : Math.max(3, Math.random() * 10)}});
    let links2 = d3.range(0, 10).map(function(d){return {source : Math.floor(Math.random() * 10),
                                                        target : Math.floor(Math.random() * 10)}});
    sim = d3.forceSimulation(nodes2)
                .force('charge', d3.forceManyBody().strength(-10))
                .force('center', d3.forceCenter(width / 2, height / 2))
            .force('link', d3.forceLink().links(links2).distance(15))
            .on('tick', ticked_2);

    function ticked_2(){
        update_links(svg2, links2);

        let v = svg2.selectAll("text").data(nodes2);

        v.enter()
         .append('text')
         .text(function(d) { return d.id })
         .merge(v)
         .attr('id', function(d) { return d.id })
         .attr('x', function(d) { return d.x})
         .attr('y', function(d) { return d.y});

        v.exit().remove();

    }

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

    // Study 3 : Creating draggable links connected with lines
    let nodes3 = d3.range(0, 13).map(function(d){return {id : d, r : Math.max(5, Math.random() * 10)}});
    let links3 = d3.range(0, 13).map(function(d){return {source : Math.floor(Math.random() * 10),
                                                        target : Math.floor(Math.random() * 10)}});

    sim = d3.forceSimulation(nodes3);
    sim.force('charge', d3.forceManyBody().strength(-20));
    sim.force('center', d3.forceCenter(width / 2, height / 2));
    sim.force('link', d3.forceLink(links3).distance(31));
    sim.on('tick', ticked_3);

    function ticked_3(){
        update_links(svg3, links3);

        let p = svg3.selectAll("circle").data(nodes3);
        let colors = ['red', 'yellow', 'blue', 'green'];

        p.enter()
         .append('circle')
         .attr('r', function(d) {return d.r})
         .attr('id', function(d) {return d.id})
         .attr('class', 'step-3')
         .merge(p)
         .attr('cx', function(d) {return d.x})
         .attr('cy', function(d) {return d.y})
         .attr('fill', function(d) {return colors[+d.id % 4]});

        p.exit().remove();
    }

    // Study 4 : Draggable
    let drag = d3.drag().on('start', dragstart).on('drag', dragged).on('end', dragend);

    // Implement drag

});