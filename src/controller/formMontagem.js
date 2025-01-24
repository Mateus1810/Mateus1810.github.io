document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('clientForm');
    const toggleButton = document.getElementById('toggleFormButton');
    const textoOpcao = document.getElementById('textoOpcao');
    const enviarPecasClienteButton = document.getElementById('enviarPecasCliente');
    const nomeInput = document.getElementById('nome');
    const sobrenomeInput = document.getElementById('sobrenome');
    const telefoneInput = document.getElementById('telefone');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const outrosTextoInput = document.getElementById('outros-texto');
    const precoMinInput = document.getElementById('preco-min');
    const precoMaxInput = document.getElementById('preco-max');
    const observacoesInput = document.getElementById('observacoes');

    // Inicialmente, o formulário fica visível
    form.style.display = 'block';
    textoOpcao.textContent = "Montar com Peças da Loja";
    enviarPecasClienteButton.style.display = 'none';

    // Alterna entre as opções de montagem
    toggleButton.addEventListener('click', function () {
        if (form.style.display === 'none') {
            form.style.display = 'block';
            enviarPecasClienteButton.style.display = 'none';
            textoOpcao.textContent = "Montar com Peças da Loja";
        } else {
            form.style.display = 'none';
            enviarPecasClienteButton.style.display = 'block';
            textoOpcao.textContent = "Montar com as Suas Peças";
        }
    });

    // Máscara para o telefone
    telefoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7, 11);
        }
        e.target.value = value;
    });

    // Obter valores dos checkboxes marcados
    function getCheckedValues(checkboxGroup) {
        return Array.from(checkboxGroup)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value)
            .join(', ');
    }

    // Verificar se o campo "Outros" é obrigatório
    function verificarOutrosObrigatorio() {
        outrosTextoInput.required = document.getElementById('outros').checked;
    }

    // Atualiza obrigatoriedade ao mudar o checkbox "Outros"
    verificarOutrosObrigatorio();
    document.getElementById('outros').addEventListener('change', verificarOutrosObrigatorio);

    // Envio do formulário (Peças da Loja)
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = nomeInput.value.trim();
        const sobrenome = sobrenomeInput.value.trim();
        const telefone = telefoneInput.value.trim();
        const intencaoUso = getCheckedValues(checkboxes);
        const outrosTexto = outrosTextoInput.value.trim();
        const precoMin = precoMinInput.value.trim();
        const precoMax = precoMaxInput.value.trim();
        const observacoes = observacoesInput.value.trim();
        const servico = "montagem de computadores";

        // Validações
        if (!nome || !sobrenome || !telefone) {
            alert("Por favor, preencha todos os campos obrigatórios (Nome, Sobrenome e Telefone).");
            return;
        }

        if (document.getElementById('outros').checked && outrosTexto === "") {
            alert("Por favor, especifique o campo 'Outros'.");
            outrosTextoInput.focus();
            return;
        }

        let message = `Olá, meu nome é ${nome} ${sobrenome} e gostaria de mais informações sobre o serviço de ${servico} (montagem com peças da loja).\n`;
        message += `Telefone/WhatsApp: ${telefone}\n`;
        message += `Intenção de uso: ${intencaoUso}\n`;
        if (document.getElementById('outros').checked) {
            message += `Outros: ${outrosTexto}\n`;
        }
        message += `Faixa de Preço: R$ ${precoMin} - R$ ${precoMax}\n`;
        if (observacoes) {
            message += `Observações: ${observacoes}\n`;
        }

        const whatsappUrl = `https://wa.me/5533984024108?text=${encodeURIComponent(message)}`;
        console.log("WhatsApp URL:", whatsappUrl); // Verifica o link gerado
        window.location.href = whatsappUrl;
    });

    // Envio para opção de Peças do Cliente
    enviarPecasClienteButton.addEventListener('click', function () {
        const nome = nomeInput.value.trim();
        const sobrenome = sobrenomeInput.value.trim();
        const telefone = telefoneInput.value.trim();
        const servico = "montagem de computadores";

        if (!nome || !sobrenome || !telefone) {
            alert("Por favor, preencha todos os campos obrigatórios (Nome, Sobrenome e Telefone).");
            return;
        }

        let message = `Olá, meu nome é ${nome} ${sobrenome} e gostaria de mais informações sobre o serviço de ${servico} (montagem com as minhas peças).\n`;
        message += `Telefone/WhatsApp: ${telefone}\n`;

        const whatsappUrl = `https://wa.me/5533984024108?text=${encodeURIComponent(message)}`;
        console.log("WhatsApp URL (Peças do Cliente):", whatsappUrl); // Verifica o link gerado
        window.location.href = whatsappUrl;
    });
});
