console.log(data_men)
console.log(data_women)

var margin = {top: 50, right: 10, bottom: 100, left:100};
var width = 600;
var height = 400;

var svg = d3.select("#chart-area")
	.append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var data = data_men

var x = d3.scaleBand()
            .range([0, width])
            .paddingInner(0.2)
            .paddingOuter(0.3);

var y = d3.scaleLinear()
        .range([0, height]);

var color = d3.scaleOrdinal()
        .range(d3.schemeSet2);

var xAxisGroup = g.append("g")
    .attr("class", "bottom axis")
    .attr("transform", "translate(0, " + height + ")")

var yAxisGroup = g.append("g")
    .attr("class", "y axis")

var yLabel = g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .style("font", "18px century")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue (dlls.)");

var tab;
var maxCount;
var flag = true;
var t = d3.transition().duration(750);

function update(data){
    data = flag ? data_women : data_men;

    tab = data.map((d) => { return d.tabaquismo; });
    maxCount = d3.max(data, (d) => { return d.count; });

    x.domain(tab)
    y.domain([maxCount, 0])
    color.domain(tab)

    var bottomAxis = d3.axisBottom(x);
    xAxisGroup.transition(t).call(bottomAxis)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("filled", "black")
        .attr("text-anchor", "middle")

    var yAxisCall = d3.axisLeft(y)
        .ticks(10)
	    .tickFormat((d) => { return d; });

	yAxisGroup.transition(t).call(yAxisCall);

	// x axis label
    g.append("text")
    .attr("class", "x axis-label")
    .attr("x", (width / 2))
    .attr("y", height + 140)
    .style("font", "18px century")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(0, -70)")
    .text("Does the person smoke?");

    var label = flag ? "Women" : "Men";
    yLabel.text(label)

    var rects = g.selectAll("rect").data(data, (d) => { return d.tabaquismo; });
    rects.exit().transition(t)
		.attr("y", y(0))
		.attr("height", 0).remove();

    rects.transition(t)
        .attr("x", (d) => { return x(d.tabaquismo); })
	    .attr("y", (d) => { return y(d.count); })
	    .attr("width", x.bandwidth)
	    .attr("height",(d) => { return height - y(d.count)});

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
            return color(d.tabaquismo);
        })
        .merge(rects)
        .transition(t)
                .attr("x", (d) => { return x(d.tabaquismo) })
                .attr("width", x.bandwidth)
                .attr("y", (d) => { return y(d.count); })
                .attr("height", (d) => { return height - y(d.count); })
                .attr("fill", (d) => {
                    return color(d.tabaquismo);
                });
}

function viz(){
    data.forEach((d)=>{
        d.revenue = parseInt(d.count);
    });
    d3.interval( ( ) => {
		update(data);
        console.log("Updating...");
        flag = !flag;
	}, 1000);
    update(data);
}

viz();

