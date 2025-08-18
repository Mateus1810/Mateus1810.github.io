// Sistema de Orçamento - Digital Drift
// Versão otimizada para A4

// Configurações
const TAXA_CARTAO = 0.0677; // 6,77%

// Função para calcular o total dos itens e o valor final do orçamento
function calcularTotal() {
    let subtotal = 0;
    
    // Percorre todas as linhas da tabela de itens
    document.querySelectorAll("#itens-orcamento tbody tr").forEach(row => {
        const qtd = parseFloat(row.querySelector(".quantidade")?.value) || 0;
        const valor = parseFloat(row.querySelector(".valor")?.value) || 0;
        const total = qtd * valor;
        
        // Atualiza o valor total de cada item na tabela
        const campoTotal = row.querySelector(".total-item");
        if (campoTotal) {
            campoTotal.value = formatarValor(total);
        }
        subtotal += total;
    });

    // Aplica o desconto, se houver
    const desconto = parseFloat(document.getElementById("desconto")?.value) || 0;
    let totalVista = subtotal - desconto;
    let totalCartao = totalVista * (1 + TAXA_CARTAO);

    // Atualiza os campos
    const campoSubtotal = document.getElementById("subtotal");
    const campoTotal = document.getElementById("total");
    
    if (campoSubtotal) campoSubtotal.value = formatarValor(subtotal);
    if (campoTotal) campoTotal.value = formatarValor(totalVista);

    // Armazena o valor do cartão para uso no PDF
    window.totalCartao = totalCartao;
}

// Função para formatar valores monetários
function formatarValor(valor) {
    return valor.toFixed(2);
}

// Função para adicionar um novo item na tabela
function adicionarItem() {
    const tabela = document.querySelector("#itens-orcamento tbody");
    if (!tabela) return;
    
    const novaLinha = tabela.insertRow();
    novaLinha.innerHTML = `
        <td>
            <input type="text" class="item" placeholder="Nome do Item">
        </td>
        <td>
            <input type="number" class="quantidade" placeholder="Qtd" 
                   min="0" step="0.01" oninput="calcularTotal()">
        </td>
        <td>
            <input type="number" class="valor" placeholder="Valor Unitário" 
                   min="0" step="0.01" oninput="calcularTotal()">
        </td>
        <td>
            <input type="text" class="total-item" readonly>
        </td>
        <td>
            <button type="button" class="remover-item" onclick="removerItem(this)">
                Retirar Item
            </button>
        </td>
    `;
    
    // Foca no primeiro campo do novo item
    setTimeout(() => {
        novaLinha.querySelector(".item")?.focus();
    }, 50);
}

// Função para remover um item da tabela
function removerItem(button) {
    const linha = button?.closest("tr");
    if (linha) {
        linha.remove();
        calcularTotal();
    }
}

// Função para obter dados do cliente
function obterDadosCliente() {
    return {
        nome: document.getElementById("nome")?.value || "",
        telefone: document.getElementById("telefone")?.value || "",
        descricao: document.getElementById("descricao")?.value || "",
        validade: document.getElementById("validade")?.value || "30"
    };
}

// Função para obter dados dos itens
function obterItensOrcamento() {
    const itens = [];
    document.querySelectorAll("#itens-orcamento tbody tr").forEach(row => {
        const item = {
            nome: row.querySelector(".item")?.value || "",
            quantidade: row.querySelector(".quantidade")?.value || "0",
            valor: row.querySelector(".valor")?.value || "0.00",
            total: row.querySelector(".total-item")?.value || "0.00"
        };
        // Só adiciona se não estiver vazio
        if (item.nome.trim() || parseFloat(item.quantidade) > 0) {
            itens.push(item);
        }
    });
    return itens;
}

// Função para mostrar placeholder quando não há logo
function mostrarPlaceholderLogo(doc, pageWidth) {
    doc.setFillColor(200, 200, 200);
    doc.circle(pageWidth - 35, 22, 12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(70, 70, 70);
    doc.text("LOGO", pageWidth - 35, 25, { align: "center" });
}
function obterDadosFinanceiros() {
    return {
        subtotal: document.getElementById("subtotal")?.value || "0.00",
        desconto: document.getElementById("desconto")?.value || "0.00",
        total: document.getElementById("total")?.value || "0.00",
        totalCartao: formatarValor(window.totalCartao || 0)
    };
}

// Função para gerar o PDF do orçamento
function gerarPDF() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const dados = {
            cliente: obterDadosCliente(),
            itens: obterItensOrcamento(),
            financeiro: obterDadosFinanceiros()
        };

        // Constrói o PDF
        construirPDF(doc, dados);

        // Salva o PDF com nome do cliente
        const nomeCliente = dados.cliente.nome.trim() || 'Cliente';
        const nomeArquivo = `Orcamento_${nomeCliente.replace(/\s+/g, '_')}.pdf`;
        
        doc.save(nomeArquivo);

    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        alert('Erro ao gerar o PDF. Verifique se a biblioteca jsPDF está carregada.');
    }
}

