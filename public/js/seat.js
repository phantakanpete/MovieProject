let sbtnnormal = document.querySelectorAll('.sbtnn');
let subbtn = document.getElementById('subbtn');
let data = document.getElementById('sum');
let prices = document.getElementById('price');
let input = document.getElementById('input');
let seatselect = [];
let price = 0;
for (let i = 0; i < sbtnnormal.length; i++) {
    let list = sbtnnormal[i];
    list.onclick = function (){
        if(!this.classList.contains("btn-outline-primary")){
            this.classList.add("btn-outline-primary");
            seatselect.push(this.id);
            price += 10;
            subbtn.classList.remove("disabled");
        } else {
            this.classList.remove("btn-outline-primary");
            let index = seatselect.indexOf(this.id);
            seatselect.splice(index, 1);
            if(price >= 10){
                price -= 10;
            }
            if(price < 10){
                subbtn.classList.add("disabled");
            }
        }
        data.innerHTML = seatselect;
        input.setAttribute('value', seatselect);
        prices.innerHTML = price;
    };
}
