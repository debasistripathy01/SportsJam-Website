var user = JSON.parse(localStorage.getItem("userDatabase"))
    var signin = document.getElementById("signin")
    var logout = document.getElementById("logout")
    var acnt = document.getElementById("acnt")
    if(user != null){
        logout.style.display="flex";
        signin.style.display="none"
        acnt.style.display="none"
    }

    logout.onclick=function(){localStorage.removeItem("userDatabase")}


console.log("NEw pages")
var count = 1;

var product = JSON.parse(localStorage.getItem("quickViewProduct"));
var cart = JSON.parse(localStorage.getItem("shoppingCart"))||[];

console.log(product)
var prodName = document.createElement("h1");
prodName.textContent = product.name;
var img = document.createElement("img");
img.setAttribute("src",product.imgUrl);

var strikedprc = document.createElement("p");
strikedprc.textContent = "₹" +product.strikedOffPrice;
strikedprc.style.textDecoration = "line-through";
strikedprc.style.color = "grey"

var prc = document.createElement("p");
prc.textContent = "₹"+ product.price;

var discount = document.createElement("p");
    var x = Math.floor(((product.strikedOffPrice-product.price)/product.strikedOffPrice)*100)
    discount.textContent = x+ "%";
    discount.style.color = "orange";

var description = document.createElement("p");
description.innerHTML = product.description;

document.querySelector(".img").append(img);
document.querySelector("#desc").append(prodName, description);
document.querySelector("#prices").append(strikedprc, prc, discount);

document.title = product.name;    

document.querySelector("#addToCart").addEventListener("click",function(){
    var qty = count
    var cartobj = {
        image: product.imgUrl,
        product_name: product.name,
        product_price: product.price,
        quantity: qty,
    }
    var obj_found = false
    for(var i =0; i<cart.length; i++){
        if(cartobj.product_name == cart[i].product_name){
            cart[i].quantity++;
            obj_found = true;
            break;
        }
    }
    if(obj_found==false){
        cart.push(cartobj);
    }
    
    localStorage.setItem("shoppingCart",JSON.stringify(cart));
    document.querySelector("#counter").textContent = cart.length;
    
    if(window.matchMedia("(min-width:800px)").matches){
        var cartDisplay = document.querySelector("#cDisplay");
        cartDisplay.innerHTML = "";
        cart.map(function(elem){        
            var div=document.createElement("div");
            div.setAttribute("id","cartshowdiv");       

            var img = document.createElement("img");
            img.setAttribute("src",elem.image);
            img.setAttribute("width","150px");
            var nm = document.createElement("p");
            nm.textContent = elem.product_name;
            var p = document.createElement("p");
            p.textContent = "₹"+elem.product_price;
            var q = document.createElement("p");
            q.textContent = "QTY:"+elem.quantity;
            div.append(img, nm, p, q);
            
            cartDisplay.append(div);
            document.querySelector("#cartDisplay").style.display = "block";
        })

    }
    
})

document.querySelector("#closeCart").addEventListener("click",function(){
    document.querySelector("#cartDisplay").style.display = "none";
})


document.querySelector("#qtyplus").addEventListener("click",function(){
    count++;
    document.querySelector("#qty").textContent = count;
})
document.querySelector("#qtyminus").addEventListener("click",function(){
    if(count>0){
        count--;
    }
    
    document.querySelector("#qty").textContent = count;
})  

document.querySelector("#counter").textContent = cart.length;