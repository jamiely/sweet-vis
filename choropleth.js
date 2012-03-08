var data; // loaded asynchronously

var xy = d3.geo.equirectangular()
    .scale(1000),
  path = d3.geo.path().projection(xy)

var svg = d3.select("#chart")
  .append("svg");

var counties = svg.append("g")
    .attr("id", "counties")
    .attr("class", "Blues");

var states = svg.append("g")
    .attr("id", "states");

d3.json("world-countries.json", function(json) {
  states.selectAll("path")
      .data(json.features)
    .enter().append("path")
      .attr("d", path);

  states.selectAll("path")
    .style("fill", "#F00");
});

d3.json("eff_v_official_retirement_age.json", function(csv) {
  data = csv;
  states.selectAll("path")
    .style("fill", determine);
});

function quantize(d) {
  return "q" + Math.min(8, ~~(data[d.id] * 9 / 12)) + "-9";
}

function determine(d) {
  if(data[d.properties.name]) {
    data[d.properties.name].claimed = true;
    return "#0F0";
  }
  else {
    return "#000";
  }
}

