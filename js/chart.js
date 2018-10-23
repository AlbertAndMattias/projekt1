let data = [],
  chartWrapper,
  chartCanvas,
  chartPaths,
  width, height;

function initChart() {

  chartWrapper = d3.select("#chart-wrapper");

  let margin = {top: 0, right: 0, bottom: 0, left: 0},
    aspect = 2.5,
    fWidth = parseInt(chartWrapper.style("width")),
    fHeight = fWidth / aspect;

  width = fWidth - margin.right - margin.left,
    height = fHeight - margin.top - margin.bottom;

  chartWrapper.append("svg")
    .attr("id", "chart-canvas")
    .attr("width", fWidth)
    .attr("height", fHeight)
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  chartCanvas.select("#chart-canvas").select("g");

  chartCanvas.append("path")
    .classed("chart-path", true)
    .attr("id", "chart-path-r");
  chartCanvas.append("path")
    .classed("chart-path", true)
    .attr("id", "chart-path-g");
  chartCanvas.append("path")
    .classed("chart-path", true)
    .attr("id", "chart-path-b");
  chartCanvas.append("path")
    .classed("chart-path", true)
    .attr("id", "chart-path-l");

  chartPaths = {
    r: chartCanvas.select("#chart-path-r"),
    g: chartCanvas.select("#chart-path-g"),
    b: chartCanvas.select("#chart-path-b"),
    l: chartCanvas.select("#chart-path-l")
  };
}

function updateChart() {

  data = [];

  let xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width]);

  let yScale = d3.scaleLinear()
    .domain([0, d3.max(
      data.map(d => { return d.r; }).concat(
        data.map(d => { return d.g; }).concat(
          data.map(d => { return d.b; }).concat(
            data.map(d => { return d.l; })))))])
    .range([height, 0]);

  let areaGenerator = d3.area()
    .x(d => { return xScale(d.x); })
    .y0(height)
    .y1(d => { return yScale(d); })
    .curve(d3.curveStep);

  let chartPathsData = {
    r: areaGenerator(data.map(d => { return d.r; })),
    g: areaGenerator(data.map(d => { return d.g; })),
    b: areaGenerator(data.map(d => { return d.b; })),
    l: areaGenerator(data.map(d => { return d.l; }))
  };

  for (path in chartPaths) {
    chartPaths[path].transition()
      .duration(200)
      .attr("d", chartPathsData[path]);
  }
}