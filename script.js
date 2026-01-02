const activePage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
    if (link.getAttribute("href") === activePage){
      link.classList.add("active");
    }
});

let ul = document.querySelector("nav ul")

var toggle = false

function showNav(){
    if( toggle == false){
         ul.style.display = "flex";
         ul.style.flexDirection = "column";
         ul.style.justifyContent = "flex-start"
         toggle = true
     }else{
         ul.style.display = "none"
         toggle = false
     }
}



class userData{
    constructor(name, email, password){
        this.name = name
        this.email = email
        this.password = password
    }

    login(){
        if(this.email === "a@b.com" && this.password === 12345){
            console.log("login successful")
        }else{
            console.log("invalid credentials")
        }
    }
}

var p1 = new userData("yusuf", "a@b.com", 12345)
var p2 = new userData("kayode", "b@b.com", 12345)

p2.login()

comsole.log(p1.email)

class Animal{
    constructor(specie, name, leg){
        this.specie = specie
        this.name = name
        this.leg = leg 
    }

    animal(){
        if(this.specie === "aquatic" && this.leg >= 0){
            console.log("this is an herbivore")
        }else{
            console.log("this is a carnivore")
    }
    }
}

var a1 = new Animal("mammal", "dog", 4)
var a2 = new Animal("aquatic", "fish", 0)

console.log(a2.specie)
a2.animal()

class Car extends userData{
    constructor(model, year, name, email, password){
        super(name, email, password)
        this.model = model
        this.year = year
    }
}

let c1 = new Car("honda", 2023, "JOE", "a@b.com", 12345)

console.log(c1.name)

class Person{
    constructor(name, gender, nat){
        this.name = name
        this.gender = gender
        this.nat = nat
    }

}


class Habit extends Person{
    constructor(type, name, gender, nat){
        super(name, gender, nat)
        this.type = type
    }
}

var h1 = new Habit("agression", "micheal", "M", "Nigeria")
console.log(h1.nat);// var a = new Date("1/7/2023 12:08:32 pm")
var b = new Date("/20/2021");

console.log(a.getFullYear()- b.getFullYear())

var age = prompt("enter your dob mm/dd/yy");

if(age === ""){
   alert("enter your age");
}else{
   var today = new Date().getFullYear()

   var ageenter = new Date(age).getFullYear()

   alert(`you are now ${today - ageenter} years old`)
}

 function test(){
     return 2
 }

 const test = (a) => a >= 100 ? "high number" : "low number"

 console.log(test(99))

 try{
      var a   
      console.log(a)

     var a = prompt("enter data")
   
     if(typeof(a) === "string"){
         console.log("yes it is right")
     }else{
         throw "the value must be number"
     }
 }catch(err){

     console.log(err)

 }
 console.log("hello")

 var a = prompt("enter your score")

 try{
     if(a >= 50){
         console.log("you passed")
     }else{
         throw RangeError("come back next year")
     }
 }catch(err){
     console.log(err)
 }

 function calc(){
     alert("hello")
 }

 calc()

 setInterval(calc, 100000)
 function Test(){
     calc()
 }

 Test()

 var data = new Promise(function(positive, negative){

     var a = 1

     if(typeof(a) === "number"){
         positive("you must provide a number type")
     }else{
         negative("you must provide a number type")
     }
 })

 data.then(function(response){
     console.log(response)
 },

 function(err){
     console.log(err)
 }
 )

 fetch("https://facebook.com")
 .then(function(res){console.log(res)})
 .catch(function(err){console.log(err)})

 var cars = ["toyota", "ford"]

 var c = [...cars,89]

 console.log(c[1])

 c.find((a) => {
     if(a == "ford"){
         console.log(a)
     }
 })

 var test = c.filter((a) => {
     if(a == "ford"){
         return a
     }
 })
 console.log(test)
 c.map((b) => console.log(b))

 const countries = ["finland", "sweden", "denmark", "norway", "iceland"]
 countries.forEach((b) => {
 countries.reverse().map((countries) => {
     console.log(countries.toUpperCase())
     })
     console.log(b)
 });

 const name = ["Asabeneh", "Mathias", "Elias", "Brook"]
 name.forEach((c) => {
     console.log(c)
 })

 const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 numbers.forEach((d) => {
     console.log(d)
 })
