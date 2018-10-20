$(document).ready(() => {
  // Init data array
  let data = [];
  let imageData = [];

  renderImage();

  // Chart init function
  function initChart() {

    imageData = returnData();

    for (let i = 0; i < 256; i++) {
      let count = { r: 0, g: 0, b: 0, l: 0 };
      for (let j = 0; j < imageData.length; j += 4) {
        count.r += imageData[j] === i ? 1 : 0;
        count.g += imageData[j + 1] === i ? 1 : 0;
        count.b += imageData[j + 2] === i ? 1 : 0;
        count.l += Math.floor(imageData[j] * 0.2126 + imageData[j + 1] * 0.7152 + imageData[j + 2] * 0.0722) === i ? 1 : 0;
      }
      data.push({
        r: count.r,
        g: count.g,
        b: count.b,
        l: count.l
      });
    }

    console.log(data);

    const chartContainer = d3.select("#chart-wrapper");

    const margin = { top: 0, right: 0, bottom: 0, left: 0 },
      aspect = 2, 
      fWidth = parseFloat(chartContainer.style("width")),
      fHeight = fWidth / aspect;
      width = fWidth - margin.right - margin.left,
      height = fHeight - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
      .domain([0, data.length])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data.map(d => { return d.r }).concat(data.map(d => { return d.g }).concat(data.map(d => { return d.b }))))])
      .range([height, 0]);
      
    const chartCanvas = chartContainer.append("svg")
      .attr("id", "chart-canvas")
      .attr("width", fWidth)
      .attr("height", fHeight)
      .append("g")
        .attr("transform", `translate(${ margin.left } ${ margin.top })`);

    const areaGenerator = d3.area()
      .x((d, i) => { return xScale(i); })
      .y0(height)
      .y1(d => { return yScale(d); })
      .curve(d3.curveStep);
    
    const pathsData = {
      r: areaGenerator(data.map(d => { return d.r; })),
      g: areaGenerator(data.map(d => { return d.g; })),
      b: areaGenerator(data.map(d => { return d.b; })),
      l: areaGenerator(data.map(d => { return d.l; }))
    };

    const chartPaths = { 
      r: chartCanvas.append("path")
          .classed("chart-path", true)
          .attr("id", "chart-path-r")
          .attr("d", pathsData.r),
      g: chartCanvas.append("path")
          .classed("chart-path", true)
          .attr("id", "chart-path-g")
          .attr("d", pathsData.g),
      b: chartCanvas.append("path")
          .classed("chart-path", true)
          .attr("id", "chart-path-b")
          .attr("d", pathsData.b),
      l: chartCanvas.append("path")
          .classed("chart-path", true)
          .attr("id", "chart-path-l")
          .attr("d", pathsData.l)
    };
  };

  // Init chart on page load
  $(window).on("load", function() {
    initChart();
  });

  $("input[type=radio][name=path-select]").change(function() {
    
    let duration = 200, 
      fillOn = .8,
      fillOff = .2,
      strokeOn = 1,
      strokeOff = .4,
      fillOnAll = .6,
      strokeOnAll = .8;

    if ($("#radio-a").prop("checked")) {
      d3.select("#chart-path-r").transition()
        .duration(duration)
        .style("fill-opacity", fillOnAll)
        .style("stroke-opacity", strokeOnAll);
      d3.select("#chart-path-g").transition()
        .duration(duration)
        .style("fill-opacity", fillOnAll)
        .style("stroke-opacity", strokeOnAll);
      d3.select("#chart-path-b").transition()
        .duration(duration)
        .style("fill-opacity", fillOnAll)
        .style("stroke-opacity", strokeOnAll);
      d3.select("#chart-path-l").transition()
        .duration(duration)
        .style("fill-opacity", fillOnAll)
        .style("stroke-opacity", strokeOnAll);   
    } else {
      d3.select("#chart-path-r").transition()
        .duration(duration)
        .style("fill-opacity", fillOff)
        .style("stroke-opacity", strokeOff);
      d3.select("#chart-path-g").transition()
        .duration(duration)
        .style("fill-opacity", fillOff)
        .style("stroke-opacity", strokeOff);
      d3.select("#chart-path-b").transition()
        .duration(duration)
        .style("fill-opacity", fillOff)
        .style("stroke-opacity", strokeOff);
      d3.select("#chart-path-l").transition()
        .duration(duration)
        .style("fill-opacity", fillOff)
        .style("stroke-opacity", strokeOff);
    }
    if ($("#radio-r").prop("checked")) {
      d3.select("#chart-path-r").transition()
        .duration(duration)
        .style("fill-opacity", fillOn)
        .style("stroke-opacity", strokeOn);  
    } else { 
      d3.select("#chart-path-r").transition()
      .duration(duration)
      .style("fill-opacity", fillOff)
      .style("stroke-opacity", strokeOff);
    }
    if ($("#radio-g").prop("checked")) {
      d3.select("#chart-path-g").transition()
        .duration(duration)
        .style("fill-opacity", fillOn)
        .style("stroke-opacity", strokeOn);  
    } else { 
      d3.select("#chart-path-g").transition()
      .duration(duration)
      .style("fill-opacity", fillOff)
      .style("stroke-opacity", strokeOff);
    }
    if ($("#radio-b").prop("checked")) {
      d3.select("#chart-path-b").transition()
        .duration(duration)
        .style("fill-opacity", fillOn)
        .style("stroke-opacity", strokeOn);  
    } else { 
      d3.select("#chart-path-b").transition()
      .duration(duration)
      .style("fill-opacity", fillOff)
      .style("stroke-opacity", strokeOff);
    }
    if ($("#radio-l").prop("checked")) {
      d3.select("#chart-path-l").transition()
        .duration(duration)
        .style("fill-opacity", fillOn)
        .style("stroke-opacity", strokeOn);  
    } else { 
      d3.select("#chart-path-l").transition()
      .duration(duration)
      .style("fill-opacity", fillOff)
      .style("stroke-opacity", strokeOff);
    }
  });
});