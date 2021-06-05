let input = document.querySelector('#file-input');
input.addEventListener('change', preview);

function preview(){
    let fileObject = this.files[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(fileObject);
    fileReader.onload = function(){
        let result = fileReader.result;
        let img = document.querySelector('#preview');
        img.setAttribute('src', result)
    }
}