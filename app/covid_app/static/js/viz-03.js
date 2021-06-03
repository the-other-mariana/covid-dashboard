var width = 700
    height = 700
    margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

console.log(data_D);
// set the color scale
var color = d3.scaleOrdinal()
  .domain(["men_infected","men_dead","women_infected","women_dead","all_infected","all_dead"])
  .range(d3.schemeDark2);


function viz(){
    d3.interval( ( ) => {
        update(data_D);
        //flag = !flag;
    }, 1000);
    update(data_D);
}

// A function that create / update the plot for a given variable:
function update(data) {
    var election = $('#sex-select  option:selected').val();

    if (election == 0){
        data = data_D[2];
    }else if (election == 1){
        data = data_D[0];
    }else if (election == 2){
        data = data_D[1];
    }

    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .value(function(d) {return d.value; })
        .sort(function(a, b) { console.log(a) ; return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart

    var data_ready = pie(d3.entries(data))

    // map to data
    var u = svg.selectAll("path")
        .data(data_ready)

    var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    u
    .enter()
    .append('path')
    .merge(u)
    .transition()
    .duration(1000)
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1)

    // remove the group that is not present anymore
    u
    .exit()
    .remove();

      // u
      //   .selectAll('path')
      //   .data(data_ready)
      //   .enter()
      //   .append('text')
      //   .text((d)=>{return d.data.key;})
      //   .attr("transform", (d)=>{return "translate("+arcGenerator.centroid(d)+")";})
      //   .style("text-anchor","middle")
      //   .style("font-size",17);
    svg
        .selectAll('text')
        .remove()

    svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('text')
        .text(function(d){ return d.data.key + " : "+d.data.value})
        .attr("transform", function(d) {return "translate(" + (arcGenerator.centroid(d)) + ")";  })
        .style("text-anchor", "middle")
        .style("font-size", 20)
        .style("font-weight",700)
        .style("fill","white")
        .style("font-family","Arial")
        .style("font-variant","small-caps")


}

// Initialize the plot with the first dataset
viz()