function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#picLoader')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function readWebURL(){

    var imgurl = document.getElementById("webFile").value;
    document.getElementById("picLoader").src=imgurl;

}