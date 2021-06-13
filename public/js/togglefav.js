let postform = document.getElementById('postform');
let postbutton = document.querySelector('#postbutton');

postbutton.addEventListener('click', function(){
    if(postform.classList.contains("d-none")){
        postform.classList.remove("d-none");
    }

    if(!two.classList.contains("d-none")){
        two.classList.add("d-none");
    }
});