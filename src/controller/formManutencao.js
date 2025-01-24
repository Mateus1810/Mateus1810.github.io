document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#upgrade'); // Seletor do formulário
    const botoesUpgrade = document.querySelectorAll('.botoes-upgrade button'); // Botões de upgrade
    const campoNomeCliente = document.getElementById('nome-cliente'); // Campo "Nome do Cliente"
    const campoServOutro = document.getElementById('serv-Outro'); // Campo "Outro(s)"
    const botaoEnviar = document.getElementById('enviar-upgrade'); // Botão de enviar

    // Lista de upgrades selecionados
    let upgradesSelecionados = [];

    // Lógica para selecionar/desmarcar botões de upgrade
    botoesUpgrade.forEach((botao) => {
        botao.addEventListener('click', function () {
            const upgrade = this.dataset.upgrade;

            // Adiciona ou remove o upgrade selecionado
            if (upgradesSelecionados.includes(upgrade)) {
                upgradesSelecionados = upgradesSelecionados.filter((item) => item !== upgrade);
                this.classList.remove('selecionado'); // Remove a classe de estilo
            } else {
                upgradesSelecionados.push(upgrade);
                this.classList.add('selecionado'); // Adiciona a classe de estilo
            }
        });
    });

    // Evento de clique no botão "Enviar Solicitação"
    botaoEnviar.addEventListener('click', function (event) {
        event.preventDefault();

        // Captura os valores dos campos
        const nomeCliente = campoNomeCliente.value.trim();
        const servOutro = campoServOutro.value.trim();

        // Verifica se o campo nome foi preenchido
        if (!nomeCliente) {
            alert('Por favor, preencha o nome do cliente.');
            return;
        }

        // Formata a mensagem para WhatsApp
        const upgrades = upgradesSelecionados.length > 0 ? upgradesSelecionados.join(', ') : 'Nenhum item selecionado';
        const outrosServicos = servOutro ? `, incluindo: ${servOutro}` : '';
        const mensagem = `Olá, meu nome é ${nomeCliente} e gostaria de saber mais sobre o serviço de ${upgrades}${outrosServicos}.`;

        // Link do WhatsApp com a mensagem formatada
        const whatsappUrl = `https://wa.me/5533984024108?text=${encodeURIComponent(mensagem)}`;

        // Redireciona para o WhatsApp
        window.location.href = whatsappUrl;
    });
});
