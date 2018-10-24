var margin = { left:100, right:10, top:10, bottom:150 };

var width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


  var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left 
            + ", " + margin.top + ")");  


//X Label
g.append("text")
	.attr("class", "x axis-label")
	.attr("x", width / 2)
	.attr("y", height + 40)
	.attr("font-size", "20px")
	.attr("text-anchor", "middle")
	.text("Tennis matches per surface (1986) ");


var clay = 0; //"Clay"
var grass = 0; // "Grass"
var carpet = 0; //"Carpet"
var hard = 0; //"Hard"
var none = 0;
var total = [ 
{
	"surface": "clay",
	"count": 0
},
{	
	"surface": "grass",
	"count": 0
},
{
	"surface": "hard",
	"count": 0
},
{	
	"surface": "carpet",
	"count": 0
}
]
// var surfaces = [clay, grass, hard, carpet];

// ladies in 1986
// d3.csv("wta_1986.csv", function(data){
// 	console.log(data);

d3.json("1985.json", function(data){

	console.log(data);
// players from that year
// winners winner_name then loser_name
const grouped = data.reduce((groups, cur) => {
	const key = cur.winner_rank;

	groups[key] = (groups[key] || 0) + 1;

	return groups;
}, {});

const result = Object.keys(grouped).map(key => ({name: key, count: grouped[key]}));

//result.sort(function(a, b) {return b - a});
	
console.log(result);

// function sortProperties(obj)
// {
//   // convert object into array
// 	var sortable=[];
// 	for(var key in obj)
// 		if(obj.hasOwnProperty(key))
// 			sortable.push([key, obj[key]]); // each item is an array in format [key, value]
	
// 	// sort items by value
// 	sortable.sort(function(a, b)
// 	{
// 	  return a[1]-b[1]; // compare numbers
// 	});
// 	console.log(sortable);
// 	return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
	
// }

// sortProperties(result);

//men in 1985
// d3.json("1985.json", function(data){
// 	console.log(data);

for (var i = 0; i < data.length; i++) {
	if(data[i].surface === " ")
		none++;
		else if(data[i].surface === "Clay")
		total[0].count++;
		else if(data[i].surface === "Grass")
		total[1].count++;
		else if (data[i].surface === "Hard")
		total[2].count++;
		else if (data[i].surface === "Carpet")
		total[3].count++;
		
 }

var x = d3.scaleBand()
	.domain(total.map(function(d){
		return d.surface;
	}))
	.range([0, width])
	.paddingInner(0.3)
	.paddingOuter(0.3);

var y = d3.scaleLinear()
	.domain([0, d3.max(total, function(d){
		return d.count;
	})])
	.range([height, 0]);

  var xAxisCall = d3.axisBottom(x);
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxisCall)
        .selectAll("text")
            .attr("y", "10")
            .attr("x", "10")
            .attr("text-anchor", "end")
           

//old hard court green #40A14C
var colorScale = d3.scaleOrdinal()
	.domain([total[0].surface, total[1].surface, total[2].surface, total[3].surface])
	.range(["#ff6927", "#00d844", "#0297DB", "#B05F5C"]);


var svg = d3.select("#chart-area")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

var rects = g.selectAll("rect")
	.data(total)

rects.enter()
	.append("rect")
	.attr("y", function(d){ return y(d.count); })
	.attr("x", function(d){
		return x(d.surface);
	})
	.attr("width", x.bandwidth)
	.attr("height", function(d){
		return height -  y(d.count)})
	.attr("fill", function(d, i) { return colorScale(i); });

});
	// const surface = data.map(function(surface){
	// 	clay += surface.Clay;
	// 	grass += surface.Grass;
	// 	carpet += surface.Carpet;
	// 	hard += surface.Hard;

	// });

// var x = d3.scaleBand()
// 	.domain(surfaces.map(function(d) {return surfaces}))
// 	.range([0, width])
// 	.paddingInner(0.3)
// 	paddingOuter(0.3);

// var y = d3.scaleLinear()
// 	.domain([0, total]);
// 	.range([height, 0]);

// d3.select("svg")
// 	.attr("width", width)
// 	.attr("height", height)
// .selectAll("rects")
// 	.data(data)
// 	.append("rects")
// 	.attr("y", function(d) return)

// })