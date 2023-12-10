const $html = document.querySelector('html');
const $checkbox = document.querySelector('#switch');
// Função para definir um cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

// Função para obter o valor de um cookie
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.indexOf(name + "=") === 0) {
        return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return "";
}

  // Verifique se o usuário já fez uma escolha anteriormente e defina o tema de acordo
if (getCookie("theme") === "dark") {
    $html.classList.add("dark-mode");
    $checkbox.checked = true;
}

// Adicione um ouvinte de evento para o checkbox
$checkbox.addEventListener('change', function () {
    if ($checkbox.checked) {
        $html.classList.add("dark-mode");
        setCookie("theme", "dark", 365); // Defina o cookie com o tema escuro
    } else {
        $html.classList.remove("dark-mode");
        setCookie("theme", "light", 365); // Defina o cookie com o tema claro
    }
});