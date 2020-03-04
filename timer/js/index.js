/**
 * Filename: index.js
 * Author: Glenn Abastillas
 * Created: March 4 2020
 * Description: Methods to create, move, and remove circles from the canvas.
 */


$(document).ready(function(){
	// Variable Declarations
	const svg = d3.select("svg");
	const creation_delay = $("input[name='creation-delay']");
	const movement_delay = $("input[name='movement-delay']");
	const reset = $("button[id='reset']");
	const canvas_width = $("svg").width();
	const canvas_height = $("svg").height();

	var n_circles;

	console.log(random_between(5, 10));
	populate_circles();

	// Action Procedures

	// Update Labels when Range is Changed
	movement_delay.change(update_movement_delay_label);
	creation_delay.change(update_creation_delay_label);
	reset.click(reset_ranges);

	// Class Definitions

	// Function Definitions

	/**
	 * Draw circles onto the canvas
	 * @params {integer} min - minimum number of circles to draw
	 * @params {integer} max - maximum number of circles to draw
	 */
	function populate_circles(min=50, max=100){
		let circle_i = Math.ceil(max - min);
		let circles = [], current, cx, cy, r;

		n_circles = random_between(min, max);

		while (circle_i < n_circles){
			cx = random_between(1, canvas_width);
			cy = random_between(1, canvas_height);
			r = random_between(5, 15);

			current = {"cx" : cx , "cy" : cy , "r" : r, "idx" : circle_i};
			circles.push(current);
			circle_i++;
		}

		svg.selectAll("circle")
		   .data(circles)
		   .enter()
		   .append("circle")
		   .attr("id", function(d, i){return `circle_${d.idx}`})
		   .attr("cx", function(d, i){return d.cx})
		   .attr("cy", function(d, i){return d.cy})
		   .transition()
		   .duration(movement_delay.attr("value"))
		   .attr("r", function(d, i){return d.r})
		   .attr("fill", "black")
		   .attr("stroke", "#dfefff");
	}

	function update_circles(){
		let slope = canvas_height / canvas_width;

		svg.selectAll("circle")
		   .transition()
		   .duration(movement_delay.attr("value"))
		   .attr("cy", function(d, i){return d.idx * i * slope})
	}

	function remove_circles(){
		svg.selectAll("circles").remove();
	}

	/**
	 * Return a random integer between two numbers
	 * @param {integer} min - lower boundary
	 * @param {integer} max - upper boundary
	 *
	 */
	function random_between(min, max){
		let random = Math.random();
		let range = max - min;
		return Math.ceil(min + random * range);
	}

	/**
	 * Reset the slider ranges to 2.5.
	 */
	function reset_ranges(){
		creation_delay.attr("value", "2.5");
		movement_delay.attr("value", "2.5");
		// remove_circles();
		update_circles();
		// populate_circles();
	}

	/**
	 * Update the label for th creation delay range control
	 * @param {event} event - Parameter passed by event listener
	 */
	function update_creation_delay_label(event){
		let label = $("label[for='creation-delay']");
		var base = "Creation Delay";
		label.text(`${base} at ${this.value / 1000} s`);
		update_circles();
	}

	/**
	 * Update the label for th movement delay range control
	 * @param {event} event - Parameter passed by event listener
	 */
	function update_movement_delay_label(event){
		let label = $("label[for='movement-delay']");
		var base = "Movement Delay";
		label.text(`${base} at ${this.value / 1000} s`);
	}
});