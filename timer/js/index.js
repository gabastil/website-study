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


	// Action Procedures

	// Update Labels when Range is Changed
	movement_delay.change(update_movement_delay_label);
	creation_delay.change(update_creation_delay_label);

	// Class Definitions

	// Function Definitions

	function update_creation_delay_label(event){
		let label = $("label[for='creation-delay']");
		var base = "Creation Delay";
		label.text(`${base} at ${this.value / 1000} s`);
	}

	function update_movement_delay_label(event){
		let label = $("label[for='movement-delay']");
		var base = "Movement Delay";
		label.text(`${base} at ${this.value / 1000} s`);
	}
});