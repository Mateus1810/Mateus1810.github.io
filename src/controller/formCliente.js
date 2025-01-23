document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('clientForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const clientName = document.getElementById('clientName').value;
        const urlParams = new URLSearchParams(window.location.search);
        const servico = urlParams.get('servico');
        const problema = urlParams.get('problema') || '';
        const message = `Olá, meu nome é ${clientName}. Gostaria de mais informações sobre o serviço de ${servico}. O que eu quero dar upgrade é no(a) ${problema}.`;
        const whatsappUrl = `https://wa.me/5533984024108?text=${encodeURIComponent(message)}`;
        window.location.href = whatsappUrl;
    });
});