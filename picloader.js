var theImg = new Image();

let imageData2 = [];
let data2 = [];

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#picLoader')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
        theImg = document.getElementById("picLoader");
        //console.log(theImg);
    }

}

function readWebURL(){

    var imgurl = document.getElementById("webFile").value;
    document.getElementById("picLoader").src=imgurl;
    theImg = document.getElementById("picLoader");
    //console.log(theImg);

}

function putInCanvas() {

    imageData2.length = 0;
    const canvas = document.querySelector("#canvas");
    const context = canvas.getContext("2d");

    canvas.width = theImg.width;
    canvas.height = theImg.height;

    context.drawImage(theImg, 0, 0);

    var rawImageData2 = context.getImageData(0, 0, canvas.width, canvas.height).data;


    for (let i = 0; i < rawImageData2.length; i += 4) {
        imageData2.push({
            r: rawImageData2[i],
            g: rawImageData2[i + 1],
            b: rawImageData2[i + 2],
            a: rawImageData2[i + 3]
        });
    }


    console.log('putInCanvas():');
    console.log(imageData2);

}

function analyzePic(){
    data2.splice(0,data2.length);
    for (let i = 0; i < 256; i++) {

        let count = { r: 0, g: 0, b: 0};
        for (let j = 0; j < imageData2.length; j++) {
            count.r += imageData2[j].r === i ? 1 : 0;
            count.g += imageData2[j].g === i ? 1 : 0;
            count.b += imageData2[j].b === i ? 1 : 0;
        }

        data2.push({
            r: count.r,
            g: count.g,
            b: count.b
        });
    }
    console.log('analyzePic():');
    console.log(data2);
    //////////////////

    const chartContainer = d3.select("#chart-wrapper");


    const margin = { top: 0, right: 0, bottom: 0, left: 0},
        aspect = 4,
        fullWidth = parseFloat(chartContainer.style("width")),
        fullHeight = parseFloat(chartContainer.style("height")),
        width = fullWidth - margin.right - margin.left,
        height = fullHeight - margin.top - margin.bottom;

    //chartContainer.selectAll("*").remove();

    const chart = chartContainer.transition("svg")
        .attr("id", "chart")
        .attr("width", fullWidth)
        .attr("height", fullHeight);


    const xScale = d3.scaleLinear()
        .domain([0, data2.length])
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data2.map(d => { return d.r }).concat(data2.map(d => { return d.g }).concat(data2.map(d => { return d.b }))))])
        .range([height, 0]);



    const areaGenerator = d3.area()
        .x((d, i) => { return xScale(i); })
        .y0(height)
        .y1((d, i) => { return yScale(d); })
        .curve(d3.curveStep);

    const pathsData2 = {
        r: areaGenerator(data2.map(d => { return d.r; })),
        g: areaGenerator(data2.map(d => { return d.g; })),
        b: areaGenerator(data2.map(d => { return d.b; }))
    }

    const chartPaths = {
        r: chart.append("path")
            .classed("chart-path2", true)
            .attr("id", "chart-path-r")
            .attr("d", pathsData2.r),
        g: chart.append("path")
            .classed("chart-path2", true)
            .attr("id", "chart-path-g")
            .attr("d", pathsData2.g),
        b: chart.append("path")
            .classed("chart-path2", true)
            .attr("id", "chart-path-b")
            .attr("d", pathsData2.b)
    }

}

