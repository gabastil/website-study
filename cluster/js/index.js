/**
 * Filename: index.js
 * Author: Glenn Abastillas
 * Date: February 18, 2020
 *
 * Functions to draw and create clusters
 */

$(document).ready(function(){
    const svg = d3.select("svg");
    const g = svg.append("g").attr("id", "group");
    const data = Circles.data(73);

    Circles.draw(g, data);
    console.log(data);
    Circles.sort_data(data);

    let array = Random.between(5, 20, 5);
    console.log(`For array ${array}, partition is at ${Sets.partition(array, 0, 4)}`);
    console.log(`Partitioned array ${array}`);
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
        console.log(selection);
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

        console.log(sorted);
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
     *
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
     * @param {array} array -
     * @param {integer} low -
     * @param {integer} high -
     */
    static partition(array, low, high){
        let pivot = array[high];
        let left = low, right = high - 1;

        console.log(`In partition(): ${array}`);

        while (left < right){
            while (array[left] < pivot && left < right){
                left++;
            }
            while (array[right] > pivot && left < right){
                right--;
            }

            if (array[left] > array[right]){
                this.swap(array, left, right);
                left++;
                right--;
            }
            console.log(`In partition, pass is ${array}`);
        }
        // this.swap(array, left, high);
        console.log(`In partition(): ${array} with left as ${left} and right as ${right}`);
        return left;
    }

    /**
     * Implement the quicksort algorithm
     * @param {array} array -
     * @param {integer} low -
     * @param {integer} high -
     */
    static quicksort(array, low, high){
        if (low < high){
            index = self.partition(array, low, high);
            this.quicksort(array, low, index - 1);
            this.quicksort(array, index + 1, high);
        }
    }
}