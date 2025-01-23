document.addEventListener('DOMContentLoaded', function () {
    const enviarUpgradeButton = document.getElementById('enviar-upgrade');

    enviarUpgradeButton.addEventListener('click', function () {
        const nomeCliente = document.getElementById('nome-cliente').value;
        const opcoesSelecionadas = [];
        const checkboxes = document.querySelectorAll('input[name="upgrade-option"]:checked');

        checkboxes.forEach(checkbox => {
            opcoesSelecionadas.push(checkbox.id.replace('upgrade-', ''));
        });

        const servico = "Upgrade de Computador";
        const message = `Olá, meu nome é ${nomeCliente} e gostaria de solicitar um upgrade para as seguintes peças: ${opcoesSelecionadas.join(', ')}.`;

        const whatsappUrl = `https://wa.me/5533984024108?text=${encodeURIComponent(message)}`;
        window.location.href = whatsappUrl;
    });
});