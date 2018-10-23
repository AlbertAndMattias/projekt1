let data = [],
  chartWrapper,
  chartCanvas,
  chartPaths,
  chartPathsData,
  areaGenerator,
  xScale, yScale,
  width, height;

function initChart() {

  for (i = 0; i < 256; i++) {
    data.push({
      r: 0,
      g: 0,
      b: 0,
      l: 0
    });
  }

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

  xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width]);

  yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([height, 0]);

  areaGenerator = d3.area()
    .x((d, i) => { return xScale(i); })
    .y0(height)
    .y1(d => { return yScale(d); })
    .curve(d3.curveStep);

  chartPathsData = {
    r: areaGenerator(data.map(d => { return d.r; })),
    g: areaGenerator(data.map(d => { return d.g; })),
    b: areaGenerator(data.map(d => { return d.b; })),
    l: areaGenerator(data.map(d => { return d.l; }))
  };

  chartCanvas = d3.select("#chart-canvas").select("g");

  chartCanvas.append("path")
    .classed("chart-path", true)
    .attr("id", "chart-path-r")
    .attr("d", chartPathsData.r);
  chartCanvas.append("path")
    .classed("chart-path", true)
    .attr("id", "chart-path-g")
    .attr("d", chartPathsData.g);
  chartCanvas.append("path")
    .classed("chart-path", true)
    .attr("id", "chart-path-b")
    .attr("d", chartPathsData.b);
  chartCanvas.append("path")
    .classed("chart-path", true)
    .attr("id", "chart-path-l")
    .attr("d", chartPathsData.l);

  chartPaths = {
    r: chartCanvas.select("#chart-path-r"),
    g: chartCanvas.select("#chart-path-g"),
    b: chartCanvas.select("#chart-path-b"),
    l: chartCanvas.select("#chart-path-l")
  };
}

function updateChart() {

  data = getPixelCounts();
  console.log(data);

  xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width]);

  yScale = d3.scaleLinear()
    .domain([0, d3.max(
      data.map(d => { return d.r; }).concat(
        data.map(d => { return d.g; }).concat(
          data.map(d => { return d.b; }).concat(
            data.map(d => { return d.l; })))))])
    .range([height, 0]);

  areaGenerator = d3.area()
    .x((d, i) => { return xScale(i); })
    .y0(height)
    .y1(d => { return yScale(d); })
    .curve(d3.curveStep);

  chartPathsData = {
    r: areaGenerator(data.map(d => { return d.r; })),
    g: areaGenerator(data.map(d => { return d.g; })),
    b: areaGenerator(data.map(d => { return d.b; })),
    l: areaGenerator(data.map(d => { return d.l; }))
  };

  for (path in chartPaths) {
    chartPaths[path].transition()
      .duration(Math.floor(Math.random() * 200 + 200))
      .attr("d", chartPathsData[path]);
  }
}