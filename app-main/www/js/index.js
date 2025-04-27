fetch('js/backend.json')
    .then(response => response.json())
    .then(data => {
        // Salva os dados no localStorage
        localStorage.setItem('produtos', JSON.stringify(data));
        console.log('Dados dos produtos salvos no localStorage');

        // Renderiza os produtos
        $("#produtos").empty();
        setTimeout(() => {
            data.forEach(produto => {
                var produtoHTML = `
                    <div class="item-card">
                        <a data-id="${produto.id}" href="#" class="item">
                            <div class="img-container">
                                <img class="img-fluid" src="${produto.imagem}">
                            </div>
                            <div class="nome-rating">
                                <span class="color-grey">${produto.nome}</span>
                                <span class="bold margin-right">
                                    <i class="mdi mdi-star"></i>
                                    ${produto.rating}
                                </span>
                            </div>
                            <div class="price">${produto.preco_promocional.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</div>
                        </a>
                        <!-- Botão de favoritar removido -->
                    </div>
                `;
                $("#produtos").append(produtoHTML);
            });

            // Adiciona evento de clique para os produtos
            $(".item").on('click', function() {
                var id = $(this).attr('data-id');
                localStorage.setItem('detalhe', id);
                app.views.main.router.navigate('/detalhes/');
            });

        }, 1500);
    })
    .catch(error => console.error('Erro ao fazer fetch dos dados: ' + error));

// Atualiza o ícone do carrinho
setTimeout(() => {
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    $('.btn-cart').attr('data-count', carrinho.length);
}, 300);

// Função para favoritar/desfavoritar um produto
function favoritarProduto(id) {
    var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    var produto = produtos.find(function(p) {
        return p.id == id;
    });

    var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    var index = favoritos.findIndex(function(p) {
        return p.id == id;
    });

    if (index === -1) {
        // Adiciona aos favoritos
        favoritos.push(produto);
        app.toast.create({
            text: 'Produto adicionado aos favoritos!',
            position: 'center',
            closeTimeout: 2000,
        }).open();
    } else {
        // Remove dos favoritos
        favoritos.splice(index, 1);
        app.toast.create({
            text: 'Produto removido dos favoritos!',
            position: 'center',
            closeTimeout: 2000,
        }).open();
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    atualizarIconeFavoritos();
}

// Atualiza o ícone de favoritos na barra inferior
function atualizarIconeFavoritos() {
    var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    $(".tab-link[href='/favoritos/'] .ri-heart-3-line").attr('data-count', favoritos.length);
}

// Atualiza o ícone de favoritos ao carregar a página
atualizarIconeFavoritos();
