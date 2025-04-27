// INICIALIZAÇÃO DO F7 QUANDO DISPOSITIVO ESTÁ PRONTO
document.addEventListener('deviceready', onDeviceReady, false);

// Define as rotas
const routes = [
    {
        path: '/index/',
        url: 'index.html',
        on: {
            pageBeforeIn: function (event, page) {
                $("#menuPrincipal").show("fast");
            },
            pageInit: function (event, page) {
                $.getScript('js/index.js');
                var swiper = new Swiper(".mySwiper", {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    autoplay: true,
                    delay: 3000,
                    loop: true,
                    breakpoints: {
                        50: { slidesPerView: 1, spaceBetween: 30 },
                        640: { slidesPerView: 2, spaceBetween: 30 },
                        992: { slidesPerView: 3, spaceBetween: 30 },
                        1200: { slidesPerView: 4, spaceBetween: 30 }
                    }
                });

                var swiper2 = new Swiper(".categorias", {
                    slidesPerView: 3,
                    spaceBetween: 10,
                    breakpoints: {
                        50: { slidesPerView: 3, spaceBetween: 30 },
                        640: { slidesPerView: 6, spaceBetween: 30 },
                        992: { slidesPerView: 8, spaceBetween: 30 },
                        1200: { slidesPerView: 12, spaceBetween: 30 }
                    }
                });
            }
        }
    },
    {
        path: '/buscar/',
        url: 'buscar.html',
        animate: false,
        on: {
            pageBeforeIn: function (event, page) {
                $("#menuPrincipal").show("fast");
            },
            pageInit: function (event, page) {
                $.getScript('js/busca.js');
            }
        }
    },
    {
        path: '/favoritos/',
        url: 'favoritos.html',
        animate: false,
        on: {
            pageBeforeIn: function (event, page) {
                $("#menuPrincipal").show("fast");
            },
            pageInit: function (event, page) {
                $.getScript('js/favoritos.js');
            }
        }
    },
    {
        path: '/login/',
        url: 'login.html',
        animate: true,
        on: {
            pageBeforeIn: function (event, page) {
                console.log('Página de login será exibida.');
            },
            pageInit: function (event, page) {
                console.log('Página de login inicializada.');
            }
        }
    },
    {
        path: '/usuario/',
        url: 'usuario.html',
        animate: true,
        on: {
            pageBeforeIn: function (event, page) {
                console.log('Área do usuário será exibida.');
            },
            pageInit: function (event, page) {
                console.log('Área do usuário inicializada.');
            }
        }
    },
    {
        path: '/detalhes/',
        url: 'detalhes.html',
        animate: false,
        on: {
            pageBeforeIn: function (event, page) {
                $("#menuPrincipal").hide("fast");
            },
            pageInit: function (event, page) {
                $.getScript('js/detalhes.js');
            }
        }
    },
    {
        path: '/carrinho/',
        url: 'carrinho.html',
        options: {
            transition: 'f7-push',
        },
        on: {
            pageBeforeIn: function (event, page) {
                $("#menuPrincipal").hide("fast");
            },
            pageInit: function (event, page) {
                $.getScript('js/carrinho.js');
            }
        }
    },
    {
        path: '/pagamento/',
        url: 'pagamento.html',
        options: {
            transition: 'f7-push',
        },
        on: {
            pageBeforeIn: function (event, page) {
                $("#menuPrincipal").hide("fast");
            },
            pageInit: function (event, page) {
                $.getScript('js/pagamento.js');
            }
        }
    },
    {
        path: '(.*)',
        url: 'index.html',
    }
];

// Inicialização do Framework7
var app = new Framework7({
    el: '#app',
    name: 'Tino\'s Tech',
    id: 'com.tinostech.app',
    panel: {
        swipe: true,
    },
    dialog: {
        buttonOk: 'Sim',
        buttonCancel: 'Cancelar',
    },
    routes: routes
});

// Criar view principal
var mainView = app.views.create('.view-main', { url: '/index/' });

// Evento para atualizar menu ativo
app.on('routeChange', function (route) {
    var currentRoute = route.url;
    console.log(currentRoute);
    document.querySelectorAll('.tab-link').forEach(function (el) {
        el.classList.remove('active');
    });
    var targetEl = document.querySelector('.tab-link[href="' + currentRoute + '"]');
    if (targetEl) {
        targetEl.classList.add('active');
    }
});

function onDeviceReady() {
    var mainView = app.views.create('.view-main', { url: '/index/' });

    document.addEventListener("backbutton", function (e) {
        if (mainView.router.currentRoute.path === '/index/') {
            e.preventDefault();
            app.dialog.confirm('Deseja sair do aplicativo?', function () {
                navigator.app.exitApp();
            });
        } else {
            e.preventDefault();
            mainView.router.back({ force: true });
        }
    }, false);
}