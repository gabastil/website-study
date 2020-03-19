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
    let nodes2 = d3.range(0, 10).map(function(d){return {id : d, r : Math.max(3, Math.random() * 10)}});
    let links = [
                 {source:0, target:1},
                 {source:0, target:2},
                 {source:0, target:3},
                 {source:0, target:4},
                 {source:2, target:5},
                 {source:2, target:6},
                 {source:6, target:7},
                 {source:7, target:8},
                 {source:7, target:9},
                ]

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
    sim = d3.forceSimulation(nodes2)
                .force('charge', d3.forceManyBody().strength(-40))
                .force('center', d3.forceCenter(width / 2, height / 2))
            .force('link', d3.forceLink().links(links).distance(20))
            .on('tick', ticked_2);

    function ticked_2(){
        let v = svg2.selectAll("text").data(nodes2);

        v.enter()
         .append('text')
         .text(function(d) { return d.id })
         .merge(v)
         // .attr('r', function(d) { return d.r })
         .attr('id', function(d) { return d.id })
         .attr('x', function(d) { return d.x})
         .attr('y', function(d) { return d.y});

        v.exit().remove();

        update_links();
    }

    function update_links(){
        var k = d3.select('.links').selectAll('line').data(links);

        k.enter()
         .append('line')
         .merge(k)
         .attr('x1', function(d) { return d.source.x })
         .attr('y1', function(d) { return d.source.y })
         .attr('x2', function(d) { return d.target.x })
         .attr('y2', function(d) { return d.target.y });

        k.exit().remove();
    }


});