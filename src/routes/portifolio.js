document.addEventListener('DOMContentLoaded', function () {
    const portfolioItems = [
        {
            imgSrc: "../src/img/20220902_133245.jpg",
            title: "Formatação e instalação de um novo sistema operacional"
        },
        {
            imgSrc: "../src/img/Screenshot_20221222-142126_Gallery.jpg",
            title: "Montagem completa de um computador novo com sistema operacional"
        },
        {
            imgSrc: "../src/img/20220213_094921.jpg",
            title: "Instalação do pacote office e upgrade"
        },
        {
            imgSrc: "../src/img/20220329_101659.jpg",
            title: "Manutenção preventiva e limpeza"
        },
        {
            imgSrc: "../src/img/273051965_201025975541122_8519923515218445004_n.jpg",
            title: "Formatação e limpeza"
        },
        {
            imgSrc: "../src/img/Imagem do WhatsApp de 2025-04-13 à(s) 11.33.53_90d8e51a.jpg",
            title: "Desbloqueio e Formatação"
        }

        // Adicione mais itens conforme necessário
    ];

    const portfolioContainer = document.getElementById('portfolio-items');

    portfolioItems.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.classList.add('catalogue-item');
        portfolioItem.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.title}">
                <p><b>${item.title}</b></p>
        `;
        portfolioContainer.appendChild(portfolioItem);
    });
});