// Seleciona a lista de navegação no HTML
const navList = document.getElementById('nav-list');

// Gera os itens do menu com base nas rotas
routes.forEach(route => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${route.href}"><i class="${route.icon}"></i> ${route.label}</a>`;
    navList.appendChild(li);
});

