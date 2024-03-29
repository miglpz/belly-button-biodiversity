function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

    // Use `d3.json` to fetch the metadata for a sample
    var metaUrl = `/metadata/${sample}`;
    d3.json(metaUrl).then(function(sample) {
    //   console.log("url", metaUrl);
    //   console.log ("first sample", sample);
     
  
      // Use d3 to select the panel with id of `#sample-metadata`
      var metaPanel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata

    metaPanel.html("");
    //   console.log("meta sample", metaPanel);

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    Object.entries(sample).forEach(function([key, value]) {
      var row = metaPanel.append("p");
      row.text(`${key}: ${value}`);

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
})

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

  var sampleUrl = `/samples/${sample}`;
  d3.json(sampleUrl).then(function(data) {
        
    var xValues = data.otu_ids;
    var yValues = data.sample_values;
    var markerSize = data.sample_values;
    var markerColors = data.otu_ids;
    var textValues = data.otu_labels;
    
    var trace = {
      x: xValues,
      y: yValues,
      mode: "markers",
      marker: {
        color: markerColors,   //markerColors,
        size: markerSize,
        colorscale: "Earth"
      }
    }

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

      var myData = [{
      values: data.sample_values.slice(0, 10),
      labels: data.otu_ids.slice(0, 10),
      hovertext: data.otu_labels.slice(0, 10),
      type: 'pie',
    }];

    var layout = {
      showlegend: true,
      height: 500,
      width: 500,
    };

    Plotly.newPlot('pie', myData, layout);

  })
  
}

function init() {

  // Grab a reference to the dropdown select element

  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options

  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots

    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init()

})};