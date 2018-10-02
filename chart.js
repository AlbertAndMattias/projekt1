// Init data array
let data = [];
let imageData = [];

renderImage();

// Chart init function
const initChart = () => {
  
  imageData = returnData();

  for (let i = 0; i < 256; i++) {
    
    let count = { r: 0, g: 0, b: 0};
    for (let j = 0; j < imageData.length; j++) {
      count.r += imageData[j].r === i ? 1 : 0;
      count.g += imageData[j].g === i ? 1 : 0;
      count.b += imageData[j].b === i ? 1 : 0;
    }
    
    data.push({
      r: count.r,
      g: count.g,
      b: count.b
    });
  }

  console.log(data);

  const chartContainer = d3.select("#chart-wrapper");

  const margin = { top: 0, right: 0, bottom: 0, left: 0},
    aspect = 4, 
    fullWidth = parseFloat(chartContainer.style("width")),
    fullHeight = parseFloat(chartContainer.style("height"))
    width = fullWidth - margin.right - margin.left,
    height = fullHeight - margin.top - margin.bottom;

  const xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data.map(d => { return d.r }).concat(data.map(d => { return d.g }).concat(data.map(d => { return d.b }))))])
    .range([height, 0]);
    
  const chart = chartContainer.append("svg")
    .attr("id", "chart")
    .attr("width", fullWidth)
    .attr("height", fullHeight);

  const areaGenerator = d3.area()
    .x((d, i) => { return xScale(i); })
    .y0(height)
    .y1((d, i) => { return yScale(d); })
    .curve(d3.curveStep);
  
  const pathsData = {
    r: areaGenerator(data.map(d => { return d.r; })),
    g: areaGenerator(data.map(d => { return d.g; })),
    b: areaGenerator(data.map(d => { return d.b; }))
  }

  const chartPaths = { 
    r: chart.append("path")
      .classed("chart-path", true)
      .attr("id", "chart-path-r")
      .attr("d", pathsData.r),
    g: chart.append("path")
      .classed("chart-path", true)
      .attr("id", "chart-path-g")
      .attr("d", pathsData.g),
    b: chart.append("path")
    .classed("chart-path", true)
    .attr("id", "chart-path-b")
    .attr("d", pathsData.b)
  }
}

// Init chart on page load
window.onload = () => {
  initChart();
}