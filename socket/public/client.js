var socket = io();

socket.on('connected', function(data) {
    console.log(data);
});

var login = document.getElementById('login');
var inputLogin = document.querySelector('#input-login');
console.log(inputLogin);

var search = document.getElementById('search');
var inputSearch = document.getElementById('input-search');
var submitSearch = document.getElementById('submit-search')

var form = document.getElementById('chat-box');
var input = document.getElementById('input');

login.addEventListener('submit', function(e) {
    e.preventDefault();
    if(inputLogin.value) {
        socket.emit('addUser', inputLogin.value);
    }
    login.style.display = "none";    
    search.style.display = "block";
});

search.addEventListener('submit', function(e) {
    e.preventDefault();
    if(inputSearch.value) {
        socket.emit('findUser', inputSearch.value);
    }
    socket.on('found', function(data) {
    form.style.display = "block";
    document.getElementById('header').innerText = data;
})
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat-message', input.value);
        input.value = '';
    }
});

socket.on('chat-message', function(msg) {
    document.getElementById("view-chat").innerHTML += `<span> ${msg} </span> <br>`;
});