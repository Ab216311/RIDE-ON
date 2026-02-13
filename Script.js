let user="";
let role="";

function enterApp(){

user=document.getElementById("username").value;
role=document.getElementById("role").value;

document.getElementById("auth").style.display="none";
document.getElementById("app").style.display="block";

setupMenu();

}

function setupMenu(){

let menu=document.getElementById("menu");

if(role==="passenger"){

menu.innerHTML=`

<div class="navbtn" onclick="load('home')">🏠 Home</div>
<div class="navbtn" onclick="load('book')">🚲 Book</div>
<div class="navbtn" onclick="load('history')">📜 History</div>

`;

}else{

menu.innerHTML=`

<div class="navbtn" onclick="load('home')">🏠 Home</div>
<div class="navbtn" onclick="load('requests')">📥 Requests</div>
<div class="navbtn" onclick="load('history')">📜 History</div>

`;

}

load("home");

}

function load(page){

let content="";

if(page==="home"){

content=`<div class="card">Welcome ${user}</div>`;

}

if(page==="book" && role==="passenger"){

content=`

<div class="card">

<h3>Request Ride</h3>

<input id="route" placeholder="Enter Route (e.g Ikeja → Yaba)">

<button onclick="requestRide()">Request</button>

</div>

`;

}

if(page==="requests" && role==="rider"){

showRequests();
return;

}

if(page==="history"){

let rides=JSON.parse(localStorage.getItem("rides"))||[];

rides.forEach(r=>{

if(r.user===user || r.rider===user){

content+=`<div class="card">${r.user} → ${r.route}<br>Status: ${r.accepted ? "Accepted":"Pending"}</div>`;

}

});

}

document.getElementById("content").innerHTML=content;

}

function requestRide(){

let route=document.getElementById("route").value;

let rides=JSON.parse(localStorage.getItem("rides"))||[];

rides.push({

user:user,
route:route,
accepted:false

});

localStorage.setItem("rides",JSON.stringify(rides));

alert("Ride Requested!");

}

function showRequests(){

let rides=JSON.parse(localStorage.getItem("rides"))||[];

let html="";

rides.forEach((r,i)=>{

if(!r.accepted){

html+=`

<div class="card">

Passenger: ${r.user}<br>
Route: ${r.route}

<button onclick="accept(${i})">Accept Ride</button>

</div>

`;

}

});

document.getElementById("content").innerHTML=html;

}

function accept(i){

let rides=JSON.parse(localStorage.getItem("rides"));

rides[i].accepted=true;
rides[i].rider=user;

localStorage.setItem("rides",JSON.stringify(rides));

showRequests();

}

/* Auto refresh like real-time */

setInterval(()=>{

if(role==="rider"){

showRequests();

}

},3000);
