var localCarrinho = localStorage.getItem('carrinho');

if (localCarrinho) {
    var carrinho = JSON.parse(localCarrinho);
    if (carrinho.length > 0) {
        renderizarCarrinho();
        calcularTotais();
    } else {
        carrinhoVazio();
    }
} else {
    carrinhoVazio();
}

// Função para calcular frete dos Correios
async function calcularFrete(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (data.erro) {
            app.toast.create({
                text: 'CEP não encontrado',
                position: 'center',
                closeTimeout: 2000,
            }).open();
            return;
        }

        // Simulação dos valores de frete (já que a API dos Correios é paga)
        const fretes = {
            'PAC': {
                prazo: '7 dias úteis',
                valor: 25.50
            },
            'SEDEX': {
                prazo: '2 dias úteis',
                valor: 45.90
            }
        };

        atualizarOpcoesFrete(fretes);
        
    } catch (error) {
        console.error('Erro ao calcular frete:', error);
        app.toast.create({
            text: 'Erro ao calcular o frete',
            position: 'center',
            closeTimeout: 2000,
        }).open();
    }
}

function atualizarOpcoesFrete(fretes) {
    const opcoesFreteHTML = `
        <div class="opcoes-frete margin-top">
            <h4>Opções de Frete</h4>
            <div class="list">
                <ul>
                    <li>
                        <label class="item-radio item-content">
                            <input type="radio" name="frete" value="${fretes.PAC.valor}" checked/>
                            <i class="icon icon-radio"></i>
                            <div class="item-inner">
                                <div class="item-title">PAC - ${fretes.PAC.prazo}</div>
                                <div class="item-after">${fretes.PAC.valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</div>
                            </div>
                        </label>
                    </li>
                    <li>
                        <label class="item-radio item-content">
                            <input type="radio" name="frete" value="${fretes.SEDEX.valor}"/>
                            <i class="icon icon-radio"></i>
                            <div class="item-inner">
                                <div class="item-title">SEDEX - ${fretes.SEDEX.prazo}</div>
                                <div class="item-after">${fretes.SEDEX.valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</div>
                            </div>
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    `;

    $('#opcoes-frete').html(opcoesFreteHTML);
    
    // Adiciona evento para atualizar o total quando mudar a opção de frete
    $('input[name="frete"]').on('change', function() {
        const valorFrete = parseFloat($(this).val());
        calcularTotais(valorFrete);
    });

    // Calcula totais com o primeiro valor de frete
    calcularTotais(fretes.PAC.valor);
}

function renderizarCarrinho() {
    $("#listaCarrinho").empty();
    $.each(carrinho, function(index, itemCarrinho) { 
        var itemDiv = `
            <div class="item-carrinho" data-index="${index}">
                <div class="area-img">
                    <img src="${itemCarrinho.item.imagem}">
                </div>
                <div class="area-details">
                    <div class="sup">
                        <span class="name-prod">
                            ${itemCarrinho.item.nome}
                        </span>
                        <a class="delete-item" href="#" data-index="${index}">
                            <i class="mdi mdi-close"></i>
                        </a>
                    </div>
                    <div class="middle">
                        <span>${itemCarrinho.item.principal_caracteristica}</span>
                    </div>
                    <div class="preco-quantidade">
                        <span>${itemCarrinho.item.preco_promocional.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
                        <div class="count">
                            <a class="minus" data-index="${index}" href="#">-</a>
                            <input readonly class="qtd-item" type="text" value="${itemCarrinho.quantidade}">
                            <a class="plus" data-index="${index}" href="#">+</a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $("#listaCarrinho").append(itemDiv);
    });

    // Adiciona campo de CEP após os itens do carrinho
    $("#listaCarrinho").append(`
        <div class="margin-top padding">
            <div class="list no-hairlines-md">
                <ul>
                    <li class="item-content item-input">
                        <div class="item-inner">
                            <div class="item-title item-label">Calcular Frete</div>
                            <div class="item-input-wrap">
                                <input type="text" placeholder="Digite seu CEP" id="cep"/>
                                <button class="button button-fill" onclick="calcularFrete(document.getElementById('cep').value)">Calcular</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div id="opcoes-frete"></div>
    `);

    // Eventos dos botões + e -
    $(".minus").on('click', function(e) {
        e.preventDefault();
        var index = $(this).data('index');
        if (carrinho[index].quantidade > 1) {
            carrinho[index].quantidade--;
            carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            renderizarCarrinho();
            calcularTotais();
        }
    });

    $(".plus").on('click', function(e) {
        e.preventDefault();
        var index = $(this).data('index');
        carrinho[index].quantidade++;
        carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        renderizarCarrinho();
        calcularTotais();
    });

    $(".delete-item").on('click', function(e) {
        e.preventDefault();
        var index = $(this).data('index');
        carrinho.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        renderizarCarrinho();
        calcularTotais();
        if (carrinho.length === 0) {
            carrinhoVazio();
        }
    });
}

function carrinhoVazio() {
    console.log('Carrinho está vazio');
    $("#listaCarrinho").empty();

    $('#toolbarTotais').addClass('display-none');
    $('#toolbarCheckout').addClass('display-none');

    $('#listaCarrinho').html(`
        <div class="text-align-center carrinho-vazio">
            <img width="300" src="img/empty.gif"></img>
            <br><span class="color-gray">Nada por enquanto...</span>
        </div>
    `);
}

function calcularTotais(valorFrete = 0) {
    var subtotal = carrinho.reduce((total, item) => total + item.total_item, 0);
    var total = subtotal + valorFrete;

    // Salva o valor total para usar na página de pagamento
    localStorage.setItem('valorTotal', total.toString());

    $('#totais').html(`
        <div class="bd-bottom margin-top bd-bottom w-80 display-flex justify-content-space-between">
            <span>Subtotal: </span>
            <span class="bold">${subtotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
        </div>
        <div class="w-80 display-flex justify-content-space-between">
            <span>Frete: </span>
            <span class="bold">${valorFrete.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
        </div>
        <div class="w-80 display-flex justify-content-space-between">
            <span>Total: </span>
            <span class="bold">${total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
        </div>
    `);

    $('#toolbarTotais').removeClass('display-none');
    $('#toolbarCheckout').removeClass('display-none');
}

$("#esvaziar").on('click', function() {
    app.dialog.confirm('Deseja realmente esvaziar o carrinho?', 'Esvaziar Carrinho', function() {
        localStorage.removeItem('carrinho');
        app.views.main.router.refreshPage();
    });
});

// Adiciona evento de clique no botão de compra
$(".add-cart").on('click', function() {
    app.views.main.router.navigate('/pagamento/');
});