// Função para construir o conteúdo do PDF (otimizada para A4)
function construirPDF(doc, dados) {
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    let y = 15; // Reduzido de 20 para 15

    // === CABEÇALHO COMPACTO ===
    doc.setFillColor(90, 90, 90);
    doc.rect(0, 0, pageWidth, 45, 'F'); // Reduzido de 55 para 45
    
    // Logo da empresa
    const logoBase64 = 'data:image/jpeg;base64,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'; // Função para pegar a logo
    
    if (logoBase64) {
        try {
            // Adiciona a logo (ajuste o formato: 'PNG', 'JPEG', etc.)
            doc.addImage(logoBase64, 'PNG', pageWidth - 50, 8, 30, 30);
        } catch (e) {
            console.warn('Erro ao adicionar logo:', e);
            // Fallback - placeholder se der erro
            mostrarPlaceholderLogo(doc, pageWidth);
        }
    } else {
        // Placeholder quando não há logo
        mostrarPlaceholderLogo(doc, pageWidth);
    }
    
    // Título principal (menor)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22); // Reduzido de 26
    doc.setTextColor(255, 255, 255);
    doc.text("ORÇAMENTO", 15, 25); // Reduzido margin
    
    // Subtítulo empresa
    doc.setFontSize(10); // Reduzido de 12
    doc.setFont("helvetica", "normal");
    doc.text("Digital Drift - Assistência Técnica", 15, 33);
    
    // Número do orçamento e data
    const numeroOrcamento = `#${Date.now().toString().slice(-6)}`;
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9); // Reduzido
    doc.text(`Orçamento: ${numeroOrcamento}`, 15, 40);
    doc.text(`Data: ${dataAtual}`, pageWidth - 50, 40);
    
    y = 55; // Reduzido de 75

    // === DADOS DO CLIENTE COMPACTO ===
    doc.setFillColor(245, 245, 245);
    doc.setDrawColor(120, 120, 120);
    doc.setLineWidth(0.5);
    doc.rect(15, y, pageWidth - 30, 28, 'FD'); // Reduzido altura e margens
    
    doc.setFillColor(120, 120, 120);
    doc.rect(15, y, pageWidth - 30, 3, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.text("DADOS DO CLIENTE", 18, y + 10);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9); // Reduzido
    doc.setTextColor(60, 60, 60);
    doc.text(`Cliente: ${dados.cliente.nome || 'Não informado'}`, 18, y + 18);
    doc.text(`Telefone: ${dados.cliente.telefone || 'Não informado'}`, 18, y + 24);
    
    y += 35;

    // === DESCRIÇÃO COMPACTA ===
    if (dados.cliente.descricao && dados.cliente.descricao.trim()) {
        const linhasDescricao = doc.splitTextToSize(dados.cliente.descricao, 160);
        // Limita a 3 linhas para economizar espaço
        const linhasLimitadas = linhasDescricao.slice(0, 3);
        const alturaDescricao = (linhasLimitadas.length * 5) + 15;
        
        doc.setFillColor(250, 250, 250);
        doc.setDrawColor(150, 150, 150);
        doc.setLineWidth(0.5);
        doc.rect(15, y, pageWidth - 30, alturaDescricao, 'FD');
        
        doc.setFillColor(150, 150, 150);
        doc.rect(15, y, pageWidth - 30, 3, 'F');
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(100, 100, 100);
        doc.text("DESCRIÇÃO", 18, y + 10);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        doc.text(linhasLimitadas, 18, y + 16);
        
        y += alturaDescricao + 8;
    }

    // === TABELA DE ITENS OTIMIZADA ===
    if (dados.itens.length > 0) {
        const colunas = ["Item/Serviço", "Qtd", "Valor Unit.", "Total"];
        const linhas = dados.itens.map(item => [
            item.nome.length > 30 ? item.nome.substring(0, 30) + '...' : item.nome,
            item.quantidade || '0',
            `R$ ${item.valor || '0,00'}`,
            `R$ ${item.total || '0,00'}`
        ]);

        doc.autoTable({
            head: [colunas],
            body: linhas,
            startY: y,
            theme: "grid",
            styles: {
                fontSize: 8, // Reduzido de 10
                cellPadding: 4, // Reduzido de 8
                halign: 'center',
                lineColor: [120, 120, 120],
                lineWidth: 0.3,
                textColor: [60, 60, 60],
            },
            headStyles: {
                fillColor: [120, 120, 120],
                textColor: [255, 255, 255],
                fontSize: 9,
                fontStyle: 'bold',
                halign: 'center',
            },
            columnStyles: {
                0: { halign: 'left', cellWidth: 70 }, // Reduzido
                1: { halign: 'center', cellWidth: 20 },
                2: { halign: 'right', cellWidth: 30 },
                3: { halign: 'right', cellWidth: 30, fontStyle: 'bold', fillColor: [245, 245, 245] }
            },
            alternateRowStyles: {
                fillColor: [248, 248, 248],
            },
            margin: { left: 15, right: 15 }, // Reduzido
        });
        
        y = doc.autoTable.previous.finalY + 10;
    }

    // === RESUMO FINANCEIRO COMPACTO ===
    doc.setFillColor(245, 245, 245);
    doc.setDrawColor(120, 120, 120);
    doc.setLineWidth(0.5);
    doc.rect(15, y, pageWidth - 30, 45, 'FD'); // Reduzido altura
    
    doc.setFillColor(120, 120, 120);
    doc.rect(15, y, pageWidth - 30, 3, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.text("RESUMO FINANCEIRO", 18, y + 10);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    
    let yResumo = y + 16;
    doc.text("Subtotal:", 18, yResumo);
    doc.text(`R$ ${dados.financeiro.subtotal}`, pageWidth - 18, yResumo, { align: "right" });
    
    if (parseFloat(dados.financeiro.desconto) > 0) {
        yResumo += 6;
        doc.text("Desconto:", 18, yResumo);
        doc.text(`R$ ${dados.financeiro.desconto}`, pageWidth - 18, yResumo, { align: "right" });
    }
    
    // Linha separadora
    yResumo += 4;
    doc.setDrawColor(120, 120, 120);
    doc.setLineWidth(0.5);
    doc.line(18, yResumo, pageWidth - 18, yResumo);
    
    // Totais
    yResumo += 8;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("À VISTA:", 18, yResumo);
    doc.text(`R$ ${dados.financeiro.total}`, pageWidth - 18, yResumo, { align: "right" });
    
    yResumo += 7;
    doc.text("NO CARTÃO:", 18, yResumo);
    doc.text(`R$ ${dados.financeiro.totalCartao}`, pageWidth - 18, yResumo, { align: "right" });
    
    y += 55;

    // === INFORMAÇÕES FINAIS COMPACTAS ===
    // Validade
    doc.setFillColor(250, 250, 250);
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(0.5);
    doc.rect(15, y, pageWidth - 30, 15, 'FD'); // Muito reduzido
    
    doc.setFillColor(180, 180, 180);
    doc.rect(15, y, 3, 15, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`VÁLIDO POR ${dados.cliente.validade || '30'} DIAS`, 20, y + 6);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(80, 80, 80);
    doc.text("Preços sujeitos a alteração.", 20, y + 11);
    
    y += 20;

    // === RODAPÉ COMPACTO ===
    const alturaRodape = 25; // Reduzido
    const yRodape = pageHeight - alturaRodape;
    
    doc.setFillColor(80, 80, 80);
    doc.rect(0, yRodape, pageWidth, alturaRodape, 'F');
    
    doc.setDrawColor(120, 120, 120);
    doc.setLineWidth(2);
    doc.line(0, yRodape, pageWidth, yRodape);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("Digital Drift - Assistência Técnica", 105, yRodape + 8, { align: "center" });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(220, 220, 220);
    doc.text("(33) 98402-4108  |  Rua Raimundo Martins, 20 - Manhuaçu/MG", 105, yRodape + 15, { align: "center" });
    
    doc.setFontSize(7);
    doc.setTextColor(180, 180, 180);
    doc.text(`Gerado em ${new Date().toLocaleString('pt-BR')}`, 105, yRodape + 21, { align: "center" });
}

// Função para limpar todos os campos
function limparFormulario() {
    const campos = ["nome", "telefone", "descricao", "desconto", "subtotal", "total"];
    campos.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) campo.value = "";
    });

    const campoValidade = document.getElementById("validade");
    if (campoValidade) campoValidade.value = "30";

    document.querySelectorAll('input[name="forma-pagamento"]').forEach(input => {
        input.checked = false;
    });

    const tbody = document.querySelector("#itens-orcamento tbody");
    if (tbody) {
        tbody.innerHTML = "";
        adicionarItem();
    }
    
    // Limpa variável global
    window.totalCartao = 0;
}

// Inicialização quando a página carregar
document.addEventListener("DOMContentLoaded", function() {
    const campoDesconto = document.getElementById("desconto");
    if (campoDesconto) {
        campoDesconto.addEventListener("input", calcularTotal);
    }

    document.querySelectorAll('input[name="forma-pagamento"]').forEach(input => {
        input.addEventListener("change", calcularTotal);
    });

    calcularTotal();

    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            gerarPDF();
        }
    });
});