document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('clientForm');
    const toggleButton = document.getElementById('toggleFormButton');
    const textoOpcao = document.getElementById('textoOpcao');
    const enviarPecasClienteButton = document.getElementById('enviarPecasCliente');

    // Inicialmente, o formulário fica visível (peças da loja)
    form.style.display = 'block';
    textoOpcao.innerHTML = "Opção atual: <b>Montar com Peças da Loja</b>";
    enviarPecasClienteButton.style.display = 'none'; // Garante que o botão "Enviar (Peças do Cliente)" esteja oculto

    toggleButton.addEventListener('click', function() {
        if (form.style.display === 'none') {
            form.style.display = 'block';
            enviarPecasClienteButton.style.display = 'none'; // Oculta o botão "Enviar (Peças do Cliente)"
            textoOpcao.innerHTML = "Opção atual: <b>Montar com Peças da Loja</b>";
        } else {
            form.style.display = 'none';
            enviarPecasClienteButton.style.display = 'block'; // Mostra o botão "Enviar (Peças do Cliente)"
            textoOpcao.innerHTML = "Opção atual: <b>Montar com as Suas Peças</b>";
        }
    });

    // Envio do formulário (Peças da Loja)
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const uso = document.getElementById('uso').value;
        const valor = document.getElementById('valor').value;
        const servico = "montagem de computadores";

        const message = `Olá, gostaria de mais informações sobre o serviço de ${servico} (montagem com peças da loja). Intenção de uso: ${uso}. Valor em mente: R$ ${valor}.`;

        const whatsappUrl = `https://wa.me/5533984024108?text=${encodeURIComponent(message)}`;

        window.location.href = whatsappUrl;
    });

    // Envio para opção de Peças do Cliente
    enviarPecasClienteButton.addEventListener('click', function() {
        const servico = "montagem de computadores";
        const message = `Olá, gostaria de mais informações sobre o serviço de ${servico} (montagem com as minhas peças).`;

        const whatsappUrl = `https://wa.me/5533984024108?text=${encodeURIComponent(message)}`;

        window.location.href = whatsappUrl;
    });
});