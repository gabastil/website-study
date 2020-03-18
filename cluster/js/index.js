/**
 * Filename: index.js
 * Author: Glenn Abastillas
 * Date: February 18, 2020
 *
 * Functions to draw and create clusters for the cluster study.
 *
 * Classes
 * -------
 *      Shape : Parent class of all shapes with general attributes and methods
 *      Circles : Define and create individual circles and arrays of circles
 *      Random : Generate random integers and arrays of random integers
 *      Sets : Functions to manipulate sets like sorting.
 *      Collisions : Functions to detect collisions between shapes
 *
 */

$(document).ready(function(){
    const svg = d3.select("svg");
    const g = svg.append("g").attr("id", "group");
    // const data = Circles.data(20, r=[25,50]);
    const data = [new Circle(500, 500, 20, 1),
                  new Circle(505, 535, 30, 2),
                  new Circle(250, 100, 10, 3),
                  new Circle(255, 105, 15, 4),
                  new Circle(333, 235, 24, 5),
                  new Circle(335, 242, 24, 6),
                  new Circle(345, 241, 24, 7),
                  new Circle(336, 249, 24, 8),
                  new Circle(510, 591, 13, 9),
                  new Circle(500, 595, 13, 10),
                  new Circle(345, 241, 24, 11),
                  new Circle(501, 600, 24, 12),
                  ];

    Circles.draw(g, data);
    console.log(data[0].overlaps(data[1]));

    Sets.quicksort(data, 0, data.length - 1, 'y');

    svg.append("path").attr("stroke", "red").attr('stroke-width', '2px').attr("d", "M500,500 L512.2,585.9");
    svg.append("path").attr("stroke", "blue").attr('stroke-width', '2px').attr("d", "M501,501 L508.07,549.5");

    $("button").on("click", push_apart);

    function push_apart(e){
        let collisions = Collisions.get_collisions(data);
        let collisions_exist = 0;
        // let collisions_exist = collisions.length > 0;
        // let completed_ids = [];
        let new_xy, old_xy;
        console.log(collisions.length);

        // let xy = collisions[0][0].push(collisions[0][1]);

        // svg.select(`circle[id='${collisions[0][0].id}']`)
        //    .transition()
        //    .duration(250)
        //    .attr("cx", xy[0])
        //    .attr("cy", xy[1]);


        // return;

        while (collisions_exist < 10){
            for (circle of collisions){
                old_xy = [circle[1].x, circle[1].y];
                new_xy = circle[0].push(circle[1]);

                // console.log(completed_ids.indexOf(circle[0].id));
                // console.log(completed_ids);

                // if(completed_ids.indexOf(circle[0].id) > -1){
                    // continue;
                // }

                if (new_xy != undefined){
                    // console.log(circle[1]);
                    console.log(old_xy);
                    console.log(new_xy);
                    // circle[1].x = new_xy[0];
                    // circle[1].y = new_xy[1];
                    // console.log(new_xy);
                    // console.log(circle[1]);
                    svg.select(`circle[id='${circle[0].id}']`)
                       .transition()
                       .duration(250)
                       .attr("cx", new_xy[0])
                       .attr("cy", new_xy[1]);

                    // completed_ids.push(circle[1].id);
                    // completed_ids.push(circle[0].id);
                    // completed_ids.push(circle[1]);
                }
            }

        // console.log(memo);
            // console.log(Collisions.get_collisions(data, memo).length);
            // collisions_exist = Collisions.get_collisions(data).length > 0;
            collisions_exist++;
        }
    }

    // setInterval(function(){
    //     let circle = $("circle[id='c1']");
    //     let current = {"x" : circle.attr("cx"),
    //                    "y" : circle.attr("cy")};
    //     circle.attr("cx", parseFloat(current.x) + 5);
    //     circle.attr("cy", parseFloat(current.y) + 5);

    //     let out_of_bounds_left = $(window).position().left > circle.attr("cx");
    //     let out_of_bounds_right = $(window).position().right < circle.attr("cx");
    //     let out_of_bounds_top = $(window).position().top;
    //     let out_of_bounds_bottom = $(window).position().bottom;

    //     let out_of_bounds = out_of_bounds_left && out_of_bounds_right && out_of_bounds_top && out_of_bounds_bottom;

    //     if (out_of_bounds){
    //         clearInterval(this);

    //     }
    // }, 1000);

    // setInterval(function(){console.log("Test")}, 1000);
    // console.log(Collisions.has_subkey(test, 'b'));
    // console.log(Collisions.get_collisions(data, memo));
    // console.log(memo);

    // console.log(`${c.x} and ${c.y} and ${c.r} and ${c.h}.`)
    // console.log(data[0].x > 0 && (data[0].h > 0 || data[0].r > 0));
    // console.log(data[0].x);
    // console.log(data[0].overlaps(data[1]));
    // console.log(2**3);

    // - - - - - -- - - - - -- - - - - -- - - - - -
    //
    // - - - - - -- - - - - -- - - - - -- - - - - -

});

