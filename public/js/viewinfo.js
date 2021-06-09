let movhistory = document.querySelector('#movhistory'),
    likemovie  = document.querySelector('#likemovie'),
    mycomment  = document.querySelector('#mycomment'),
    one      = document.getElementById('one'),
    two      = document.getElementById('two'),
    three      = document.getElementById('three'); 

mycomment.addEventListener('click', function(){
    if(!one.classList.contains("d-none")){
        one.classList.add("d-none");
    }
    movhistory.classList.remove('active');
    
    if(!two.classList.contains("d-none")){
        two.classList.add("d-none");
    }
    likemovie.classList.remove('active');
    
    if(three.classList.contains("d-none")){
        three.classList.remove("d-none");
    }
    mycomment.classList.add('active');
});

movhistory.addEventListener('click', function(){
    if(one.classList.contains("d-none")){
        one.classList.remove("d-none");
    }
    movhistory.classList.add('active');
    
    if(!two.classList.contains("d-none")){
        two.classList.add("d-none");
    }
    likemovie.classList.remove('active');
    
    if(!three.classList.contains("d-none")){
        three.classList.add("d-none");
    }
    mycomment.classList.remove('active');
});

likemovie.addEventListener('click', function(){
    if(!one.classList.contains("d-none")){
        one.classList.add("d-none");
    }
    movhistory.classList.remove('active');
    
    if(two.classList.contains("d-none")){
        two.classList.remove("d-none");
    }
    likemovie.classList.add('active');
    
    if(!three.classList.contains("d-none")){
        three.classList.add("d-none");
    }
    mycomment.classList.remove('active');
});
