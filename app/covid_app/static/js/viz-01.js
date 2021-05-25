console.log(data_men)
console.log(data_women)

var margin = {top: 50, right: 10, bottom: 100, left:100};
var width = 800;
var height = 600;

var svg = d3.select("#chart-area")
	.append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

data = data_men

data.forEach((d)=>{
    d.revenue = parseInt(d.count);
});

var tab = data.map((d) => { return d.tabaquismo; });

var x = d3.scaleBand()
        .domain(tab)
        .range([0, width])
        .paddingInner(0.2)
        .paddingOuter(0.3);

var maxCount = d3.max(data, (d) => { return d.count; });

var y = d3.scaleLinear()
        .domain([maxCount, 0])
        .range([0, height]);

var rects = g.selectAll("rect").data(data);
rects.enter()
    .append("rect")
    .attr("x", (d) => {
        return x(d.tabaquismo);
    })
    .attr("y", (d) => {
        return y(d.count);
    })
    .attr("height", (d) => {
        return height - y(d.count);
    })
    .attr("width", x.bandwidth())
    .attr("fill", (d) => {
        return "blue";
    });

// bottom axis ticks
var bottomAxis = d3.axisBottom(x);
    g.append("g")
    .attr("class", "bottom axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(bottomAxis)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("filled", "black")
    .attr("text-anchor", "middle")

// left y axis
var yAxisCall = d3.axisLeft(y)
    .ticks(10)
    .tickFormat((d) => { return d; });

g.append("g")
    .call(yAxisCall);

// x axis label
g.append("text")
.attr("class", "x axis-label")
.attr("x", (width / 2))
.attr("y", height + 140)
.attr("font-size", "30px")
.attr("text-anchor", "middle")
.attr("transform", "translate(0, -70)")
.text("Does the person smoke?");

// y axis label
g.append("text")
.attr("class", "y axis-label")
.attr("x", - (height / 2))
.attr("y", -60)
.attr("font-size", "30px")
.attr("text-anchor", "middle")
.attr("transform", "rotate(-90)")
.text("Number of People");
