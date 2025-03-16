function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const errorMsg = document.getElementById("error");

    const validUser = "Mateus Henrique";
    const validPass = "Galinha";

    if (user === validUser && pass === validPass) {
        window.location.href = "https://Mateus1810.github.io/src/routes/transitions.html"; // Substitua pelo URL da página desejada após login bem-sucedido
    } else {
        errorMsg.textContent = "Usuário ou senha incorretos!";
    }
}
