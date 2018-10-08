let outData;

const renderImage = () => {

  const image = new Image();
  image.src = "image3.png";

  image.addEventListener("load", function() {
    const canvas = document.querySelector("#canvas");
    const context = canvas.getContext("2d");

    canvas.width = image.width;
    canvas.height = image.height;

    context.drawImage(image, 0, 0);

    getImageData();
  });
};


const getImageData = () => {
  const canvas = document.querySelector("#canvas");
  const context = canvas.getContext("2d");
  
  const rawImageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
  
  const imageData = [];
  for (let i = 0; i < rawImageData.length; i += 4) {
    imageData.push({
      r: rawImageData[i],
      g: rawImageData[i + 1],
      b: rawImageData[i + 2],
      a: rawImageData[i + 3]
    });
  }
  outData = imageData;
};

const returnData = () => {
  return outData;
};