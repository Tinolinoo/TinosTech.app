$(document).ready(function() {
    // Função para carregar os favoritos
    function carregarFavoritos() {
        var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        console.log("Favoritos no localStorage:", favoritos); // Debug

        var listaFavoritos = $("#listaFavoritos");
        var mensagemVazia = $("#mensagemVazia");

        // Limpa a lista antes de renderizar
        listaFavoritos.empty();

        if (favoritos.length > 0) {
            mensagemVazia.hide();
            favoritos.forEach(function(produto) {
                if (produto) { // Verifica se o produto é válido
                    console.log("Renderizando produto:", produto); // Debug
                    var itemHTML = `
                        <div class="item-card">
                            <a href="/detalhes/" class="item" data-id="${produto.id}">
                                <div class="img-container">
                                    <img src="${produto.imagem}" alt="${produto.nome}">
                                </div>
                                <div class="nome-rating">
                                    <span class="nome-produto">${produto.nome}</span>
                                    <span class="rating">${produto.rating}</span>
                                </div>
                                <div class="price">
                                    <span>${produto.preco_promocional.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
                                </div>
                            </a>
                            <!-- Botão de remover dos favoritos -->
                            <button class="btn-remover-favorito" data-id="${produto.id}">
                                <i class="mdi mdi-heart-off"></i> Remover
                            </button>
                        </div>
                    `;
                    listaFavoritos.append(itemHTML);
                }
            });
        } else {
            mensagemVazia.show();
        }

        // Adiciona evento de clique para remover favoritos
        $(".btn-remover-favorito").on('click', function() {
            var id = $(this).attr('data-id');
            removerFavorito(id);
        });
    }

    // Função para remover um produto dos favoritos
    function removerFavorito(id) {
        var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        favoritos = favoritos.filter(function(produto) {
            return produto && produto.id != id; // Filtra produtos válidos
        });
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        carregarFavoritos(); // Recarrega a lista de favoritos
    }

    // Carrega os favoritos ao abrir a página
    carregarFavoritos();
});