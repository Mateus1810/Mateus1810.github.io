document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#upgrade'); // Seletor do formulário de upgrade
    const botoesUpgrade = document.querySelectorAll('.botoes-upgrade button'); // Botões de upgrade de componentes
    const campoNomeCliente = document.getElementById('nome-cliente'); // Campo "Nome do Cliente"
    const campoSobrenomeCliente = document.getElementById('sobrenome-cliente'); // Campo "Sobrenome cliente"
    const campoServOutro = document.getElementById('serv-Outro'); // Campo "Outros upgrades"
    const botaoEnviar = document.getElementById('enviar-upgrade'); // Botão de enviar
    const telefoneInput = document.getElementById('telefone');

    // Lista para armazenar upgrades de hardware ou software selecionados
    let upgradesSelecionados = [];

    // Gerenciar a seleção dos botões de upgrade de PC
    botoesUpgrade.forEach((botao) => {
        botao.addEventListener('click', function () {
            const upgrade = this.dataset.upgrade;

            // Adicionar ou remover upgrade da lista
            if (upgradesSelecionados.includes(upgrade)) {
                // Se o upgrade já estiver na lista, remove ele
                upgradesSelecionados = upgradesSelecionados.filter((item) => item !== upgrade);
                this.classList.remove('selecionado'); // Remove o estilo de seleção
            } else {
                // Se não estiver na lista, adiciona
                upgradesSelecionados.push(upgrade);
                this.classList.add('selecionado'); // Adiciona o estilo de seleção
            }
        });
    });

    // Máscara para o telefone
    telefoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7, 11);
        }
        e.target.value = value;
    });

    // Evento no botão de envio
    botaoEnviar.addEventListener('click', function (event) {
        event.preventDefault();

        const sobrenomeCliente = campoSobrenomeCliente.value.trim();
        const telefone = telefoneInput.value.trim();
        const nomeCliente = campoNomeCliente.value.trim(); // Valor do campo Nome do Cliente
        const servOutro = campoServOutro.value.trim(); // Valor do campo Outros upgrades

        // Verificar se o nome foi preenchido
        if (!nomeCliente, !sobrenomeCliente, !telefone) {
            alert('Por favor, preencha o campo "Nome, Sobrenome e telefone".');
            return;
        }

        // Gerar a mensagem com base no que foi selecionado/preenchido
        let mensagem = `Olá, meu nome é ${nomeCliente} ${sobrenomeCliente} Telefone/WhatsApp: ${telefone} e gostaria de saber mais sobre os upgrades de PC.`;

        if (upgradesSelecionados.length > 0) {
            const upgrades = upgradesSelecionados.join(', ');
            mensagem = `Olá, meu nome é ${nomeCliente} ${sobrenomeCliente} Telefone/WhatsApp: ${telefone} e gostaria de saber mais sobre os seguintes upgrades: ${upgrades}`;
        }

        if (servOutro) {
            mensagem += upgradesSelecionados.length > 0
                ? `, incluindo: ${servOutro}.`
                : `, especificamente sobre: ${servOutro}.`;
        } else if (upgradesSelecionados.length === 0) {
            mensagem = `Olá, meu nome é ${nomeCliente} ${sobrenomeCliente} Telefone/WhatsApp: ${telefone}. Não selecionei nenhum upgrade específico, mas gostaria de mais informações.`;
        }

        // Redirecionar para o WhatsApp com a mensagem
        const whatsappUrl = `https://wa.me/5533984024108?text=${encodeURIComponent(mensagem)}`;
        window.location.href = whatsappUrl;
    });
});
