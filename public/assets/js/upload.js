var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dlupxhne4/upload'
var CLOUDINARY_UPLOAD_PRESET = 'ujomemgw'
var imgPreview = document.getElementById('img-preview');
var fileUpload = document.getElementById('file-upload');
var imgUrl = document.getElementById('file-url');

fileUpload.addEventListener('change', function(event){
    var file = event.target.files[0];
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-urlencode'
        },
        data: formData
    }).then(function(res){
        console.log(res);
        imgPreview.src = res.data.secure_url;
        imgUrl.value = res.data.secure_url;
        return imgPreview;
    }).catch(function(err){
        console.error(err);
    });
    //console.log(file);
})