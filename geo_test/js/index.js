/**
 * filename : index.js
 * author : glenn abastillas
 * created : march 19, 2020
 * description : javascript to draw and (force) animate svg objects in index.html
 */

$(document).ready(function(){
    let s1 = d3.select("#canvas-1"),
        s2 = d3.select("#canvas-2"),
        s3 = d3.select("#canvas-3"),
        s4 = d3.select("#canvas-4");

    console.log(s1);

    // d3.json("../data/uk.json", function(error, uk){
    //     if(error) return console.error(error);

    //     console.log("Hello");

    //     s1.append('path')
    //       .datum(topojson.feature(uk, uk.objects.subunits))
    //       .attr('d', d3.geo.path().projection(d3.geo.mercator()));
    // })
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
