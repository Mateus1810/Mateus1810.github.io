document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#upgrade'); // Seletor do formulário de upgrade
    const botoesUpgrade = document.querySelectorAll('.botoes-upgrade button'); // Botões de upgrade de periféricos
    const campoNomeCliente = document.getElementById('nome-cliente'); // Campo "Nome do Cliente"
    const campoServOutro = document.getElementById('serv-Outro'); // Campo "Outros periféricos"
    const botaoEnviar = document.getElementById('enviar-upgrade'); // Botão de enviar
    const telefoneInput = document.getElementById('telefone');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const sobrenomeInput = document.getElementById('sobrenome');

    // Inicialmente, o formulário fica visível
    form.style.display = 'block';

    // Máscara para o telefone
    telefoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7, 11);
        }
        e.target.value = value;
    });

    // Lista para armazenar periféricos selecionados
    let perifericosSelecionados = [];

    // Gerenciar a seleção dos botões de periféricos
    botoesUpgrade.forEach((botao) => {
        botao.addEventListener('click', function () {
            const periferico = this.dataset.upgrade;

            // Adicionar ou remover periférico da lista
            if (perifericosSelecionados.includes(periferico)) {
                // Se o periférico já estiver na lista, remove ele
                perifericosSelecionados = perifericosSelecionados.filter((item) => item !== periferico);
                this.classList.remove('selecionado'); // Remove o estilo de seleção
            } else {
                // Se não estiver na lista, adiciona
                perifericosSelecionados.push(periferico);
                this.classList.add('selecionado'); // Adiciona o estilo de seleção
            }
        });
    });

    // Evento no botão de envio
    botaoEnviar.addEventListener('click', function (event) {
        event.preventDefault();

        const nomeCliente = campoNomeCliente.value.trim(); // Valor do campo Nome do Cliente
        const servOutro = campoServOutro.value.trim(); // Valor do campo Outros periféricos
        const intencaoUso = getCheckedValues(checkboxes);
        const telefone = telefoneInput.value.trim();
        const sobrenome = sobrenomeInput.value.trim();

        // Verificar se o nome foi preenchido
        if (!nomeCliente) {
            alert('Por favor, preencha o campo "Nome do Cliente".');
            return;
        }

        // Gerar a mensagem com base no que foi selecionado/preenchido
        let mensagem = `Olá, meu nome é ${nomeCliente} ${sobrenome} e gostaria de saber mais sobre os periféricos para PC.`;

        if (perifericosSelecionados.length > 0) {
            const perifericos = perifericosSelecionados.join(', ');
            mensagem = `Olá, meu nome é ${nomeCliente} ${sobrenome} e gostaria de saber mais sobre os seguintes periféricos: ${perifericos}\n`;
            mensagem += `Telefone/WhatsApp: ${telefone}\n`;
            mensagem += `Intenção de uso: ${intencaoUso}\n`;
        }

        if (servOutro) {
            mensagem += perifericosSelecionados.length > 0
                ? `, incluindo: ${servOutro}.`
                : `, especificamente sobre: ${servOutro}.`;
                mensagem += `Telefone/WhatsApp: ${telefone}\n`;
                mensagem += `Intenção de uso: ${intencaoUso}\n`;
        } else if (perifericosSelecionados.length === 0) {
            mensagem = `Olá, meu nome é ${nomeCliente} ${sobrenome}. Não selecionei nenhum periférico específico, mas gostaria de mais informações.`;
        }

        // Redirecionar para o WhatsApp com a mensagem
        const whatsappUrl = `https://wa.me/5533984024108?text=${encodeURIComponent(mensagem)}`;
        window.location.href = whatsappUrl;
    });
});
