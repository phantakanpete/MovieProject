let action = document.getElementById('action'),
    thriller = document.getElementById('thriller'),
    scifi = document.getElementById('scifi'),
    adventure = document.getElementById('adventure'),
    comedy = document.getElementById('comedy');
    
let actionb = document.querySelector('#actionb'),
    thrillerb = document.querySelector('#thrillerb'),
    scifib = document.querySelector('#scifib'),
    adventureb = document.querySelector('#adventureb'),
    comedyb = document.querySelector('#comedyb');

actionb.addEventListener('click', function(){
    action.scrollIntoView();
});

thrillerb.addEventListener('click', function(){
    thriller.scrollIntoView();
});

scifib.addEventListener('click', function(){
    scifi.scrollIntoView();
});

adventureb.addEventListener('click', function(){
    adventure.scrollIntoView();
});

comedyb.addEventListener('click', function(){
    comedy.scrollIntoView();
});