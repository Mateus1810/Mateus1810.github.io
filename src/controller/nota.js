function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Data e Hora
    const dataAtual = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.text(`Data: ${dataAtual}`, 10, 10);

    const pagamento = getValue('forma-pagamento');

    // Se o pagamento for "Dinheiro/Pix", adiciona o QR Code
    if (pagamento === "Dinheiro/Pix") {
        const canvas = document.getElementById("qrcode"); // Pega o canvas
        const imgqr = canvas.toDataURL("image/png"); // Converte para Base64
        doc.addImage(imgqr, "PNG", 145, 10, 40, 40); // Adiciona a imagem no PDF
        doc.setFont('helvetica'); // Define a fonte (antes de setar o tamanho)
        doc.setFontSize(12); // Define o tamanho da fonte
        doc.text("Pague com PIX", 150, 55, null, null, 'left'); // Coloca o texto abaixo da imagem
    }
    else {
    const imgData = 'data:image/png;base64,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'; // Aqui vai o Base64 da sua imagem
    doc.addImage(imgData, 'PNG', 145, 10, 40, 40); // (imagem, tipo, x, y, largura, altura)
    }

    // Título
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text("Digital Drift", 105, 18, null, null, 'center');
    doc.setFontSize(14);
    doc.setTextColor(128, 128, 128);
    doc.text("Nota de Serviço", 105, 24, null, null, 'center');
    doc.setTextColor(0, 0, 0);

    // Função para pegar valores sem erro
    function getValue(id) {
        const element = document.getElementById(id);
        return element ? element.value : "";
    }

    // Informações do Cliente
    doc.setFontSize(12);
    doc.text(`Cliente: ${getValue('nome')} ${getValue('sobrenome')}`, 10, 30);
    doc.text(`Telefone: ${getValue('telefone')}`, 10, 40);


    doc.setFont('helvetica', 'normal');
    doc.text("Forma de Pagamento: ", 10, 50);

    doc.setFillColor(128, 128, 128); // Cinza (RGB: 128, 128, 128)
    doc.setTextColor(255, 255, 255); // Branco
    doc.rect(58, 44, doc.getTextWidth(pagamento) + 6, 8, 'F'); // Caixa preenchida

    doc.setFont('helvetica', 'bold');
    doc.text(pagamento, 60, 50);

    // Voltar para cores normais após essa parte
    doc.setTextColor(0, 0, 0); // Preto

    // Tabela de Detalhes do Serviço
    const detalhes = [
        ["Descrição do Problema", getValue('entrada')],
        ["Condições do Aparelho", getValue('condicao')],
        ["Serviço Realizado", getValue('servico')],
    ];

    doc.autoTable({
        startY: 60,
        head: [["Categoria", "Detalhes"]],
        body: detalhes,
        theme: 'striped',
        headStyles: { fillColor: '#808080', textColor: 'white' },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 72 }, 1: { cellWidth: 110 } }
    });

    // Tabela de Produtos Gastos
    const produtosGastos = [];
    const linhas = document.querySelectorAll('#produtos-gastos tbody tr');
    linhas.forEach(linha => {
        const produto = linha.querySelector('.produto')?.value;
        const quantidade = parseFloat(linha.querySelector('.quantidade')?.value) || 0;
        const valor = parseFloat(linha.querySelector('.valor')?.value) || 0;
        const totalProduto = quantidade * valor;

        if (produto && quantidade > 0 && valor > 0) {
            produtosGastos.push([produto, quantidade, `R$ ${valor.toFixed(2)}`, `R$ ${totalProduto.toFixed(2)}`]);
        }
    });

    if (produtosGastos.length > 0) {
        doc.autoTable({
            startY: doc.autoTable.previous.finalY + 10,
            head: [["Item", "Qtd", "V. Unitário", "Total"]],
            body: produtosGastos,
            theme: 'grid',
            headStyles: { fillColor: '#808080', textColor: 'white' },
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 70 },  // Nome do item
                1: { halign: 'center', cellWidth: 20 },   // Quantidade
                2: { halign: 'right', cellWidth: 40 },    // Valor unitário
                3: { halign: 'right', cellWidth: 52 }     // Total
            }
        });
    }

    // Tabela de Valores
    const valores = [
        ["Subtotal", `R$ ${getValue('subtotal')}`],
        ["Descontos", `R$ ${getValue('descontos')}`],
        ["Outros Serviços", `R$ ${getValue('outros')}`],
        ["Total", `R$ ${getValue('total')}`]
    ];

    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 10,
        head: [["Descrição", "Valor"]],
        body: valores,
        theme: 'grid',
        headStyles: { fillColor: '#808080', textColor: 'white' },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 80 }, 1: { halign: 'right' } }
    });

    // Adicionando duplicatas no PDF
    const numParcelas = parseInt(getValue("parcelamento")) || 1;
    const valorParcela = (parseFloat(getValue("total")) / numParcelas).toFixed(2);
    let duplicatas = [];
    for (let i = 1; i <= numParcelas; i++) {
        duplicatas.push([`Parcela ${i}`, `R$ ${valorParcela}`]);
    }

    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 10,
        head: [["Parcela", "Valor"]],
        body: duplicatas,
        theme: 'grid',
        headStyles: { fillColor: '#808080', textColor: 'white' },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 }, 1: { halign: 'right' } }
    });

    // Adicionando página da Declaração de Garantia
    doc.addPage();

    // Cabeçalho
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text("DECLARAÇÃO DE GARANTIA", 105, 20, { align: "center" });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text("Esta declaração assegura que os serviços prestados e peças substituídas", 10, 40);
    doc.text("neste documento possuem garantia conforme os seguintes termos:", 10, 50);

    // Lista de termos da garantia
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text("1. ", 10, 70);
    doc.setFont('helvetica', 'normal');
    doc.text("A garantia cobre defeitos decorrentes de serviço inadequado ou peças com defeito de fabricação.", 15, 70);

    doc.setFont('helvetica', 'bold');
    doc.text("2. ", 10, 80);
    doc.setFont('helvetica', 'normal');
    doc.text("A garantia não cobre mau uso, danos acidentais ou intervenção de terceiros.", 15, 80);

    doc.setFont('helvetica', 'bold');
    doc.text("3. ", 10, 90);
    doc.setFont('helvetica', 'normal');
    doc.text("O período de garantia é de 90 dias a partir da data do serviço.", 15, 90);

    doc.setFont('helvetica', 'bold');
    doc.text("4. ", 10, 100);
    doc.setFont('helvetica', 'normal');
    doc.text("Para acionar a garantia, o cliente deve apresentar esta nota de serviço.", 15, 100);

    // Assinatura do Cliente
    doc.setFontSize(12);
    doc.text("Assinatura do Cliente: _________________________", 10, 130);
    doc.setFontSize(10);
    doc.text(`Data: ${dataAtual}`, 150, 130);

    // Rodapé
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text("Digital Drift - Assistência Técnica", 105, 160, { align: "center" });

    doc.setFont('helvetica', 'normal');
    doc.text("Contato: (33) 984024108", 105, 170, { align: "center" });
    doc.text("Endereço: Rua Raimundo Marins, 20, Manhuaçu-MG 36906-099", 105, 176, { align: "center" });

    // Salvando PDF
    doc.save(`Nota_${getValue('nome')}.pdf`);
}

