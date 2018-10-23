let image = new Image();

function getImage() {

  let input = $("#image-upload");

  if (input.files && input.files[0]) {

  } else {
    image.src="images/sampleImage1.png";
  }
}