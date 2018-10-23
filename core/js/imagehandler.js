let image = new Image();

function getImage() {

  let input = $("#image-upload")[0];

  if (input.files && input.files[0]) {

    let reader = new FileReader();

    reader.readAsDataURL(input.files[0]);
    reader.onload = e => {
      image.src = e.target.result;
    }
  } else {
    image.src = "images/sampleImage1.png";
  }

  image.addEventListener("load", () => {
    toCanvas();
  });
}

function toCanvas() {
  let canvas = $("#image-canvas")[0],
    context = canvas.getContext("2d");

  canvas.width = image.width;
  canvas.height = image.height;

  context.drawImage(image, 0, 0);
}

function getPixelCounts() {
  let canvas = $("#image-canvas")[0],
    context = canvas.getContext("2d");

  let rawImageData = context.getImageData(0, 0, canvas.width, canvas.height).data,
    outData = [];

  for (let i = 0; i < 256; i++) {
    let count = {r: 0, g: 0, b: 0, l: 0};
    for (let j = 0; j < rawImageData.length; j += 4) {
      count.r += rawImageData[j] === i ? 1 : 0; 
      count.g += rawImageData[j + 1] === i ? 1 : 0; 
      count.b += rawImageData[j + 2] === i ? 1 : 0; 
      count.l += Math.floor(rawImageData[j] * .2126 + rawImageData[j + 1] * .7152 + rawImageData[j + 2] * .0722) === i ? 1 : 0;
    }
    outData.push({
      r: count.r,
      g: count.g,
      b: count.b,
      l: count.l
    });
  }

  return outData;
}