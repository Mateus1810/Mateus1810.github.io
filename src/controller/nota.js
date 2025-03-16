function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text("Digital Drift", 105, 18, null, null, 'center');
    doc.setFontSize(14);                     // Define o tamanho da fonte
    doc.setTextColor(128, 128, 128);             // Define a cor do texto para verde (RGB: 0, 128, 0)
    doc.text("Nota de Serviço", 105, 24, null, null, 'center');
    doc.setTextColor(0, 0, 0);
    // Informações do Cliente
    doc.setFontSize(12);
    doc.text(`Cliente: ${document.getElementById('nome').value} ${document.getElementById('sobrenome').value}`, 10, 30);
    doc.text(`Telefone: ${document.getElementById('telefone').value}`, 10, 40);

    // Tabela de Detalhes do Serviço
    const detalhes = [
        ["Descrição do Problema", document.getElementById('entrada').value],
        ["Condições do Aparelho", document.getElementById('condicao').value],
        ["Serviço Realizado", document.getElementById('servico').value],
    ];

    doc.autoTable({
        startY: 50,
        head: [["Categoria", "Detalhes"]],
        body: detalhes,
        theme: 'striped',
        headStyles: { fillColor: '#808080', textColor: 'white' },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 }, 1: { cellWidth: 130 } }
    });

    // Tabela de Produtos Gastos
    const produtosGastos = [];
    const linhas = document.querySelectorAll('#produtos-gastos tbody tr');
    linhas.forEach(linha => {
        const produto = linha.querySelector('.produto').value;
        const quantidade = parseFloat(linha.querySelector('.quantidade').value) || 0;
        const valor = parseFloat(linha.querySelector('.valor').value) || 0;
        const totalProduto = quantidade * valor;

        if (produto && quantidade > 0 && valor > 0) {
            produtosGastos.push([produto, quantidade, `R$ ${valor.toFixed(2)}`, `R$ ${totalProduto.toFixed(2)}`]);
        }
    });

    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 10,
        head: [["Item", "Quantidade", "Valor Unitário", "Total"]],
        body: produtosGastos,
        theme: 'grid',
        headStyles: { fillColor: '#808080', textColor: 'white' },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 }, 1: { halign: 'center' }, 2: { halign: 'right' }, 3: { halign: 'right' } }
    });

    // Tabela de Valores
    const valores = [
        ["Subtotal", `R$ ${document.getElementById('subtotal').value}`],
        ["Descontos", `R$ ${document.getElementById('descontos').value}`],
        ["Outros Serviços", `R$ ${document.getElementById('outros').value}`],
        ["Total", `R$ ${document.getElementById('total').value}`]
    ];

    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 10,
        head: [["Descrição", "Valor"]],
        body: valores,
        theme: 'grid',
        headStyles: { fillColor: '#808080', textColor: 'white' },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 80 }, 1: { halign: 'right' } }
    });
    
    const pageHeight = doc.internal.pageSize.height; // Altura da página
    const footerY = pageHeight - 30; // Ajustando o rodapé (20 é a altura do retângulo)

    doc.setDrawColor(0); // Cor da borda
    doc.setLineWidth(0.5); // Espessura da linha
    doc.rect(10, footerY, 180, 20); // Retângulo no rodapé
    doc.text("Assinatura do Cliente", 12, footerY + 15); // Texto indicando o local de assinatura

    // Salvando PDF
    doc.save(`Nota_${document.getElementById('nome').value}.pdf`);
}

function calcularTotal() {
    // Obtendo os valores dos campos
    const subtotal = parseFloat(document.getElementById('subtotal').value) || 0;
    const descontos = parseFloat(document.getElementById('descontos').value) || 0;
    const outros = parseFloat(document.getElementById('outros').value) || 0;

    // Calculando o total
    const total = subtotal - descontos + outros;

    // Atualizando o campo "total"
    document.getElementById('total').value = total.toFixed(2);
}

function calcularTotalProdutos() {
    let totalProdutos = 0;

    // Iterando sobre todas as linhas da tabela de produtos gastos
    const linhas = document.querySelectorAll('#produtos-gastos tbody tr');
    linhas.forEach(linha => {
        const quantidade = parseFloat(linha.querySelector('.quantidade').value) || 0;
        const valor = parseFloat(linha.querySelector('.valor').value) || 0;
        const totalProduto = quantidade * valor;

        // Atualizando o campo "Total" do produto
        linha.querySelector('.total-produto').value = totalProduto.toFixed(2);

        // Somando o valor total dos produtos
        totalProdutos += totalProduto;
    });

    // Atualizando o campo "Subtotal" com o total dos produtos
    document.getElementById('subtotal').value = totalProdutos.toFixed(2);

    // Atualizando o total geral
    calcularTotal();
}

function adicionarProduto() {
    const tabelaProdutos = document.getElementById('produtos-gastos').getElementsByTagName('tbody')[0];

    // Criação de uma nova linha
    const novaLinha = tabelaProdutos.insertRow();

    // Criação das células para a nova linha
    const celulaProduto = novaLinha.insertCell(0);
    const celulaQuantidade = novaLinha.insertCell(1);
    const celulaValor = novaLinha.insertCell(2);
    const celulaTotal = novaLinha.insertCell(3);

    // Adicionar inputs às células
    celulaProduto.innerHTML = '<input type="text" class="produto" placeholder="Nome do Produto">';
    celulaQuantidade.innerHTML = '<input type="number" class="quantidade" placeholder="Quantidade" oninput="calcularTotalProdutos()">';
    celulaValor.innerHTML = '<input type="number" class="valor" placeholder="Valor Unitário" oninput="calcularTotalProdutos()">';
    celulaTotal.innerHTML = '<input type="text" class="total-produto" readonly>';
}

function calcularTotalProdutos() {
    let totalProdutos = 0;
    const produtos = document.querySelectorAll('#produtos-gastos tbody tr');

    produtos.forEach((produto) => {
        const quantidade = parseFloat(produto.querySelector('.quantidade').value) || 0;
        const valorUnitario = parseFloat(produto.querySelector('.valor').value) || 0;

        // Calculando o total por produto
        const total = quantidade * valorUnitario;
        produto.querySelector('.total-produto').value = total.toFixed(2);

        // Somando ao total geral
        totalProdutos += total;
    });

    // Atualizando o subtotal com o total dos produtos
    document.getElementById('subtotal').value = totalProdutos.toFixed(2);

    // Atualizando o total geral
    calcularTotal();
}

