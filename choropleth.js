var data; // loaded asynchronously

var xy = d3.geo.equirectangular()
    .scale(900),
  path = d3.geo.path().projection(xy)

var svg = d3.select("#chart")
  .append("svg");

var states = svg.append("g")
    .attr("id", "countries")
    .attr("class", "Blues");

d3.json("world-countries.json", function(json) {
  states.selectAll("path")
      .data(json.features)
    .enter().append("path")
      .attr("d", path);
});

d3.json("eff_v_official_retirement_age.json", function(json) {
  data = json;
  var dataValues = d3.values(data);

  var funParseProp = function(propName) {
    return dataValues.map(function(v) { return parseFloat(v[propName]); });
  };

  var dataEff = funParseProp('effective'),
    dataOff = funParseProp('official'),
    min = d3.min(dataEff),
    max = d3.max(dataEff);

  console.log("Min: " + min + "\nMax: " + max + "\n");

  var curryQuantize = function(d) {
    return quantize(min, max, d);
  };
  states.selectAll("path")
    .attr("class", curryQuantize);
});

function quantize(min, max, d) {
  var name = d.properties.name;
  if(data[name]) {
    // var className = "q" + Math.min(8, ~~(data[d.properties.name.effective] * 9 / 12)) + "-9";
    var value = parseFloat(data[name].effective);
    var className = 'q' + (Math.floor(9 * (value - min)/(max-min))) + '-9'
    console.log(className);
    return className;
  }
  else {
    console.log('missing');
    return "missing";
  }
}

function determine(d) {
  if(data[d.properties.name]) {
    data[d.properties.name].claimed = true;
    return "#0F0";
  }
  else {
    return "#EEE";
  }
}



