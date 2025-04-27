// Recupera o valor total do localStorage
let valorTotal = localStorage.getItem('valorTotal');
if (!valorTotal) {
    valorTotal = "0.00";
}

// Função para mostrar opção PIX
function mostrarPix() {
    document.getElementById('pixArea').classList.remove('display-none');
    document.getElementById('boletoArea').classList.add('display-none');
    document.getElementById('valorPix').textContent = 
        parseFloat(valorTotal).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    
    // Gera o QR Code
    const chavePix = "47306603825";
    const qr = qrcode(0, 'M');
    qr.addData(`00020126580014BR.GOV.BCB.PIX0114${chavePix}5204000053039865802BR5913Tinos Tech6009Sao Paulo62070503***6304${calcularHash()}`);
    qr.make();
    
    document.getElementById('qrcode').innerHTML = qr.createImgTag(6);
}

// Função para copiar chave PIX
function copiarChavePix() {
    const chavePix = document.getElementById('chavePix').textContent;
    navigator.clipboard.writeText(chavePix).then(() => {
        app.toast.create({
            text: 'Chave PIX copiada!',
            position: 'center',
            closeTimeout: 2000,
        }).open();
    });
}

// Função para gerar boleto
function gerarBoleto() {
    document.getElementById('boletoArea').classList.remove('display-none');
    document.getElementById('pixArea').classList.add('display-none');
    document.getElementById('valorBoleto').textContent = 
        parseFloat(valorTotal).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
}

// Função para baixar boleto
function baixarBoleto() {
    app.toast.create({
        text: 'Boleto gerado! Verifique seu e-mail.',
        position: 'center',
        closeTimeout: 2000,
    }).open();
}

// Função auxiliar para calcular hash do PIX (simulação)
function calcularHash() {
    return Math.random().toString(36).substring(2, 15);
}