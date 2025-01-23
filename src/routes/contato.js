document.addEventListener('DOMContentLoaded', function() {
    const whatsappLink = document.querySelector('.whatsapp-button');
    whatsappLink.addEventListener('click', function(event) {
        // Prevenir o comportamento padrão do link (opcional)
        event.preventDefault(); 

        // Seu código customizado aqui
        console.log('Link do WhatsApp clicado!');

        // Rastrear o evento, por exemplo, com Google Analytics (gtag.js)
        gtag('event', 'click', {
            'event_category': 'Contato',
            'event_label': 'WhatsApp'
        });

        // Redirecionar o usuário para o link (opcional, dependendo da sua necessidade)
        window.location.href = whatsappLink.href;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const emailLink = document.querySelector('.email-button');
    emailLink.addEventListener('click', function(event) {
        // Prevenir o comportamento padrão do link (opcional)
        event.preventDefault();

        // Seu código customizado aqui
        console.log('Link de Email clicado!');

        // Rastrear o evento, por exemplo, com Google Analytics (gtag.js)
        gtag('event', 'click', {
            'event_category': 'Contato',
            'event_label': 'Email'
        });

        // Redirecionar o usuário para o link (opcional)
        window.location.href = emailLink.href;
    });
});