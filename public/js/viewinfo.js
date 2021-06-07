let movhistory = document.querySelector('#movhistory'),
    likemovie  = document.querySelector('#likemovie'),
    mycomment  = document.querySelector('#mycomment'),
    three      = document.getElementById('three'); 

mycomment.addEventListener('click', function(){
    // if(!one.classList.contains("d-none")){
    //     one.classList.add("d-none");
    // }
    // if(!two.classList.contains("d-none")){
    //     two.classList.add("d-none");
    // }
    if(three.classList.contains("d-none")){
        three.classList.remove("d-none");
    }
    mycomment.classList.add('active');
});

// rateButton.addEventListener("click", function(){
//     if(!one.classList.contains("d-none")){
//         one.classList.add("d-none");
//     }
//     if(!two.classList.contains("d-none")){
//         two.classList.add("d-none");
//     }
//     if(three.classList.contains("d-none")){
//         three.classList.remove("d-none");
//     }
//     if(!four.classList.contains("d-none")){
//         four.classList.add("d-none");
//     }
// });

// genreButton.addEventListener("click", function(){
//     if(!one.classList.contains("d-none")){
//         one.classList.add("d-none");
//     }
//     if(!two.classList.contains("d-none")){
//         two.classList.add("d-none");
//     }
//     if(!three.classList.contains("d-none")){
//         three.classList.add("d-none");
//     }
//     if(four.classList.contains("d-none")){
//         four.classList.remove("d-none");
//     }
// });