var data; // loaded asynchronously
var dataRetirement;

var xy = d3.geo.equirectangular()
    .scale(900),
  path = d3.geo.path().projection(xy)

var svg = d3.select("#chart")
  .append("svg");

var states = svg.append("g")
    .attr("id", "countries")
    .attr("class", "Blues");

var popup = svg.append("g")
    .attr("id", "popup");

var popupText = popup.append("text")
    .attr("id", "popupText")
    .attr("x", 400)
    .attr("y", 300);

d3.json("world-countries.json", function(json) {
  states.selectAll("path")
      .data(json.features)
    .enter().append("path")
      .attr("d", path)
    .on('mouseover', function(d) {
      var countryData = dataRetirement[d.properties.name];
      if(countryData) {
        console.log(countryData.effective);
        popupText.text(d.properties.name + ": " + countryData.effective + " years old");
        d3.select(this).attr('opacity', 0.5);
      }
    })
    .on('mouseout', function(){
      d3.select(this).attr('opacity', 1);
    });
});

d3.json("eff_v_official_retirement_age.json", function(json) {
  data = json;
  dataRetirement = json;
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
    var className = 'q' + (Math.floor(9 * (max - value)/(max-min))) + '-9'
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