class Shape {
    /**
     * Generic constructor for the Shape object.
     * @param {Object} obj - Object with shape information
     *      - Generic shape properties are:
     *              x, y, w, h, r
     *
     * @constructor
     */
    constructor(obj){
        this.x = parseFloat(obj.x); // Shape x coordinate
        this.y = parseFloat(obj.y); // Shape y coordinate
        this.w = parseFloat(obj.w); // Shape width
        this.h = parseFloat(obj.h); // Shape height
        this.r = parseFloat(obj.r); // Shape radius
        this.id = obj.id; // Shape id
    }

    get top(){
        if (this.r != undefined){
            return this.y - this.r;
        } else {
            return this.y;
        }
    }

    get right(){
        if (this.r != undefined){
            return this.x + this.r;
        } else {
            return this.x + this.w;
        }
    }

    get bottom(){
        if (this.r != undefined){
            return this.y + this.r;
        } else {
            return this.y + this.h;
        }
    }

    get left(){
        if (this.r != undefined){
            return this.x - this.r;
        } else {
            return this.x;
        }
    }

    get center(){
        if (this.r != undefined){
            return {'x' : this.x, 'y' : this.y};
        } else {
            return {'x' : this.x + this.w / 2, 'y' : this.y + this.h / 2};
        }
    }

    get area(){
        if (this.r != undefined){
            return 2 * Math.PI * this.r;
        }
        return this.w * this.h;
    }

    /**
     * Check if this shape contains the specified shape's top border
     * @param {Shape, object} shape - object to check for overlap
     */
    contains_top(shape){
        return (this.top < shape.top) && (shape.top <= this.bottom);
    }

    /**
     * Check if this shape contains the specified shape's right border
     * @param {Shape, object} shape - object to check for overlap
     */
    contains_right(shape){
        return (this.left < shape.right) && (shape.right <= this.right);
    }

    /**
     * Check if this shape contains the specified shape's bottom border
     * @param {Shape, object} shape - object to check for overlap
     */
    contains_bottom(shape){
        return (this.top < shape.bottom) && (shape.bottom < this.bottom);
    }

    /**
     * Check if this shape contains the specified shape's left border
     * @param {Shape, object} shape - object to check for overlap
     */
    contains_left(shape){
        return (this.left < shape.left) && (shape.left <= this.right);
    }

    /**
     * Detect whether or not this shape horizontally overlaps another shape
     * @param {Shape, object} shape - another shape with dimension properties
     * @returns boolean - true if there is overlap, false if there is no overlap
     */
    horizontal_overlap(shape){
        if (this.w != undefined){
            return this.contains_left(shape) || this.contains_right(shape);
        } else {
            return shape.x == this.x;;
        }
    }

    /**
     * Detect whether or not this shape vertically overlaps another shape
     * @param {Shape, object} shape - another shape with dimension properties
     * @returns boolean - true if there is overlap, false if there is no overlap
     */
    vertical_overlap(shape){
        if (this.h != undefined){
            return this.contains_top(shape) || this.contains_bottom(shape);
        } else {
            return shape.y == this.y;;
        }
    }

