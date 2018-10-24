$(document).ready(() => {

  $("input[type=radio][name=path-select]").change(function() {
    let duration = 200,
      fillOn = .8,
      fillOff = .2,
      fillOnAll = .5;
  
    switch (this.value) {
      case "a":
        for (path in chartPaths) {
          chartPaths[path].transition()
            .duration(duration)
            .style("fill-opacity", fillOnAll);
        }
        break;
      default:
        for (path in chartPaths) {
          switch (this.value) {
            case path:
              chartPaths[path].transition()
                .duration(duration)
                .style("fill-opacity", fillOn);
              break;
            default:
              chartPaths[path].transition()
                .duration(duration)
                .style("fill-opacity", fillOff);
              break;
          }
        }
        break;
    }
  });

  $("#image-upload").change(function() {
    getImage();
    setTimeout(() => {
      updateChart();
    }, 100);
  })

  getImage();
});

$(window).on("load", () => {
  initChart();
  updateChart();
});