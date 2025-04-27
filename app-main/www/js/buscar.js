$(document).ready(function() {
    const sugestoes = [
        'Camiseta',
        'Smartphone',
        'Tênis',
        'Notebook',
        'Mochila',
        'Fone de ouvido'
    ];

    let timeoutId;

    // Função para mostrar sugestões de busca
    function mostrarSugestoes(termo) {
        if (!termo) {
            $("#searchSuggestions").hide();
            return;
        }

        const suggestoesFiltradas = sugestoes.filter(s => 
            s.toLowerCase().includes(termo.toLowerCase())
        );

        if (suggestoesFiltradas.length > 0) {
            let html = '';
            suggestoesFiltradas.forEach(sugestao => {
                html += `
                    <div class="suggestion-item" data-termo="${sugestao}">
                        <i class="suggestion-icon ri-search-line"></i>
                        <span>${sugestao}</span>
                    </div>
                `;
            });
            $("#searchSuggestions").html(html).show();
        } else {
            $("#searchSuggestions").hide();
        }
    }

    // Evento de input no campo de busca
    $("#campoBusca").on('input', function() {
        clearTimeout(timeoutId);
        const termo = $(this).val();
        
        timeoutId = setTimeout(() => {
            mostrarSugestoes(termo);
        }, 300);
    });

    // Evento de clique nas sugestões
    $(document).on('click', '.suggestion-item', function() {
        const termo = $(this).data('termo');
        $("#campoBusca").val(termo);
        $("#searchSuggestions").hide();
        realizarBusca(termo);
    });

    // Evento de clique nas categorias
    $(".category-card").on('click', function() {
        const categoria = $(this).find('.category-name').text();
        $("#campoBusca").val(categoria);
        realizarBusca(categoria);
    });

    // Função para realizar a busca
    function realizarBusca(termo) {
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        
        const resultados = produtos.filter(produto => 
            produto.nome.toLowerCase().includes(termo.toLowerCase()) ||
            produto.descricao.toLowerCase().includes(termo.toLowerCase()) ||
            produto.principal_caracteristica.toLowerCase().includes(termo.toLowerCase())
        );

        renderizarResultados(resultados);
    }

    // Evento de submit do formulário
    $("#formBusca").on('submit', function(e) {
        e.preventDefault();
        const termo = $("#campoBusca").val();
        $("#searchSuggestions").hide();
        realizarBusca(termo);
    });

    // Função para renderizar os resultados
    function renderizarResultados(resultados) {
        let html = '';

        if (resultados.length > 0) {
            resultados.forEach(produto => {
                html += `
                    <div class="item-card">
                        <a href="/detalhes/" class="item" data-id="${produto.id}">
                            <div class="img-container">
                                <img src="${produto.imagem}" alt="${produto.nome}">
                            </div>
                            <div class="nome-rating">
                                <span class="nome-produto">${produto.nome}</span>
                                <span class="rating">
                                    ${produto.rating}
                                    <i class="ri-star-fill"></i>
                                </span>
                            </div>
                            <div class="price">
                                ${produto.preco_promocional.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                })}
                            </div>
                        </a>
                    </div>
                `;
            });
        } else {
            html = `
                <div class="no-results">
                    <i class="ri-search-line"></i>
                    <p>Nenhum produto encontrado</p>
                    <p class="text-secondary">Tente buscar por outro termo</p>
                </div>
            `;
        }

        $("#resultadosBusca").html(html);

        // Adiciona evento de clique para os itens
        $(".item").on('click', function() {
            const id = $(this).attr('data-id');
            localStorage.setItem('detalhe', id);
            app.views.main.router.navigate('/detalhes/');
        });
    }

    // Inicialização: esconde as sugestões
    $("#searchSuggestions").hide();
});