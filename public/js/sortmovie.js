// let rateButton = document.getElementById('rateButton');
// if(rateButton){
//     rateButton.addEventListener("click", function(){
//         return movie.sort((a, b) => (a.reldate > b.reldate) ? -1 : 1);
//     });
// }


let nameButton = document.querySelector('#nameButton');
    rateButton = document.querySelector('#rateButton'),
    genreButton = document.querySelector('#genreButton'),
    one = document.getElementById("one"),
    two = document.getElementById("two"),
    three = document.getElementById("three"),
    four = document.getElementById("four");

nameButton.addEventListener("click", function(){
    if(!one.classList.contains("d-none")){
        one.classList.add("d-none");
    }
    if(two.classList.contains("d-none")){
        two.classList.remove("d-none");
    }
    if(!three.classList.contains("d-none")){
        three.classList.add("d-none");
    }
    if(!four.classList.contains("d-none")){
        four.classList.add("d-none");
    }
});

rateButton.addEventListener("click", function(){
    if(!one.classList.contains("d-none")){
        one.classList.add("d-none");
    }
    if(!two.classList.contains("d-none")){
        two.classList.add("d-none");
    }
    if(three.classList.contains("d-none")){
        three.classList.remove("d-none");
    }
    if(!four.classList.contains("d-none")){
        four.classList.add("d-none");
    }
});

genreButton.addEventListener("click", function(){
    if(!one.classList.contains("d-none")){
        one.classList.add("d-none");
    }
    if(!two.classList.contains("d-none")){
        two.classList.add("d-none");
    }
    if(!three.classList.contains("d-none")){
        three.classList.add("d-none");
    }
    if(four.classList.contains("d-none")){
        four.classList.remove("d-none");
    }
});