    /**
     * Detect whether or not this shape overlaps another shape
     * @param {Shape, object} shape - another shape with dimension properties
     * @param {integer} buffer - Amount of pixels to have in between shapes.
     * @returns boolean - true if there is overlap, false if there is no overlap
     */
    overlaps(shape, buffer = 0){
        if (this.r != undefined){
            let hypotenuse = this.hypotenuse(shape),
                radius_and_buffer = shape.r + this.r + buffer;
            return radius_and_buffer > hypotenuse;
        } else if (this.w != undefined && this.h != undefined){
            let horizontal_overlap = this.horizontal_overlap(shape);
            let vertical_overlap = this.vertical_overlap(shape);
            return horizontal_overlap && vertical_overlap;
        }
        return false;
    }

    /**
     * Return true of the this shape is top to the specified shape
     * @param {Shape, object} shape - Shape object with x,y,r,w,h dimensions
     *
     */
    is_top_to(shape){
        if (shape.center.y > this.center.y){
            return true;
        }
        return false;
    }

    /**
     * Return true of the this shape is right to the specified shape
     * @param {Shape, object} shape - Shape object with x,y,r,w,h dimensions
     *
     */
    is_right_to(shape){
        if (shape.center.x < this.center.x){
            return true;
        }
        return false;
    }

    /**
     * Return true of the this shape is bottom to the specified shape
     * @param {Shape, object} shape - Shape object with x,y,r,w,h dimensions
     *
     */
    is_bottom_to(shape){
        if (shape.center.y < this.center.y){
            return true;
        }
        return false;
    }

    /**
     * Return true of the this shape is left to the specified shape
     * @param {Shape, object} shape - Shape object with x,y,r,w,h dimensions
     *
     */
    is_left_to(shape){
        if (shape.center.x > this.center.x){
            return true;
        }
        return false;
    }

    /**
     * Return which side a specified shape is oriented w.r.t. this shape
     * @param {Shape, object} shape - Shape object with x,y,r,w,h dimensions
     */
    detect_side(shape){
        let top = this.is_top_to(shape),
            right = this.is_right_to(shape),
            bottom = this.is_bottom_to(shape),
            left = this.is_left_to(shape);

        return {top : top, right : right, bottom : bottom, left : left};
    }

    /**
     * Calculate the hypotenuse from the center of this Circle to another
     * @param {Shape, object} shape - Shape object with x,y,r,w,h dimensions
     * @returns {integer} hypotenuse
     */
    hypotenuse(shape){
        let x_squared = (shape.x - this.x)**2,
            y_squared = (shape.y - this.y)**2;
        return Math.sqrt(x_squared + y_squared);
    }

