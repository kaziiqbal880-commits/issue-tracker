const userName = document.getElementById("user-name")
const passWord = document.getElementById("password")
const signInbtn = document.getElementById("sign-btn")
signInbtn.addEventListener('click', () => {
    if (userName.value === 'admin' && passWord.value === 'admin123') {
        window.location.href = 'main.html';
    } else {
        alert("Invalid Username OR password")
        return;
    }
})