function calcularTotal() {
    // Obter os valores dos inputs
    let subtotal = parseFloat(document.getElementById("subtotal").value) || 0;
    let descontos = parseFloat(document.getElementById("descontos").value) || 0;
    let outros = parseFloat(document.getElementById("outros").value) || 0;
    let formaPagamento = document.getElementById("forma-pagamento").value;
    let parcelamento = document.getElementById("parcelamento").value;
    let totalInput = document.getElementById("total");
    let pixInput = document.getElementById("in_value");
    let dvCt = document.querySelector(".dv_ct"); // Seleciona o elemento com a classe "dv_ct"

    // Calcular a taxa
    let taxa = 0;
    let taxaTexto = "";

    if (formaPagamento === "Cartão") {
        if (parcelamento === "1") {
            taxa = 5.24;
            taxaTexto = "5,24% (à vista)";
        } else {
            taxa = 6.77;
            taxaTexto = "6,77% (parcelado)";
        }
    } else if (formaPagamento === "Cartão Avista") {
        taxa = 3.19;
        taxaTexto = "3,19%";
    } else if (formaPagamento === "Débito") {
        taxa = 2.03;
        taxaTexto = "2,03%";
    } else {
        taxaTexto = "0,00%";
    }

    // Exibir a taxa
    document.getElementById("taxa-maquina").textContent = taxaTexto;

    // Calcular o total com a taxa
    let totalComTaxa = subtotal - descontos + outros;
    if (formaPagamento !== "Dinheiro/Pix") {
        totalComTaxa += totalComTaxa * (taxa / 100);
    }

    // Exibir o total
    totalInput.value = totalComTaxa.toFixed(2);

    // Atualizar automaticamente o valor do PIX
    pixInput.value = totalInput.value;

    // Atualizar as parcelas
    atualizarParcelas(parseInt(parcelamento), totalComTaxa);

    // Mostrar ou esconder a classe "dv_ct"
    if (formaPagamento === "Dinheiro/Pix") {
        dvCt.style.display = "flex"; // Exibir
    } else {
        dvCt.style.display = "none"; // Esconder
    }
}


