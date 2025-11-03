const btn = document.getElementById('log-in');
const id = document.querySelector('#id')
const password = document.querySelector('#password')


btn.addEventListener('click', function(){
    if (id.value == 250118021 && password.value == "Id080112554005"){
        window.location.href = "home.html";
    }else{
        alert("ID or Password is incorrect")
    }
    
})