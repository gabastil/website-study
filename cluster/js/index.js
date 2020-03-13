/**
 * Filename: index.js
 * Author: Glenn Abastillas
 * Date: February 18, 2020
 *
 * Functions to draw and create clusters for the cluster study.s
 */

$(document).ready(function(){
    const svg = d3.select("svg");
    const g = svg.append("g").attr("id", "group");
    const data = Circles.data(5);

    Circles.draw(g, data);
    console.log(Sets.attrs(data, 'y'));
    // Circles.sort_data(data);
    // data[0] = data[4];
    Sets.quicksort(data, 0, data.length - 1, 'y');
    console.log(Sets.attrs(data, 'y'));

    // - - - - - -- - - - - -- - - - - -- - - - - -
    //
    // - - - - - -- - - - - -- - - - - -- - - - - -

})

class Circles {

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
    static data(n = 20){
        let x = Random.between(0, $(window).width(), n);
        let y = Random.between(0, $(window).height(), n);
        let radii = Random.between(1, 25, n);

        let index = 0, data = [], circle;

        while (index < n){
            circle = { x : x[index],
                       y : y[index],
                       r : radii[index],
                       id : n - index};
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
                console.log(array);
                this.swap(array, left, right);
                left++;
                right--;
            }
            // console.log(`In partition, pass is`); // ${array}`);
            console.log(array);
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

    memo = {};

    /**
     * Add a key and value pair into an object.
     * @param {object} object - object to add key and value to
     * @param {string, object, int} key - key for object
     * @param {string, object, int} value - value to assign to key
     */
    static add_value(object, key, value){
        object[key] = value;
    }

    /**
     * Delete a key and value pair into an object.
     * @param {object} object - object to delete a key and value from
     * @param {string, object, int} key - key to delete
     */
    static delete_key(object, key){
        delete object[key];
    }

    /**
     * Detect whether or not a key exists in an object
     * @param {string, object, int} key - key to search for
     * @param {object} object - object to check presence of key in
     */
    static has_key(key, object){
        if (object != undefined){
            return object.hasOwnProperty(key);
        } else {
            return this.memo.hasOwnProperty(key);
        }
    }

    /**
     * Detect a collision between two objects. A collision is defined as the
     * overlap between two objects' areas.
     * @param {object} a - First object to detect collision against b
     * @param {object} b - Second object to detect collision against a
     * @returns {bool} True if objects collide, False otherwise.
     */
    static has_collision(a, b){
        if (this.has_key(a) && this.has_key(b, this.memo[a])){
            return this.memo[a][b];
        } else {
            // Implement detection here
        }
    }

    /**
     * Detect a collision between two objects. A collision is defined as the
     * overlap between two objects' areas.
     * @param {array [object]} set - array of objects to detect collision
     */
    static get_collisions(set){
        let collisions = [], i;
        for (i in set.slice(0, set.length - 1)){
            collisions.push(this.has_collision(set[i], set[i+1]));
        }
        return collisions;
    }
}