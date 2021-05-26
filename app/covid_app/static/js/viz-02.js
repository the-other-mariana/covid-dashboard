console.log(data)

var margin = {left:100, right: 100, top: 100, bottom: 100};
var width = 600;
var height = 400;
var factor = 0.5;

var t1 = d3.transition().duration(1000);
var t2 = d3.transition().duration(1000);

var g = d3.select("#chart-area")
	.append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var x = d3.scaleLinear()
	.range([0, width]);

var y = d3.scaleLinear()
	.range([height, 0]);

var area = d3.scaleLinear()
	.domain([2000, 1400000000])
	.range([25*Math.PI, 1500*Math.PI]);

var color = d3.scaleOrdinal()
	.range(d3.schemePastel1);

var bottomAxis = d3.axisBottom(x).tickFormat(d3.format(",d"));

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
    .style("font", "18px century")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(0, -70)")
    .text("Time");

var legendArea = g.append("text")
	.attr("class", "x axis-label")
	.attr("x", width/2)
	.attr("y", 0)
	.style("font", "24px century")
	.attr("text-anchor", "middle")
	.attr("fill", "black")

var k = 0;
var dates;
var dates1;

function viz(){
    data.forEach((d)=>{
        var date = new Date(d.fecha_ingreso);
        d.fecha_ingreso = date.toLocaleDateString("en-US");
		d.count = +d.count;
	});
	console.log(data);

	dates1 = data.map((d) => { return d.fecha_ingreso; });
	dates_set = new Set(dates1);
	dates = Array.from(dates_set)
	console.log(dates.length)
	x.domain([0, dates.length]);
	bottomAxis.ticks(dates.length);


	maxCount = d3.max(data, (d) => { return d.count; });
	y.domain([0, maxCount]);

	var pat = data.map((d) => { return d.tipo_paciente;});
	console.log(pat)
	var patients = new Set(pat);
	patients_array = Array.from(patients)

	color.domain(patients_array);
	patients_array.forEach((p, i) => {
		var pRow = legend.append("g")
			.attr("transform", "translate(" + (-width + margin.left) + ", " + (i * 20 - height + margin.top) + ")");

		pRow.append("rect")
			.attr("width", 10)
			.attr("height", 10)
			.attr("fill", color(p))
			.attr("stroke", "black");

		pRow.append("text")
			.attr("x", -20)
			.attr("y", 10)
			.attr("text-anchor", "end")
			.style("font", "16px century")
			.text(p[0].toUpperCase() + p.slice(1).toLowerCase());
		 });

	xAxisGroup.call(bottomAxis)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .style("font", "18px century")
    .attr("text-anchor", "middle");

	yAxisGroup.call(yAxisCall)
	.selectAll("text")
	.style("font", "18px century");

    /*
    d3.interval( ( ) => {
        update(data, k, dates1, dates);
        k += 1;
    }, 1000);*/
}

function update(data, k, dates1, dates){
    var idx = $("#date-slider").slider("value");
    legendArea.text("Day: " + dates[k % dates.length]);

    xAxisGroup.call(bottomAxis)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .style("font", "18px century")
    .attr("text-anchor", "middle");

    yAxisGroup.call(yAxisCall);

    var circles1 = g.selectAll(".circle1").data([data[(k * 2) % dates1.length]], (d) => { return d; });

    circles1.exit()
	    .transition(t1)
	    .attr("class", "circle1")
		.attr("fill", (d) => {
			return color(d.tipo_paciente);
		})
		.attr("cx", (d) => {
			var idx = dates.findIndex(date => date === d.fecha_ingreso);
			return x(idx + 1);
		})
		.attr("cy", (d) => {
			return y(d.count);
		})
		.attr("r", (d)=>{
			return d.count * factor;
		})
		.remove();

	circles1.transition(t1)
	    .attr("class", "circle1")
		.attr("fill", (d) => {
			return color(d.tipo_paciente);
		})
		.attr("cx", (d) => {
			var idx = dates.findIndex(date => date === d.fecha_ingreso);
			return x(idx + 1);
		})
		.attr("cy", (d) => {
			return y(d.count);
		})
		.attr("r", (d)=>{
			return d.count * factor;
		})

	circles1.enter()
	.append("circle")
	    .attr("class", "circle1")
		.attr("fill", (d) => {
			return color(d.tipo_paciente)
		})
		.attr("cx", (d) => {
		    var idx = dates.findIndex(date => date === d.fecha_ingreso);
			return x(idx + 1);
		})
		.attr("cy", (d) => {
			return y(d.count);
		})
		.attr("r", (d)=>{
			return d.count * factor;
		})
		.merge(circles1)
		.transition(t1)
		    .attr("class", "circle1")
			.attr("cx", (d) => {
				var idx = dates.findIndex(date => date === d.fecha_ingreso);
			    return x(idx + 1);
			})
			.attr("cy", (d) => {
				return y(d.count);
			})
			.attr("r", (d)=>{
				return d.count * factor;
			});

	var circles2 = g.selectAll(".circle2").data([data[(k * 2 + 1) % dates1.length]], (d) => { return d; });

    circles2.exit()
	    .transition(t2)
	    .attr("class", "circle2")
		.attr("fill", (d) => {
			return color(d.tipo_paciente);
		})
		.attr("cx", (d) => {
			var idx = dates.findIndex(date => date === d.fecha_ingreso);
			return x(idx + 1);
		})
		.attr("cy", (d) => {
			return y(d.count);
		})
		.attr("r", (d)=>{
			return d.count * factor;
		})
		.remove();

	circles2.transition(t2)
	    .attr("class", "circle2")
		.attr("fill", (d) => {
			return color(d.tipo_paciente);
		})
		.attr("cx", (d) => {
			var idx = dates.findIndex(date => date === d.fecha_ingreso);
			return x(idx + 1);
		})
		.attr("cy", (d) => {
			return y(d.count);
		})
		.attr("r", (d)=>{
			return d.count * factor;
		})

	circles2.enter()
	.append("circle")
	    .attr("class", "circle2")
		.attr("fill", (d) => {
			return color(d.tipo_paciente)
		})
		.attr("cx", (d) => {
		    var idx = dates.findIndex(date => date === d.fecha_ingreso);
			return x(idx + 1);
		})
		.attr("cy", (d) => {
			return y(d.count);
		})
		.attr("r", (d)=>{
			return d.count * factor;
		})
		.merge(circles2)
		.transition(t2)
		    .attr("class", "circle2")
			.attr("cx", (d) => {
				var idx = dates.findIndex(date => date === d.fecha_ingreso);
			    return x(idx + 1);
			})
			.attr("cy", (d) => {
				return y(d.count);
			})
			.attr("r", (d)=>{
				return d.count * factor;
			});
	$("#date-slider").slider("value", +(k % dates.length));
}

function step(){

	update(data, k, dates1, dates);
	console.log("Event Handlers Update...");
	k += 1;

}

$("#play-button").on("click", ( ) => {
	var button = $("#play-button");
	if (button.text() == "Play"){
		console.log("Play case");
		button.text("Pause");
		button.attr("class", "btn btn-danger");
		interval = setInterval(step, 1000);
	} else if (button.text() == "Pause"){
		console.log("Pause case");
		button.text("Play");
		button.attr("class", "btn btn-info");
		clearInterval(interval);
	}

});


$("#date-slider").slider({
	max: 6,
	min: 0,
	step: 1,
	slide:(event, ui) => {
		k = ui.value;
		console.log("UI: " + k);
		update(data, k, dates1, dates );
		k += 1;
	}
});

viz();