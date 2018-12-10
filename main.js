var margin = { left:100, right:10, top:10, bottom:150 };

var width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


	var none = 0;
	var year = 1989;
	var total = [ 
	{
		"surface": "clay",
		"count": 0,
		"tournaments": []
	},
	{	
		"surface": "grass",
		"count": 0,
		"tournaments": []
	},
	{
		"surface": "hard",
		"count": 0,
		"tournaments": []
	},
	{	
		"surface": "carpet",
		"count": 0,
		"tournaments": []
	}
	]


var g = d3.select("#chart-area")
		.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left 
				+ ", " + margin.top + ")");  
	
	
//X Label
var yearLabel = g.append("text")
.attr("class", "x axis-label")
.attr("x", width / 2)
.attr("y", height + 40)
.attr("font-size", "20px")
.attr("text-anchor", "middle")
.text(`Tennis matches per surface ${year} `);




// var surfaces = [clay, grass, hard, carpet];

// ladies in 1986
// d3.csv("wta_${year}.csv", function(data){
// 	console.log(data);

// d3.csv(`./tennis_wta/wta_matches_${year}.csv`, function(data){


	d3.interval(function(){
		
	update()
	}, 1000);



function update() {
	d3.csv(`./tennis_atp/atp_matches_${year}.csv`, function(data){	
	if (year === 1990){
	     year = 1980;
    }
	else 
	   year++; 
	//console.log(data);
// players from that year
// winners winner_name then loser_name
const grouped = data.reduce((groups, cur) => {
	const key = cur.tourney_name;
	//this.surface = cur.surface;

	groups[key] = (groups[key] || 0) + 1;

	return groups;
}, {});

const result = Object.keys(grouped).map(key => ( {name: key, count: grouped[key]} ));



// players with more than 20 wins
var newArray = result.filter(function (el) {
	return el.count >= 20
});
console.log(newArray);
newArray.sort(function(a, b){
	return b.count - a.count
});
console.log(newArray);


// sorting info for bar charts by surface and tournament surface type
for (var i = 0; i < data.length; i++) {
	if(data[i].surface === " ")
		none++;
		else if(data[i].surface === "Clay"){
		total[0].count++;
			if(!total[0].tournaments.includes(data[i].tourney_name)){
		total[0].tournaments.push(data[i].tourney_name)
			}}
		else if(data[i].surface === "Grass"){
			total[1].count++;
				if(!total[1].tournaments.includes(data[i].tourney_name)){
			total[1].tournaments.push(data[i].tourney_name)
				}}
		else if (data[i].surface === "Hard"){
			total[2].count++;
				if(!total[2].tournaments.includes(data[i].tourney_name)){
			total[2].tournaments.push(data[i].tourney_name)
				}}
		else if (data[i].surface === "Carpet"){
			total[3].count++;
				if(!total[3].tournaments.includes(data[i].tourney_name)){
			total[3].tournaments.push(data[i].tourney_name)
				}}
		
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




//data join
var rects = g.selectAll("rect")
	.data(total)


//update
rects
.attr("y", function(d){ return y(d.count); })
.attr("x", function(d){
	return x(d.surface);
})
.attr("width", x.bandwidth)
.attr("height", function(d){
	return height -  y(d.count)}) 

//ENTER
rects.enter()
	.append("rect")
	.attr("y", function(d){ return y(d.count); })
	.attr("x", function(d){
		return x(d.surface);
	})
	.attr("width", x.bandwidth)
	.attr("height", function(d){
		return height -  y(d.count)})
	.attr("fill", function(d, i) { return colorScale(i); })
	// .transition(d3.transition().duration(500)) 
	// 	.attr()
//exit
rects.exit.remove();

});	
}