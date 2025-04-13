document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#upgrade');
    const botoesUpgrade = document.querySelectorAll('.botoes-upgrade button');
    const campoNomeCliente = document.getElementById('nome-cliente');
    const campoSobrenomeCliente = document.getElementById('sobrenome-cliente'); // novo
    const campoTelefoneCliente = document.getElementById('telefone-cliente');   // novo
    const campoServOutro = document.getElementById('serv-Outro');
    const botaoEnviar = document.getElementById('enviar-upgrade');

    let upgradesSelecionados = [];

    botoesUpgrade.forEach((botao) => {
        botao.addEventListener('click', function () {
            const upgrade = this.dataset.upgrade;

            if (upgradesSelecionados.includes(upgrade)) {
                upgradesSelecionados = upgradesSelecionados.filter((item) => item !== upgrade);
                this.classList.remove('selecionado');
            } else {
                upgradesSelecionados.push(upgrade);
                this.classList.add('selecionado');
            }
        });
    });

    botaoEnviar.addEventListener('click', function (event) {
        event.preventDefault();

        const nomeCliente = campoNomeCliente.value.trim();
        const sobrenomeCliente = campoSobrenomeCliente.value.trim(); // novo
        const telefoneCliente = campoTelefoneCliente.value.trim();   // novo
        const servOutro = campoServOutro.value.trim();

        // Validação dos campos obrigatórios
        if (!nomeCliente || !sobrenomeCliente || !telefoneCliente) {
            alert('Por favor, preencha todos os campos obrigatórios: nome, sobrenome e telefone.');
            return;
        }

        // Mensagem base
        let mensagem = `Olá, meu nome é ${nomeCliente} ${sobrenomeCliente} e meu telefone é ${telefoneCliente}. Gostaria de saber mais sobre os serviços.`;

        if (upgradesSelecionados.length > 0) {
            const upgrades = upgradesSelecionados.join(', ');
            mensagem = `Olá, meu nome é ${nomeCliente} ${sobrenomeCliente}, meu telefone é ${telefoneCliente} e gostaria de saber mais sobre o serviço de ${upgrades}`;
        }

        if (servOutro) {
            mensagem += upgradesSelecionados.length > 0
                ? `, incluindo: ${servOutro}.`
                : `, especificamente sobre: ${servOutro}.`;
        } else if (upgradesSelecionados.length === 0) {
            mensagem = `Olá, meu nome é ${nomeCliente} ${sobrenomeCliente}, meu telefone é ${telefoneCliente}. Não selecionei nenhum serviço específico, mas gostaria de mais informações.`;
        }

        // Redirecionar para o WhatsApp
        const whatsappUrl = `https://wa.me/5533984024108?text=${encodeURIComponent(mensagem)}`;
        window.location.href = whatsappUrl;
    });
});
