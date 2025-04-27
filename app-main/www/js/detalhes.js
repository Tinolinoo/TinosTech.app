$(document).ready(function () {
    // Recupera o ID do produto salvo no localStorage
    var id = parseInt(localStorage.getItem('detalhe'));

    // Recupera a lista de produtos do localStorage
    var produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    // Encontra o produto com o ID correspondente
    var item = produtos.find(function (produto) {
        return produto.id === id;
    });

    // Se o produto for encontrado, exibe os detalhes
    if (item) {
        console.log('Produto encontrado: ', item);

        // Preenche os detalhes do produto na página
        $("#imagem-detalhe").attr('src', item.imagem);
        $("#nome-detalhe").html(item.nome);
        $("#rating-detalhe").html(item.rating);
        $("#like-detalhe").html(item.likes);
        $("#reviews-detalhe").html(item.reviews + ' reviews');
        $("#descricao-detalhe").html(item.descricao);
        $("#preco-detalhe").html(item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        $("#precopromo-detalhe").html(item.preco_promocional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

        // Preenche a tabela de detalhes
        var tabelaDetalhes = $("#tabDetalhes");
        item.detalhes.forEach(function (detalhe) {
            var linha = `
                <tr>
                    <td>${detalhe.caracteristica}</td>
                    <td>${detalhe.detalhes}</td>
                </tr>
            `;
            tabelaDetalhes.append(linha);
        });

        // Atualiza o estado do coração ao carregar a página
        atualizarEstadoFavorito(item.id);
    } else {
        console.log('Produto não encontrado');
    }

    // Função para adicionar ao carrinho
    function adicionarCarrinho(item, quantidade) {
        var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        var itemNoCarrinho = carrinho.find(function (c) {
            return c.item.id === item.id;
        });

        if (itemNoCarrinho) {
            itemNoCarrinho.quantidade += quantidade;
            itemNoCarrinho.total_item = itemNoCarrinho.quantidade * item.preco_promocional;
        } else {
            carrinho.push({
                item: item,
                quantidade: quantidade,
                total_item: quantidade * item.preco_promocional
            });
        }

        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

    // Evento de clique para adicionar ao carrinho
    $(".add-cart").on('click', function () {
        if (item) {
            adicionarCarrinho(item, 1);

            var toastCenter = app.toast.create({
                text: `${item.nome} adicionado ao carrinho`,
                position: 'center',
                closeTimeout: 2000,
            });

            toastCenter.open();
        } else {
            console.log('Item não encontrado para adicionar ao carrinho');
        }
    });

    // Função para favoritar/desfavoritar um produto
    function favoritarProduto(id) {
        var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        var index = favoritos.findIndex(function (p) {
            return p.id == id;
        });

        if (index === -1) {
            // Adiciona aos favoritos
            favoritos.push(item);
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
        console.log("Favoritos atualizados:", favoritos); // Debug
        atualizarEstadoFavorito(id); // Atualiza o ícone do coração
    }

    // Função para atualizar o ícone do coração
    function atualizarEstadoFavorito(id) {
        var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        var isFavorito = favoritos.some(function (p) {
            return p.id == id;
        });

        if (isFavorito) {
            $(".btn-favoritar i").removeClass('ri-heart-3-line').addClass('ri-heart-fill');
        } else {
            $(".btn-favoritar i").removeClass('ri-heart-fill').addClass('ri-heart-3-line');
        }
    }

    // Adiciona evento de clique para o botão de favoritar
    $(".btn-favoritar").on('click', function (e) {
        e.preventDefault(); // Evita o comportamento padrão do link
        var id = $(this).attr('data-id');
        favoritarProduto(id);
    });

    // Atualiza o estado do coração ao carregar a página
    if (id) {
        atualizarEstadoFavorito(id);
    }
});