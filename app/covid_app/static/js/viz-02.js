console.log(data)

var margin = {left:100, right: 10, top: 10, bottom: 100};
var width = 600;
var height = 400;

var t = d3.transition().duration(1000);

var g = d3.select("#chart-area")
	.append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var x = d3.scaleLog()
	.range([0, width])
	.base(10);

var y = d3.scaleLinear()
	.range([height, 0]);

var area = d3.scaleLinear()
	.domain([2000, 1400000000])
	.range([25*Math.PI, 1500*Math.PI]);

var color = d3.scaleOrdinal()
	.range(d3.schemePastel1);

var bottomAxis = d3.axisBottom(x)
	.tickValues([1, 2, 3, 4, 5, 6 ,7])

var yAxisCall = d3.axisLeft(y);

var xAxisGroup = g.append("g")
    .attr("class", "bottom axis")
    .attr("transform", "translate(0, " + height + ")");

var yAxisGroup = g.append("g")
    .attr("class", "y axis");

var legend = g.append("g")
 	.attr("transform", "translate(" + (width - 10) + "," + (height - 170) + ")");

var yLabel = g.append("text")
	.attr("class", "y axis-label")
	.attr("x", - (height / 2))
	.attr("y", -60)
    .style("font", "18px century")
	.attr("text-anchor", "middle")
	.attr("transform", "rotate(-90)")
	.text("Rise in Covid-19 Cases");

var xLabel = g.append("text")
    .attr("class", "x axis-label")
    .attr("x", (width / 2))
    .attr("y", height + 140)
    .attr("font-size", "30px")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(0, -70)")
    .text("Time");

var legendArea = g.append("text")
	.attr("class", "x axis-label")
	.attr("x", width - 50)
	.attr("y", height - 20)
	.attr("font-size", "50px")
	.attr("text-anchor", "middle")
	.attr("fill", "gray")

function viz(){
    data.forEach((d)=>{
        var date = new Date(d.fecha_ingreso);
        d.fecha_ingreso = date.toLocaleDateString("en-US");
		d.count = +d.count;
	});
	console.log(data);
}
viz();