    /**
     * If the specified shape overlaps this shape, move it so there is no over-
     * lap.
     *
     * @since 2020-03-17 Changed to assume circular shape
     *
     * @param {Shape, object} shape - Shape object with x,y,r,w,h dimensions.
     * @param {integer} buffer - Amount of pixels to have in between shapes.
     */
    push(shape, buffer=0){
        let svg = $("svg");
        let side = this.detect_side(shape);

        let shape_type = (this.r === undefined) ? 'r' : 'c';
        let shape_ = d3.select(`${shape_type}${shape.id}`)
                       .transition()
                       .duration(500);


        let hypotenuse = this.hypotenuse(shape),
            sin = Math.abs(shape.y - this.y) / hypotenuse,
            cos = Math.abs(shape.x - this.x) / hypotenuse,
            radii = shape.r + this.r + buffer;

        console.log(`Hypotenuse ${hypotenuse} from shape.x ${shape.x} and shape.y ${shape.y}, and this.x ${this.x} and this.y ${this.y};\n` +
                    `radii ${radii}; cos ${cos}; sin ${sin}\n` +
                    `cos * radii ${cos * radii}; sin * radii ${sin * radii}` +
                    `cos * radii + this.x ${cos*radii+this.x}; sin * radii + this.y ${parseFloat(sin*radii+this.y)}`);
        console.log(`R+R ${shape.r + this.r} with a buffer of ${buffer}`);

        console.log(`overlaps: ${this.overlaps(shape)}`);

        if (this.overlaps(shape)) {
            let adjust_x = cos * radii,
                adjust_y = sin * radii,
                move_cx = shape.x,
                move_cy = shape.y;

            if (side.right) {
                move_cx += adjust_x;
            } else if (side.left) {
                move_cx -= adjust_x;
            }

            if (side.bottom) {
                move_cy += adjust_y;
            } else if (side.top) {
                move_cy -= adjust_y;
            }

            if (move_cx > svg.width()) {
                move_cx = svg.width();
            } else if (move_cx < svg.position().left) {
                move_cx = svg.position().left;
            }

            if (move_cy > svg.height()) {
                move_cy = svg.height();
            } else if (move_cy < svg.position().top) {
                move_cy = svg.position().top;
            }

            this.x = move_cx;
            this.y = move_cy;

            return [move_cx, move_cy];
        }
    }
}

class Circle extends Shape{
    constructor(x, y, r, id){
        super({'x' : x, 'y' : y, 'r' : r, 'id' : `c${id}`});
    }
}
class Rectangle extends Shape{
    constructor(x, y, w, h, id){
        super({'x' : x, 'y' : y, 'w' : w, 'h' : h, 'id' : `r${id}`});
    }
}

class Circles{

    /**
     * Generate geometry for n Circles
     * @param {integer} n - Number of circles to generate geometry for
     * @returns {array} List of geometry (x, y, r) for n circles
     */
    static geometry(n = 20){}

    /**
     * Generate styles for n Circles
     * @param {integer} n - Number of circles to generate styles for
     * @returns {array} List of styles (x, y, r) for n circles
     */
    static style(n = 20){}

    /**
     * Generate data for n Circles
     * @param {integer} n - Number of circles to generate data for
     * @returns {array} List of objects with data for circles
     */
    static data(n = 20, r=[5,25]){
        let x = Random.between(0, $(window).width(), n);
        let y = Random.between(0, $(window).height(), n);
        let radii = Random.between(...r, n);

        let index = 0, data = [], circle, cx, cy, cr;

        while (index < n){
            [cx, cy, cr] = [x[index], y[index], radii[index]];
            circle = new Circle(cx, cy, cr, n - index);
            data.push(circle);
            index++;
        }

        return data;
    }


    /**
     * Generate data for n Circles
     * @param {selection} selection - SVG element to draw in
     * @param {array [object]} data - objects with circle data
     * @returns {array} List of objects with data for circles
     */
     static draw(selection, data){
        selection.selectAll("circle")
                 .data(data)
                 .enter()
                 .append("circle")
                 .attr("id", function(d, i){return d.id})
                 .attr("cx", function(d, i){return d.x})
                 .attr("cy", function(d, i){return d.y})
                 .attr("r", function(d, i){return d.r})
                 .attr("fill", "black")
                 .attr("stroke", "cornflowerblue");
     }

     static cluster(){}

    /**
     * Sort all circles by size
     * @param {selection} selection - SVG element with shapes to select
     * @returns {array} List of objects with data for circles
     */
     static order(selection){
        let circles = selection.selectAll("circles");

        console.log(circles.data());
     }

     static sort_data(data){
        let sorted = [], datum;

        for (datum of data){
            if (!sorted.length){
                sorted.push(datum);
            } else if (datum.r <= sorted[0].r) {
                sorted.unshift(datum);
            } else {
                sorted.push(datum);
            }
        }

        // console.log(sorted);
     }
}

class Random {
    /**
     * @returns {array} Numbers in sequence from a minimum to a maximum
     * @param {integer} min - Lowerbound for range
     * @param {integer} max - Upperbound for range
     */
    static range(min=0, max=100){
        let i = 0;
        let output = [];
        while (i < max){
            output.push(min + i);
            i++;
        }
        return output;
    }

