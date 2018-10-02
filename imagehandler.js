function getPixelData(imageURI, canvasID) {
  let image = new Image();
  image.src = imageURI;
  
  let canvas = document.querySelector(canvasID);
  let context = canvas.getContext("2d");

  context.drawImage(image, 0, 0);

  let rawImageData = context.getImageData(0, 0, image.width, image.height).data;

  let imageData = [];

  for (i = 0; i < rawImageData.length; i += 4) {
    imageData.push({
      r: rawImageData[i],
      g: rawImageData[i + 1],
      b: rawImageData[i + 2],
      a: rawImageData[i + 3]
    });
  }

  return imageData;
}