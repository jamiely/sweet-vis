(function(exports){
  var dataDirectory = "./data/";
  var data; // loaded asynchronously
  var dataRetirement;

  var xy = d3.geo.equirectangular()
      .scale(900),
    path = d3.geo.path().projection(xy);

  var redraw = function() {
    console.log(svg);
    console.log("here", d3.event.translate, d3.event.scale);
    states.attr("transform",
        "translate(" + d3.event.translate + ")"
        + " scale(" + d3.event.scale + ")");
  };


  var svg = d3.select("#chart")
      .call(d3.behavior.zoom().on("zoom", redraw))
    .append("svg");

  var states = svg.append("g")
      .attr("id", "countries")
      .attr("class", "Blues");

  var popup = svg.append("g")
      .attr("id", "popup");

  var popupText = popup.append("text")
      .attr("id", "popupText")
      .attr("x", 200)
      .attr("y", 300);

  d3.json(dataDirectory + "world-countries.json", function(json) {
    states.selectAll("path")
        .data(json.features)
      .enter().append("path")
        .attr("d", path)
      .on('mouseover', function(d) {
        return;
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

  var processLifeExpectancyJSON = function() {
    processLifeExpectancy(d3.json, "life_expectancy.json", function(json) {
      return json;
    });
  };
  var processLifeExpectancyCSV = function() {
    processLifeExpectancy(d3.csv, "life_expectancy.csv", function(csv) {
      var data = {}
      csv.forEach(function(item) {
        data[item.Country] = item.LifeExpectancy;
      });
      return data;
    });
  };

  var processLifeExpectancy = function(parseFun, filename, dataFun) {
    parseFun(dataDirectory + filename, function(parsedData) {
      data = dataFun(parsedData);
      var dataValues = d3.values(data);

      var 
        min = d3.min(dataValues),
        max = d3.max(dataValues);

      console.log("Min: " + min + "\nMax: " + max + "\n");

      var curryQuantize = function(d) {
        return quantizeLifeExpectancy(min, max, d);
      };
      states.selectAll("path")
        .attr("class", curryQuantize);
    });
  };



  var renderRetirementAge = function() {
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
  }


  function quantizeLifeExpectancy(min, max, d) {
    var name = d.properties.name;
    if(data && data[name]) {
      var value = parseFloat(data[name]);
      var className = 'q' + (Math.floor(9 * (max - value)/(max-min))) + '-9'
      console.log(className);
      return className;
    }
    else {
      console.log('missing');
      return "missing";
    }
  }
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

  exports.selectDataSource = function(dataSourceName) {
    switch(dataSourceName) {
      case 'life_expectancy_all':
        processLifeExpectancyCSV();
        break;
      case 'life_expectancy_limited':
        processLifeExpectancyJSON();
        break;
      case 'effective_retirement_age':
        break;
      case 'official_retirement_age':
        break;
    }
  };
})(window);
