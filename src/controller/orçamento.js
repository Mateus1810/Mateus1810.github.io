// Função para calcular o total dos itens e o valor final do orçamento
function calcularTotal() {
    let subtotal = 0;
    
    // Percorre todas as linhas da tabela de itens
    document.querySelectorAll("#itens-orcamento tbody tr").forEach(row => {
        let qtd = parseFloat(row.querySelector(".quantidade").value) || 0;
        let valor = parseFloat(row.querySelector(".valor").value) || 0;
        let total = qtd * valor;
        
        // Atualiza o valor total de cada item na tabela
        row.querySelector(".total-item").value = total.toFixed(2);
        subtotal += total;
    });

    // Aplica o desconto, se houver
    let desconto = parseFloat(document.getElementById("desconto").value) || 0;
    let total = subtotal - desconto;
    
    // Verifica a forma de pagamento
    let formaPagamento = document.querySelector('input[name="forma-pagamento"]:checked').value;
    if (formaPagamento === "cartao") {
        total *= 1.0677; // Aplica a taxa de 6,77%
    }
    
    document.getElementById("subtotal").value = subtotal.toFixed(2);
    document.getElementById("total").value = total.toFixed(2);
}

// Função para adicionar um novo item na tabela
function adicionarItem() {
    let tabela = document.querySelector("#itens-orcamento tbody");
    let novaLinha = tabela.insertRow();
    novaLinha.innerHTML = `
        <td><input type="text" class="item" placeholder="Nome do Item"></td>
        <td><input type="number" class="quantidade" placeholder="Qtd" oninput="calcularTotal()"></td>
        <td><input type="number" class="valor" placeholder="Valor Unitário" oninput="calcularTotal()"></td>
        <td><input type="text" class="total-item" readonly></td>
    `;
}

// Adiciona o evento de cálculo de total sempre que o desconto ou forma de pagamento forem alterados
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("desconto").addEventListener("input", calcularTotal);
    document.querySelectorAll('input[name="forma-pagamento"]').forEach(input => {
        input.addEventListener("change", calcularTotal);
    });
});


// Função para adicionar um novo item na tabela
function adicionarItem() {
    let tabela = document.querySelector("#itens-orcamento tbody");
    let novaLinha = tabela.insertRow();
    novaLinha.innerHTML = `
        <td><input type="text" class="item" placeholder="Nome do Item"></td>
        <td><input type="number" class="quantidade" placeholder="Qtd" oninput="calcularTotal()"></td>
        <td><input type="number" class="valor" placeholder="Valor Unitário" oninput="calcularTotal()"></td>
        <td><input type="text" class="total-item" readonly></td>
    `;
}

// Função para gerar o PDF do orçamento
function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    


    // Título do orçamento
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Orçamento de Serviço", 105, 15, { align: "center" });

    // Informações do cliente e do serviço
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    let y = 30;
    doc.text(`Cliente: ${document.getElementById("nome").value}`, 20, y);
    y += 7;
    doc.text(`Telefone: ${document.getElementById("telefone").value}`, 20, y);
    y += 10;
    
    // Descrição do serviço
    doc.setFont("helvetica", "bold");
    doc.text("Descrição do Serviço", 20, y);
    doc.setFont("helvetica", "normal");
    y += 7;
    doc.text(document.getElementById("descricao").value, 20, y, { maxWidth: 170 });
    y += 15;
    
    // Tabela de itens
    let colunas = ["Item", "Quantidade", "Valor Unitário (R$)", "Total (R$)"];
    let linhas = [];
    
    // Preenche as linhas da tabela com os dados dos itens
    document.querySelectorAll("#itens-orcamento tbody tr").forEach(row => {
        let item = row.querySelector(".item").value;
        let qtd = row.querySelector(".quantidade").value;
        let valor = row.querySelector(".valor").value;
        let total = row.querySelector(".total-item").value;
        linhas.push([item, qtd, valor, total]);
    });
    
    // Adiciona a tabela ao PDF com estilo refinado
    doc.autoTable({
        head: [colunas],
        body: linhas,
        startY: y,
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] },
    });
    
    // Resumo financeiro
    let finalY = doc.autoTable.previous.finalY + 10;
    doc.setFont("helvetica", "bold");
    doc.text("Resumo Financeiro", 20, finalY);
    doc.setFont("helvetica", "normal");
    
    finalY += 7;
    doc.text(`Subtotal: R$ ${document.getElementById("subtotal").value}`, 20, finalY);
    finalY += 7;
    doc.text(`Desconto: R$ ${document.getElementById("desconto").value}`, 20, finalY);
    finalY += 7;
    doc.text(`Total: R$ ${document.getElementById("total").value}`, 20, finalY);
    
    // Salva o PDF com o nome especificado
    doc.save(`orçamento_${document.getElementById("nome").value}.pdf`);
}

// Adiciona o evento de cálculo de total sempre que o desconto for alterado
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("desconto").addEventListener("input", calcularTotal);
});