function atualizarParcelas(parcelamento, total) {
    let duplicatasDiv = document.getElementById("duplicatas");
    let parcelasParagrafo = document.getElementById("parcelas");

    // Limpa o conteúdo anterior
    duplicatasDiv.innerHTML = "";
    parcelasParagrafo.innerHTML = "";  // Limpa o parágrafo de parcelas

    let valorParcela = (total / parcelamento).toFixed(2);

    // Atualiza o parágrafo para mostrar o texto com as parcelas
    parcelasParagrafo.textContent = `Parcelas: ${parcelamento}x de R$ ${valorParcela}`;

    // Adiciona as duplicatas na div
    for (let i = 1; i <= parcelamento; i++) {
        let p = document.createElement("p");
        p.textContent = `Parcela ${i}: R$ ${valorParcela}`;
        duplicatasDiv.appendChild(p);
    }
}

// Função para atualizar o total dos produtos na tabela
function calcularTotalProdutos() {
    let produtos = document.querySelectorAll("#produtos-gastos tbody tr");
    let totalProdutos = 0;

    produtos.forEach(function (produto) {
        let quantidade = parseFloat(produto.querySelector(".quantidade").value) || 0;
        let valorUnitario = parseFloat(produto.querySelector(".valor").value) || 0;
        let totalProduto = quantidade * valorUnitario;

        produto.querySelector(".total-produto").value = totalProduto.toFixed(2);
        totalProdutos += totalProduto;
    });

    // Atualiza o subtotal com o total dos produtos
    document.getElementById("subtotal").value = totalProdutos.toFixed(2);
    calcularTotal();  // Recalcula o total geral com os produtos
}

// Função para adicionar mais produtos à tabela
function adicionarProduto() {
    let tabela = document.querySelector("#produtos-gastos tbody");
    let novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `
        <td><input type="text" class="produto" placeholder="Nome do Item"></td>
        <td><input type="number" class="quantidade" placeholder="Quantidade" oninput="calcularTotalProdutos()"></td>
        <td><input type="number" class="valor" placeholder="Valor Unitário" oninput="calcularTotalProdutos()"></td>
        <td><input type="text" class="total-produto" disabled></td>
        <td><button type="button" class="remover-produto" onclick="removerProduto(this)">❌</button></td>
    `;

    tabela.appendChild(novaLinha);
}

// Função para remover um produto da tabela
function removerProduto(botao) {
    let linha = botao.closest("tr");
    linha.remove();
    calcularTotalProdutos(); // Atualiza o total após remover o item
}


