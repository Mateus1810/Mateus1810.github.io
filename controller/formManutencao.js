document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#upgrade'); // Seletor do formulário
    const botoesUpgrade = document.querySelectorAll('.botoes-upgrade button'); // Botões de upgrade
    const campoNomeCliente = document.getElementById('nome-cliente'); // Campo "Nome do Cliente"
    const campoServOutro = document.getElementById('serv-Outro'); // Campo "Outro(s)"
    const botaoEnviar = document.getElementById('enviar-upgrade'); // Botão de enviar

    // Lista para armazenar upgrades selecionados
    let upgradesSelecionados = [];

    // Gerenciar a seleção dos botões de upgrade
    botoesUpgrade.forEach((botao) => {
        botao.addEventListener('click', function () {
            const upgrade = this.dataset.upgrade;

            // Adicionar ou remover upgrade da lista
            if (upgradesSelecionados.includes(upgrade)) {
                upgradesSelecionados = upgradesSelecionados.filter((item) => item !== upgrade);
                this.classList.remove('selecionado'); // Remove estilo selecionado
            } else {
                upgradesSelecionados.push(upgrade);
                this.classList.add('selecionado'); // Adiciona estilo selecionado
            }
        });
    });

    // Evento no botão de envio
    botaoEnviar.addEventListener('click', function (event) {
        event.preventDefault();

        const nomeCliente = campoNomeCliente.value.trim(); // Valor do campo Nome do Cliente
        const servOutro = campoServOutro.value.trim(); // Valor do campo Outro(s)

        // Verificar se o nome foi preenchido
        if (!nomeCliente) {
            alert('Por favor, preencha o campo "Nome do Cliente".');
            return;
        }

        // Gerar a mensagem com base no que foi selecionado/preenchido
        let mensagem = `Olá, meu nome é ${nomeCliente} e gostaria de saber mais sobre os serviços.`;

        if (upgradesSelecionados.length > 0) {
            const upgrades = upgradesSelecionados.join(', ');
            mensagem = `Olá, meu nome é ${nomeCliente} e gostaria de saber mais sobre o serviço de ${upgrades}`;
        }

        if (servOutro) {
            mensagem += upgradesSelecionados.length > 0
                ? `, incluindo: ${servOutro}.`
                : `, especificamente sobre: ${servOutro}.`;
        } else if (upgradesSelecionados.length === 0) {
            mensagem = `Olá, meu nome é ${nomeCliente}. Não selecionei nenhum serviço específico, mas gostaria de mais informações.`;
        }

        // Redirecionar para o WhatsApp com a mensagem
        const whatsappUrl = `https://wa.me/5533984024108?text=${encodeURIComponent(mensagem)}`;
        window.location.href = whatsappUrl;
    });
});
