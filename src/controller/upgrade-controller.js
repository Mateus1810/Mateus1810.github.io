document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('upgrade');
    const botoesUpgrade = document.querySelectorAll('.botoes-upgrade button');
    const campoNomeCliente = document.getElementById('nome-cliente');

    // Define os itens de upgrade selecionados
    let upgradesSelecionados = [];

    // Adiciona um event listener para cada botão de upgrade
    botoesUpgrade.forEach(botao => {
        botao.addEventListener('click', function() {
            const upgrade = this.dataset.upgrade;

            // Adiciona ou remove o upgrade da lista de selecionados
            if (upgradesSelecionados.includes(upgrade)) {
                upgradesSelecionados = upgradesSelecionados.filter(item => item !== upgrade);
                this.classList.remove('selecionado'); // Remove a classe 'selecionado' para estilos
            } else {
                upgradesSelecionados.push(upgrade);
                this.classList.add('selecionado'); // Adiciona a classe 'selecionado' para estilos
            }
        });
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nomeCliente = campoNomeCliente.value;

        // Formata a mensagem com os upgrades selecionados
        const upgrades = upgradesSelecionados.length > 0 ? upgradesSelecionados.join(', ') : "Nenhum item selecionado";
        const message = `Olá, meu nome é ${nomeCliente} e gostaria de solicitar um upgrade para: ${upgrades}.`;

        const whatsappUrl = `https://wa.me/5533984024108?text=${encodeURIComponent(message)}`;

        window.location.href = whatsappUrl;
    });
});