let outData;

const renderImage = () => {
  const image = new Image();
  image.src = "images/sampleImage1.png";

  image.addEventListener("load", () => {
    const canvas = document.querySelector("#image-canvas");
    const context = canvas.getContext("2d");

    canvas.width = image.width;
    canvas.height = image.height;

    context.drawImage(image, 0, 0);

    getImageData();
  });
};

const getImageData = () => {
  const canvas = document.querySelector("#image-canvas");
  const context = canvas.getContext("2d");
  
  const rawImageData = context.getImageData(0, 0, canvas.width, canvas.height).data;

  outData = rawImageData;
};

const returnData = () => {
  return outData;
};