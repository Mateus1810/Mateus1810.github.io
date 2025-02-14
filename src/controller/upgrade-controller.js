document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#upgrade'); // Seletor do formulário de upgrade
    const botoesUpgrade = document.querySelectorAll('.botoes-upgrade button'); // Botões de upgrade de componentes
    const campoNomeCliente = document.getElementById('nome-cliente'); // Campo "Nome do Cliente"
    const campoServOutro = document.getElementById('serv-Outro'); // Campo "Outros upgrades"
    const botaoEnviar = document.getElementById('enviar-upgrade'); // Botão de enviar

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

    // Evento no botão de envio
    botaoEnviar.addEventListener('click', function (event) {
        event.preventDefault();

        const nomeCliente = campoNomeCliente.value.trim(); // Valor do campo Nome do Cliente
        const servOutro = campoServOutro.value.trim(); // Valor do campo Outros upgrades

        // Verificar se o nome foi preenchido
        if (!nomeCliente) {
            alert('Por favor, preencha o campo "Nome do Cliente".');
            return;
        }

        // Gerar a mensagem com base no que foi selecionado/preenchido
        let mensagem = `Olá, meu nome é ${nomeCliente} e gostaria de saber mais sobre os upgrades de PC.`;

        if (upgradesSelecionados.length > 0) {
            const upgrades = upgradesSelecionados.join(', ');
            mensagem = `Olá, meu nome é ${nomeCliente} e gostaria de saber mais sobre os seguintes upgrades: ${upgrades}`;
        }

        if (servOutro) {
            mensagem += upgradesSelecionados.length > 0
                ? `, incluindo: ${servOutro}.`
                : `, especificamente sobre: ${servOutro}.`;
        } else if (upgradesSelecionados.length === 0) {
            mensagem = `Olá, meu nome é ${nomeCliente}. Não selecionei nenhum upgrade específico, mas gostaria de mais informações.`;
        }

        // Redirecionar para o WhatsApp com a mensagem
        const whatsappUrl = `https://wa.me/5533984024108?text=${encodeURIComponent(mensagem)}`;
        window.location.href = whatsappUrl;
    });
});
