document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('clientForm');
    const toggleButton = document.getElementById('toggleFormButton');
    const textoOpcao = document.getElementById('textoOpcao');
    const enviarPecasClienteButton = document.getElementById('enviarPecasCliente');
    const nomeClienteInput = document.getElementById('nome-cliente');

    // Inicialmente, o formulário fica visível (peças da loja)
    form.style.display = 'block';
    textoOpcao.innerHTML = "Opção atual: <b>Montar com Peças da Loja</b>";
    enviarPecasClienteButton.style.display = 'none';

    toggleButton.addEventListener('click', function() {
        if (form.style.display === 'none') {
            form.style.display = 'block';
            enviarPecasClienteButton.style.display = 'none';
            textoOpcao.innerHTML = "Opção atual: <b>Montar com Peças da Loja</b>";
        } else {
            form.style.display = 'none';
            enviarPecasClienteButton.style.display = 'block';
            textoOpcao.innerHTML = "Opção atual: <b>Montar com as Suas Peças</b>";
        }
    });

    // Envio do formulário (Peças da Loja)
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nomeCliente = nomeClienteInput.value;
        const uso = document.getElementById('uso').value;
        const precoMin = document.getElementById('preco-min').value; // Captura o valor mínimo
        const precoMax = document.getElementById('preco-max').value; // Captura o valor máximo
        const servico = "montagem de computadores";

        // Adiciona o nome do cliente à mensagem, se fornecido
        const message = `Olá, ${nomeCliente ? 'meu nome é ' + nomeCliente + ' e ' : ''}gostaria de mais informações sobre o serviço de ${servico} (montagem com peças da loja). Intenção de uso: ${uso}. Faixa de Preço: R$ ${precoMin} - R$ ${precoMax}.`;

        const whatsappUrl = `https://wa.me/5533984024108?text=${encodeURIComponent(message)}`;

        window.location.href = whatsappUrl;
    });

    // Envio para opção de Peças do Cliente
    enviarPecasClienteButton.addEventListener('click', function() {
        const nomeCliente = nomeClienteInput.value;
        const servico = "montagem de computadores";

        // Adiciona o nome do cliente à mensagem, se fornecido
        const message = `Olá, ${nomeCliente ? 'meu nome é ' + nomeCliente + ' e ' : ''}gostaria de mais informações sobre o serviço de ${servico} (montagem com as minhas peças).`;

        const whatsappUrl = `https://wa.me/5533984024108?text=${encodeURIComponent(message)}`;

        window.location.href = whatsappUrl;
    });
});