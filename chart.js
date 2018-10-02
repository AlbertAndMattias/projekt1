// Chart init function
const initChart = () => {
  // Init data array
  let data = [];
  let imageData = getPixelData("image.png", "#canvas");

  for (let i = 0; i <= 255; i++) {

    let count = 0;
    for (let j = 0; j < imageData.length; j++) {
      count += imageData[j].r === i ? 1 : 0;
    }

    data.push({
      val: i,
      amt: count
    });
  }

  console.log(data);

  const chartContainer = d3.select("#chart-wrapper");

  const margin = { top: 0, right: 0, bottom: 0, left: 0 },
    aspect = 3,
    fullWidth = parseFloat(chartContainer.style("width")),
    fullHeight = fullWidth / aspect,
    width = fullWidth - margin.right - margin.left,
    height = fullHeight - margin.top - margin.bottom;

  const xScale = d3.scaleBand()
    .domain(data.map(d => { return d.val }))
    .range([0, width])
    .padding(0);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data.map(d => { return d.amt }))])
    .range([0, height]);
    
  const chart = chartContainer.append("svg")
    .attr("id", "chart")
    .attr("width", fullWidth)
    .attr("height", fullHeight);

  const chartBarContainer = chart.append("g")
    .attr("id", "chart-bar-container");

  const chartBars = chartBarContainer.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .classed("chart-bar", true)
    .attr("x", d => { return xScale(d.val); })
    .attr("y", d => { return height - yScale(d.amt); })
    .attr("width", xScale.bandwidth())
    .attr("height", d => { return yScale(d.amt); });
}

// Init chart on page load
window.onload = () => {
  initChart();
}