    /**
     * @returns {array} Random numbers between two bounds
     * @param {integer} min - Lowerbound for range
     * @param {integer} max - Upperbound for range
     * @param {integer} n - Number of integers to return
     * @param {integer} replace - Allow for duplicate numbers
     */
    static between(min=0, max=100, n=10, replace=true){

        if (max <= min){
            console.error("max is larger than min.");
            return;
        // } else if ((max - min) === n){
        //     return this.range(min, max);
        } else {
            let i = 0;
            let range = max - min;
            let output = [], current;

            while (i < n){
                current = Math.random() * range + min;
                current = Math.floor(current);

                if (replace){
                    output.push(current);
                    i++;
                } else if (output.indexOf(current) < 0){
                    output.push(current);
                    i++;
                }
            }
            return output;
        }
    }

    /**
     * @returns {array} Of a subset of size n of the original data array
     * @param {array} array - Items to subset
     * @param {integer, float} n - Number or percent of items to subset
     */
    static choice(array, n=0.5){
        if (n < 1){
            n = Math.floor(n * array.length);
        } else {
            n = Math.floor(n);
        }

        let random_numbers = this.between(0, n, n, false);
        let chosen = [], number;

        for (number of random_numbers){
            chosen.push(array.pop(number));
        }

        return chosen;
    }
}

class Sets {

    /**
     * Replace the positions of two numbers in place
     * @param {array} array - smaller array
     * @param {integer} ab - index of first number
     * @param {integer} ab - index of first number
     */
    static swap(array, a, b){
        let temp = array[a];
        array[a] = array[b];
        array[b] = temp;
    }

    /**
     * Implement partition function for quicksort algorithm
     * @param {array} array - array of items to sort
     * @param {integer} low - index of first element
     * @param {integer} high - index of last element
     * @param {string} attr - name of attribute to return
     */
    static partition(array, low, high, attr = null){
        let pivot = array[high],
            left_value,
            right_value;
        let left = low,
            right = high - 1;

        if (attr != null){
            pivot = array[high][attr];
        }

        // console.log(`In partition(): ${array}`);
        // console.log(array);

        while (left < right){
            left_value = array[left];
            right_value = array[right];

            if (attr != null){
                left_value = left_value[attr];
                right_value = right_value[attr];
            }

            while (left_value < pivot && left < right){
                left++;
            }
            while (right_value > pivot && left < right){
                right--;
            }

            if (left_value > right_value){
                this.swap(array, left, right);
                left++;
                right--;
            }
            // console.log(`In partition, pass is`); // ${array}`);
            // console.log(array);
        }
        this.swap(array, left, high);
        // console.log(`In partition(): ${this.attrs(array, attr)} with left as ${left} and right as ${right}`);
        // console.log(left);
        return left;
    }

    /**
     * Implement the quicksort algorithm
     * @param {array} array - array of items to sort
     * @param {integer} low - index of first element
     * @param {integer} high - index of last element
     * @param {string} attr - name of attribute to return
     */
    static quicksort(array, low, high, attr = null){
        if (low < high){
            let index = this.partition(array, low, high, attr);
            this.quicksort(array, low, index - 1, attr);
            this.quicksort(array, index + 1, high, attr);
        }
    }

    /**
     * Return an array of attribute values
     * @param {array [Object]} set - array of objects with attributes
     * @param {string} attribute - name of attribute to return
     */
     static attrs(set, attribute){
        let attributes = [], element;
        for (element of set){
            try {
                attributes.push(element[attribute]);
            } catch(err) {
                console.warn(`Could not find ${attribute} in ${element}.`);
            }
        }
        return attributes;
     }

