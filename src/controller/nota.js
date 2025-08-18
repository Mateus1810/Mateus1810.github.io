function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Configurações de cores
    const primaryColor = [64, 64, 64];
    const secondaryColor = [128, 128, 128];
    const accentColor = [41, 128, 185];

    // Configurações de página
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const marginTop = 45; // Espaço reservado para cabeçalho
    const marginBottom = 15; // Espaço reservado para rodapé (reduzido de 25 para 15)
    const usableHeight = pageHeight - marginTop - marginBottom;

    let currentY = marginTop;

    // Função para adicionar cabeçalho
    function adicionarCabecalho() {
        const dataAtual = new Date().toLocaleString('pt-BR');

        const imgData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAH7AfsDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK+RfG3/AAU9+D3grxZf6H5eua39ilaCS/0q3hkt3YHB2FpVLDORnABxxkc1pf8ABRD9oX/hSfwRudL0y58rxP4nD2Frt+9DAR+/l+6QPlIQZxy+QcrX4uZLE5OSTkmgD9eP+Hsvwazj+yvF3/gDbf8AyRS/8PZPg1/0CvF3/gDbf/JNfkJ9KTn1oA/X3/h7H8Gu+leLh/24W/8A8kUn/D2T4Nf9Anxd/wCANt/8k1+QfPrRuPTNAH6+f8PZPg1/0CfF3/gDbf8AyTT7f/grB8Gp5FU6Z4tiDNgu9hb7R7ki4PFfkBupeCvNAH7p+EP26vgb40ura1s/H9jZ3c+AItUjltArYztZ5FCA/wDAq9ysb+21Szhu7K4hu7SZQ8U8Dh45FPQqw4I9xX83SyY9j65r1b4IftOfEP4A6olx4T1+4hs2fM+l3GZrS46fehY7QcDGVIb/AGhigD996K+e/wBkn9sbwz+1H4feOJF0XxjYxB9Q0N5N3yk486Bv+WkRPHqp4bsT9CUAFFFFAGb4l8RWPhHw7qeuanL5GnabbSXdzIFLFY0UsxAHJOAeB1r46X/grN8IPOlV9F8WCNWwjrZ25Le5BnGK9i/bk1yTw9+yf8Rr2IZf7DHBj1Ek8cZH5Oa/Cbd8xwM8+tAH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ABXy9+2b+xdN+1hdeGp4fFcXh0aRHPE8M2nm6WYSFeciRMEbSMc5z1GK+oaKAPgHwj/wTn+LPw/0dNI8M/tHapoOkoxdbLTbS7t4VY9SEW8xk19Cfs0/ATx98Gb7W5vGXxZ1X4kxX8cawQ6j55W1ZSSSnmzy4yDg4xnA9K96ooAK8O/aw/Zft/2pPBen6JL4mvfDM9hcm5hmt4VuIZCVwVlhYgOPTkEV7jRQB+f3hL9kX9q7wD9p0PRfjpp6eGpl8gXFw13czww9AIYpSRCwB48t1xive/2Wf2N9A/ZrW/1NtSm8UeLtRz9r1q7j2MQTkqi5O1c+5r6GooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//2Q=='; // aqui vai o Base64 da sua logo ou o caminho
        doc.addImage(imgData, 'PNG', 155, 12, 30, 30);
        
        // Data e Hora no canto superior direito
        doc.setFontSize(9);
        doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        doc.text(`Emitido em: ${dataAtual}`, 200, 8, { align: 'right' });

        // Cabeçalho da empresa
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(24);
        doc.text("DIGITAL DRIFT", 10, 25);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        doc.text("Assistência Técnica Especializada", 10, 32);
        
        doc.setFontSize(9);
        doc.text("(33) 98402-4108  |  R. Raimundo Marins, 20 - Manhuaçu/MG", 10, 38);

        // Linha separadora
        doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
        doc.setLineWidth(2);
        doc.line(10, 42, 200, 42);
    }

    // Função para adicionar rodapé
    function adicionarRodape() {
        const yPosition = doc.internal.pageSize.height - 15; // Reduzido de 20 para 15
        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.5);
        doc.line(10, yPosition - 3, 200, yPosition - 3); // Reduzido de 5 para 3
        
        doc.setFontSize(8);
        doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        doc.text("Digital Drift - Assistência Técnica Especializada", 105, yPosition, { align: 'center' });
        doc.text("Este documento comprova a prestação dos serviços descritos acima", 105, yPosition + 3, { align: 'center' }); // Reduzido de 4 para 3
    }

    // Função para verificar se precisa de nova página
    function verificarNovaPagina(alturaConteudo) {
        if (currentY + alturaConteudo > pageHeight - marginBottom) {
            adicionarRodape();
            doc.addPage();
            adicionarCabecalho();
            currentY = marginTop;
            return true;
        }
        return false;
    }

    // Função para pegar valores sem erro
    function getValue(id) {
        const element = document.getElementById(id);
        return element ? element.value : "";
    }

    // Inicializar primeira página
    adicionarCabecalho();
    
    const pagamento = getValue('forma-pagamento');

    // Título do documento
    verificarNovaPagina(15);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("NOTA DE SERVIÇO", 105, currentY + 10, { align: 'center' });
    currentY += 20;

    // Informações do Cliente em caixa
    verificarNovaPagina(30);
    doc.setFillColor(248, 249, 250);
    doc.setDrawColor(220, 220, 220);
    doc.rect(10, currentY, 190, 25, 'FD');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("DADOS DO CLIENTE", 15, currentY + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Nome: ${getValue('nome')} ${getValue('sobrenome')}`, 15, currentY + 15);
    doc.text(`Telefone: ${getValue('telefone')}`, 15, currentY + 21);

    // Forma de pagamento destacada
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text("Forma de Pagamento:", 110, currentY + 15);

    // Caixa para forma de pagamento
    doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.setTextColor(255, 255, 255);
    const pagamentoWidth = doc.getTextWidth(pagamento) + 8;
    doc.rect(110, currentY + 17, pagamentoWidth, 6, 'F');
    doc.text(pagamento, 114, currentY + 21);

    currentY += 30;

    // QR Code do PIX (se for pagamento Dinheiro/Pix)
    if (pagamento === "Dinheiro/Pix") {
        const canvas = document.getElementById("qrcode");
        if (canvas) {
            verificarNovaPagina(40);
            const imgqr = canvas.toDataURL("image/png");
            doc.addImage(imgqr, "PNG", 15, currentY, 30, 30);
            
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
            doc.text("PAGUE COM PIX", 30, currentY + 35, { align: 'center' });
            currentY += 45;
        }
    }

    // Voltar para cores normais
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);

    // Tabela de Detalhes do Serviço
    const detalhes = [
        ["Descrição do Problema", getValue('entrada')],
        ["Condições do Aparelho", getValue('condicao')],
        ["Serviço Realizado", getValue('servico')],
    ];

    // Estimar altura da tabela (aproximadamente 8px por linha + cabeçalho) - mais preciso
    const alturaEstimadaDetalhes = (detalhes.length + 1) * 8 + 5;
    verificarNovaPagina(alturaEstimadaDetalhes);

    doc.autoTable({
        startY: currentY,
        head: [["Categoria", "Detalhes"]],
        body: detalhes,
        theme: 'striped',
        headStyles: { 
            fillColor: primaryColor, 
            textColor: 'white',
            fontSize: 11,
            fontStyle: 'bold'
        },
        bodyStyles: {
            fontSize: 10
        },
        columnStyles: { 
            0: { 
                fontStyle: 'bold', 
                cellWidth: 60,
                fillColor: [248, 249, 250]
            }, 
            1: { 
                cellWidth: 122 
            } 
        },
        alternateRowStyles: {
            fillColor: [255, 255, 255]
        },
        didDrawPage: function(data) {
            // Se a tabela foi para uma nova página, adicionar cabeçalho
            if (data.pageNumber > 1) {
                adicionarCabecalho();
            }
        }
    });

    currentY = doc.autoTable.previous.finalY + 10;

    // Tabela de Produtos Gastos
    const produtosGastos = [];
    const linhas = document.querySelectorAll('#produtos-gastos tbody tr');
    linhas.forEach(linha => {
        const produto = linha.querySelector('.produto')?.value;
        const quantidade = parseFloat(linha.querySelector('.quantidade')?.value) || 0;
        const valor = parseFloat(linha.querySelector('.valor')?.value) || 0;
        const totalProduto = quantidade * valor;

        if (produto && quantidade > 0 && valor > 0) {
            produtosGastos.push([
                produto, 
                quantidade.toString(), 
                `R$ ${valor.toFixed(2)}`, 
                `R$ ${totalProduto.toFixed(2)}`
            ]);
        }
    });

    if (produtosGastos.length > 0) {
        const alturaEstimadaProdutos = (produtosGastos.length + 1) * 8 + 10; // Mais preciso
        
        if (currentY + alturaEstimadaProdutos > pageHeight - marginBottom) {
            adicionarRodape();
            doc.addPage();
            adicionarCabecalho();
            currentY = marginTop;
        }

        doc.autoTable({
            startY: currentY,
            head: [["Item Utilizado", "Qtd", "Valor Unitário", "Total"]],
            body: produtosGastos,
            theme: 'grid',
            headStyles: { 
                fillColor: primaryColor, 
                textColor: 'white',
                fontSize: 11,
                fontStyle: 'bold'
            },
            bodyStyles: {
                fontSize: 10
            },
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 80 },
                1: { halign: 'center', cellWidth: 25 },
                2: { halign: 'right', cellWidth: 35 },
                3: { halign: 'right', cellWidth: 42, fontStyle: 'bold' }
            },
            footStyles: {
                fillColor: [248, 249, 250],
                textColor: primaryColor
            },
            didDrawPage: function(data) {
                if (data.pageNumber > 1) {
                    adicionarCabecalho();
                }
            }
        });

        currentY = doc.autoTable.previous.finalY + 10;
    }

    // Cálculos para valores
    const subtotalPDF = parseFloat(getValue('subtotal')) || 0;
    const descontosPDF = parseFloat(getValue('descontos')) || 0;
    const outrosPDF = parseFloat(getValue('outros')) || 0;
    const totalPDF = parseFloat(getValue('total')) || 0;
    
    const subtotalSemTaxa = subtotalPDF - descontosPDF + outrosPDF;
    const valorTaxa = totalPDF - subtotalSemTaxa;
    
    // Tabela de Valores com layout melhorado
    const valores = [
        ["Subtotal dos Serviços", `R$ ${subtotalPDF.toFixed(2)}`]
    ];
    
    if (descontosPDF > 0) {
        valores.push(["(-) Descontos Aplicados", `R$ ${descontosPDF.toFixed(2)}`]);
    }
    
    if (outrosPDF > 0) {
        valores.push(["(+) Outros Serviços", `R$ ${outrosPDF.toFixed(2)}`]);
    }
    
    if (valorTaxa > 0) {
        valores.push(["(+) Taxa Cartão (6,77%)", `R$ ${valorTaxa.toFixed(2)}`]);
    }

    // Estimar altura da tabela de valores + total final (mais preciso)
    const alturaEstimadaValores = (valores.length + 2) * 10 + 15;
    
    if (currentY + alturaEstimadaValores > pageHeight - marginBottom) {
        adicionarRodape();
        doc.addPage();
        adicionarCabecalho();
        currentY = marginTop;
    }

    doc.autoTable({
        startY: currentY,
        head: [["Descrição", "Valor"]],
        body: valores,
        theme: 'plain',
        headStyles: { 
            fillColor: primaryColor, 
            textColor: 'white',
            fontSize: 11,
            fontStyle: 'bold'
        },
        bodyStyles: {
            fontSize: 10
        },
        columnStyles: { 
            0: { fontStyle: 'normal', cellWidth: 120 }, 
            1: { halign: 'right', cellWidth: 62, fontStyle: 'bold' }
        },
        didDrawPage: function(data) {
            if (data.pageNumber > 1) {
                adicionarCabecalho();
            }
        }
    });

    // Total final destacado
    doc.autoTable({
        startY: doc.autoTable.previous.finalY,
        body: [["VALOR TOTAL", `R$ ${totalPDF.toFixed(2)}`]],
        theme: 'plain',
        bodyStyles: {
            fontSize: 14,
            fontStyle: 'bold',
            fillColor: accentColor,
            textColor: 'white'
        },
        columnStyles: { 
            0: { cellWidth: 120 }, 
            1: { halign: 'right', cellWidth: 62 }
        }
    });

    currentY = doc.autoTable.previous.finalY + 10;

    // Tabela de Parcelas se houver parcelamento
    const numParcelas = parseInt(getValue("parcelamento")) || 1;
    if (numParcelas > 1) {
        const valorParcela = (totalPDF / numParcelas).toFixed(2);
        let duplicatas = [];
        for (let i = 1; i <= numParcelas; i++) {
            duplicatas.push([`${i}ª Parcela`, `R$ ${valorParcela}`]);
        }

        const alturaEstimadaParcelas = (duplicatas.length + 1) * 8 + 10; // Mais preciso
        
        if (currentY + alturaEstimadaParcelas > pageHeight - marginBottom) {
            adicionarRodape();
            doc.addPage();
            adicionarCabecalho();
            currentY = marginTop;
        }

        doc.autoTable({
            startY: currentY,
            head: [["Parcelamento", "Valor"]],
            body: duplicatas,
            theme: 'striped',
            headStyles: { 
                fillColor: secondaryColor, 
                textColor: 'white',
                fontSize: 11,
                fontStyle: 'bold'
            },
            bodyStyles: {
                fontSize: 10
            },
            columnStyles: { 
                0: { fontStyle: 'bold', cellWidth: 60 }, 
                1: { halign: 'right', cellWidth: 40 }
            },
            didDrawPage: function(data) {
                if (data.pageNumber > 1) {
                    adicionarCabecalho();
                }
            }
        });
    }

    // Adicionar rodapé na última página da nota de serviço
    adicionarRodape();

    // Adicionando página da Declaração de Garantia (mantida como estava)
    doc.addPage();

    // Cores tons de cinza
    const primaryColorGarantia = [90, 90, 90];
    const accentColorGarantia = [90, 90, 90];
    const textColorGarantia = [15, 15, 15];
    const boxColorGarantia = [245, 245, 245];

    // Cabeçalho
    doc.setFillColor(primaryColorGarantia[0], primaryColorGarantia[1], primaryColorGarantia[2]);
    doc.rect(0, 0, 210, 38, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text("DECLARAÇÃO DE GARANTIA", 105, 23, { align: "center" });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text("CERTIFICADO DE GARANTIA DIGITAL DRIFT", 105, 33, { align: "center" });

    // Reset cor do texto
    doc.setTextColor(textColorGarantia[0], textColorGarantia[1], textColorGarantia[2]);

    // Caixa GARANTIA ASSEGURADA
    doc.setFillColor(boxColorGarantia[0], boxColorGarantia[1], boxColorGarantia[2]);
    doc.rect(10, 50, 190, 35, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text("GARANTIA ASSEGURADA", 15, 63);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text("Serviços prestados e peças substituídas neste documento possuem cobertura integral", 15, 70);
    doc.text("conforme os termos estabelecidos abaixo.", 15, 77);

    // Linha separadora
    doc.setDrawColor(accentColorGarantia[0], accentColorGarantia[1], accentColorGarantia[2]);
    doc.setLineWidth(0.5);
    doc.line(10, 90, 200, 90);

    // TERMOS DA GARANTIA
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text("TERMOS DA GARANTIA", 10, 95);

    // Box Cobertura
    doc.setFillColor(boxColorGarantia[0], boxColorGarantia[1], boxColorGarantia[2]);
    doc.rect(10, 100, 90, 40, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text("COBERTURA", 15, 112);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text("• Defeitos de serviço inadequado", 15, 120);
    doc.text("• Peças com defeito de fabricação", 15, 127);
    doc.text("• Mão de obra dos reparos", 15, 134);

    // Box Prazo
    doc.setFillColor(boxColorGarantia[0], boxColorGarantia[1], boxColorGarantia[2]);
    doc.rect(110, 100, 90, 40, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text("PRAZO", 115, 112);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text("90 dias corridos a partir", 115, 120);
    doc.text("da data do serviço", 115, 127);
    doc.text("realizado", 115, 134);

    // Box Exclusões
    doc.setFillColor(boxColorGarantia[0], boxColorGarantia[1], boxColorGarantia[2]);
    doc.rect(10, 145, 190, 30, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text("NÃO COBERTO PELA GARANTIA", 15, 157);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text("Mau uso • Danos acidentais • Intervenção de terceiros • Desgaste natural • Danos elétricos", 15, 165);

    // Box Acionamento
    doc.setFillColor(boxColorGarantia[0], boxColorGarantia[1], boxColorGarantia[2]);
    doc.rect(10, 180, 190, 25, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text("PARA ACIONAR A GARANTIA", 15, 192);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text("Apresentar nota original e equipamento nas mesmas condições da entrega", 15, 199);

    // Linha separadora antes assinatura
    doc.setDrawColor(accentColorGarantia[0], accentColorGarantia[1], accentColorGarantia[2]);
    doc.setLineWidth(0.5);
    doc.line(10, 210, 200, 210);

    // Área de assinatura
    doc.setFillColor(boxColorGarantia[0], boxColorGarantia[1], boxColorGarantia[2]);
    doc.rect(10, 215, 190, 35, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text("ACEITE E ASSINATURAS", 15, 227);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text("Cliente: _____________________", 15, 237);
    doc.text("Responsável: ____________________", 110, 237);
    doc.setFontSize(9);
    const dataAtual = new Date().toLocaleString('pt-BR');
    doc.text(`Data: ${dataAtual}`, 15, 245);
    doc.text(`Data: ${dataAtual}`, 110, 245);

    // Rodapé minimalista
    doc.setFillColor(primaryColorGarantia[0], primaryColorGarantia[1], primaryColorGarantia[2]);
    doc.rect(0, 255, 210, 42, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text("DIGITAL DRIFT", 105, 267, { align: "center" });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text("ASSISTÊNCIA TÉCNICA ESPECIALIZADA", 105, 276, { align: "center" });

    doc.setFontSize(9);
    doc.text("(33) 98402-4108  |  R. Raimundo Marins, 20 - Manhuaçu/MG", 105, 284, { align: "center" });

    // Código de verificação
    doc.setFontSize(8);
    doc.text(`Código: DD${Date.now().toString().slice(-8)}`, 15, 292);
    doc.text(`Data/Hora: ${new Date().toLocaleString('pt-BR')}`, 150, 292);

    // Salvando PDF
    doc.save(`Nota_Servico_${getValue('nome')}.pdf`);
}

// Funções auxiliares mantidas inalteradas
function calcularTotal() {
    let subtotal = parseFloat(document.getElementById("subtotal").value) || 0;
    let descontos = parseFloat(document.getElementById("descontos").value) || 0;
    let outros = parseFloat(document.getElementById("outros").value) || 0;
    let formaPagamento = document.getElementById("forma-pagamento").value;
    let parcelamento = document.getElementById("parcelamento").value;
    let totalInput = document.getElementById("total");
    let pixInput = document.getElementById("in_value");
    let dvCt = document.querySelector(".dv_ct");

    let taxa = 0;
    let taxaTexto = "";

    if (formaPagamento === "Cartão") {
        taxa = 6.77;
        taxaTexto = "6,77%";
    } else if (formaPagamento === "Dinheiro/Pix") {
        taxaTexto = "0,00%";
    } else {
        taxaTexto = "0,00%";
    }

    document.getElementById("taxa-maquina").textContent = taxaTexto;

    let totalComTaxa = subtotal - descontos + outros;
    
    if (formaPagamento === "Cartão") {
        totalComTaxa += totalComTaxa * (taxa / 100);
    }

    totalInput.value = totalComTaxa.toFixed(2);
    if (pixInput) pixInput.value = totalInput.value;

    atualizarParcelas(parseInt(parcelamento), totalComTaxa);

    if (dvCt) {
        if (formaPagamento === "Dinheiro/Pix") {
            dvCt.style.display = "flex";
        } else {
            dvCt.style.display = "none";
        }
    }
}

function atualizarParcelas(parcelamento, total) {
    let duplicatasDiv = document.getElementById("duplicatas");
    let parcelasParagrafo = document.getElementById("parcelas");

    if (duplicatasDiv) duplicatasDiv.innerHTML = "";
    if (parcelasParagrafo) parcelasParagrafo.innerHTML = "";

    let valorParcela = (total / parcelamento).toFixed(2);

    if (parcelasParagrafo) {
        parcelasParagrafo.textContent = `Parcelas: ${parcelamento}x de R$ ${valorParcela}`;
    }

    if (duplicatasDiv) {
        for (let i = 1; i <= parcelamento; i++) {
            let p = document.createElement("p");
            p.textContent = `Parcela ${i}: R$ ${valorParcela}`;
            duplicatasDiv.appendChild(p);
        }
    }
}

function calcularTotalProdutos() {
    let produtos = document.querySelectorAll("#produtos-gastos tbody tr");
    let totalProdutos = 0;

    produtos.forEach(function (produto) {
        let quantidade = parseFloat(produto.querySelector(".quantidade")?.value) || 0;
        let valorUnitario = parseFloat(produto.querySelector(".valor")?.value) || 0;
        let totalProduto = quantidade * valorUnitario;

        let totalProdutoInput = produto.querySelector(".total-produto");
        if (totalProdutoInput) {
            totalProdutoInput.value = totalProduto.toFixed(2);
        }
        totalProdutos += totalProduto;
    });

    let subtotalInput = document.getElementById("subtotal");
    if (subtotalInput) {
        subtotalInput.value = totalProdutos.toFixed(2);
    }
    calcularTotal();
}

function adicionarProduto() {
    let tabela = document.querySelector("#produtos-gastos tbody");
    if (!tabela) return;
    
    let novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `
        <td><input type="text" class="produto" placeholder="Nome do Item"></td>
        <td><input type="number" class="quantidade" placeholder="Quantidade" oninput="calcularTotalProdutos()"></td>
        <td><input type="number" class="valor" placeholder="Valor Unitário" oninput="calcularTotalProdutos()"></td>
        <td><input type="text" class="total-produto" disabled></td>
        <td><button type="button" class="remover-produto" onclick="removerProduto(this)">Remover</button></td>
    `;

    tabela.appendChild(novaLinha);
}

function removerProduto(botao) {
    let linha = botao.closest("tr");
    if (linha) {
        linha.remove();
        calcularTotalProdutos();
    }
}