    /**
     * Set an array of objects' attributes with values in an array
     * @param {array [Object]} set - array of objects with attributes
     * @param {array [int, string]} attributes - array of attributes
     * @param {string} attribute - name of attribute to assign
     */
     static set_attrs(set, attributes){
        if (set.length != attributes.length){
            let error = "Number of objects does not match number of attributes";
            console.error(error);
        }

        for (let i in attributes){
            set[i][attribute] = attributes[i];
        }
     }
}

class Collisions {
    /**
     * Collisions class contains methods to detect collisions and spread objects
     * apart so as to avoid collisions
     */


    /**
     * Convert an object into a string
     * @param {object} object - object to convert into a string
     */
    static str(object){
        if (object instanceof Object){
            return JSON.stringify(object);
        }
        return object;
    }

    /**
     * Add a key and value pair into an object. Convert the keys from JSON into
     * strings in the process of assigning a value to the input object.
     *
     * @param {object} object - object to add key and value to
     * @param {string, object, int} key1 - key for object
     * @param {string, object, int} key2 - key for object
     * @param {string, object, int} value - value to assign to key
     */
    static record_memo(object, key1, key2, value){
        key1 = key1.id;
        key2 = key2.id;

        let has_key1 = this.has_key(object, key1),
            has_key2 = this.has_key(object, key2),
            has_both_keys = has_key1 && has_key2;

        let current = {}, current_inverse = {};


        if (has_both_keys){
            current = object[key1];
            current_inverse = object[key2];
        } else if (has_key1){
            current = object[key1];
        } else if (has_key2){
            current = object[key2];
        }

        current[key2] = value;
        object[key1] = current;

        current_inverse[key1] = value;
        object[key2] = current_inverse;
    }

    /**
     * Delete a key and value pair into an object.
     * @param {object} object - object to delete a key and value from
     * @param {string, object, int} key - key to delete
     */
    static delete_key(object, key){
        delete object[this.str(key)];
    }

    /**
     * Detect whether or not a key exists in an object
     * @param {string, object, int} key - key to search for
     * @param {object} object - object to check presence of key in
     */
    static has_key(object, key){
        if (object === undefined || object[key] === undefined){
            return false;
        }
        return true;
    }

    /**
     * Detect whether or not a key exists in an object's values
     * @param {string, object, int} key - key to search for
     * @param {object} object - object to check presence of key in
     */
    static has_subkey(object, key){
        let value = false, item;

        for (item of object){
            if (key in object[item]){
                value = true;
                break;
            }
        }

        return [value, item];
    }

    /**
     * Detect a collision between two objects. A collision is defined as the
     * overlap between two objects' areas.
     * @param {object} a - First object to detect collision against b
     * @param {object} b - Second object to detect collision against a
     * @param {object} object - memo object with keys and values
     * @returns {bool} True if objects collide, False otherwise.
     */
    static has_collision(a, b, object){
        let checked_a = this.has_key(object, a),
            checked_b = this.has_key(object, b);

        if (checked_a){
            let checked_a_sub = this.has_key(object[a], b);
            if (checked_a_sub != undefined && checked_a_sub === true){
                return object[this.str(a)][this.str(b)];
            }
        } else if(checked_b) {
            let checked_b_sub = this.has_key(object[b], a);
            if (checked_b_sub != undefined && checked_b_sub === true){
                return object[this.str(b)][this.str(a)];
            }
        }

        let overlap = a.overlaps(b);
        this.record_memo(object, a, b, overlap);
        return overlap;
    }

    /**
     * Detect a collision between two objects. A collision is defined as the
     * overlap between two objects' areas.
     * @param {array [object]} set - array of objects to detect collision
     */
    static get_collisions(set){
        let memo = {};
        let collisions = [], max_size = set.length, i = 0, j = i;
        let first, second, overlaps;

        while (i < max_size) {
            first = set[i];

            while (j < max_size){
                if (i === j){
                } else {
                    second = set[j];
                    overlaps = this.has_collision(first, second, memo);

                    if (overlaps) {
                        collisions.push([first, second]);
                    }
                }

                j++;
            }
            j = 0;
            i++;
        }
        return collisions;
    }
}