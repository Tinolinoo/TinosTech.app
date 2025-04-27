[output-metadata.json](https://github.com/user-attachments/files/19931164/output-metadata.json)
[Uploa[Uploading app-debug-androidTest.apk…]()ding output-metadata.json…]()


APK se localiza em : TinosTech app\app-main\android\app\build\outputs\apk\androidTest\debug

GreenTech - E-commerce Application
Descrição do Projeto
O GreenTech é um aplicativo de e-commerce desenvolvido para oferecer uma experiência de compra moderna e intuitiva. Ele permite que os usuários explorem uma ampla variedade de produtos tecnológicos, adicionem itens ao carrinho, favoritem produtos, realizem buscas, e finalizem compras utilizando métodos de pagamento como PIX e boleto bancário. O aplicativo também inclui integração com o login do Google para autenticação de usuários e uma funcionalidade de cálculo de frete baseada no CEP.

Tecnologias Utilizadas
1. HTML, CSS e JavaScript
O projeto é construído utilizando as tecnologias fundamentais da web:

HTML: Estruturação das páginas.
CSS: Estilização e design responsivo, com uso de bibliotecas como Framework7 e ícones de Material Design e Remix Icons.
JavaScript: Lógica de interação, manipulação de dados no localStorage e integração com APIs.
2. Framework7
O Framework7 é utilizado para criar uma interface de usuário moderna e responsiva, com suporte a navegação entre páginas, animações e componentes prontos para dispositivos móveis.

3. jQuery
A biblioteca jQuery é usada para simplificar a manipulação do DOM, eventos e requisições AJAX.

Funcionalidades Principais
1. Login com Google
O aplicativo utiliza a API de Login do Google para autenticação de usuários. A integração é feita com o Google Identity Services, permitindo que os usuários façam login de forma rápida e segura. Após o login, os dados do usuário (nome, e-mail e foto) são armazenados no localStorage e exibidos na interface.

2. Cálculo de Frete
A funcionalidade de cálculo de frete utiliza a API pública do ViaCEP para validar o CEP inserido pelo usuário. Com base no CEP, são simulados valores de frete para os serviços PAC e SEDEX dos Correios, exibindo o prazo e o custo estimado.

3. E-commerce Completo
Busca e Filtros: Os usuários podem buscar produtos por nome, descrição ou características principais.
Favoritos: Produtos podem ser adicionados ou removidos da lista de favoritos.
Carrinho de Compras: Os usuários podem adicionar produtos ao carrinho, ajustar quantidades e visualizar o subtotal, frete e total.
Pagamento: Suporte a pagamento via PIX (com geração de QR Code) e boleto bancário.
Estrutura do Projeto
Diretórios Principais
www/: Contém os arquivos principais do aplicativo.
css/: Arquivos de estilo para diferentes páginas e componentes.
js/: Scripts JavaScript para funcionalidades específicas, como login, carrinho, favoritos e cálculo de frete.
img/: Imagens utilizadas no aplicativo.
lib/: Bibliotecas externas, como Framework7 e jQuery.
Arquivos Relevantes
index.html: Página inicial do aplicativo, com navegação para outras seções.
routes.js: Define as rotas do aplicativo para navegação entre páginas.
login.js: Gerencia o login do usuário, incluindo a integração com o Google.
carrinho.js: Lida com as funcionalidades do carrinho de compras.
pagamento.js: Implementa os métodos de pagamento, como PIX e boleto.
backend.json: Simula os dados dos produtos disponíveis no aplicativo.
Como Executar o Projeto
Pré-requisitos:

Node.js instalado.
Um servidor HTTP simples, como http-server.
Instalação:

Clone o repositório.
Navegue até o diretório app-main.
Instale as dependências com npm install.
Execução:

Inicie o servidor local com npm run start.
Acesse o aplicativo no navegador em http://localhost:3000.
Conclusão
O GreenTech é um projeto completo de e-commerce que combina tecnologias modernas e integrações úteis para oferecer uma experiência de usuário fluida e funcional. Ele é ideal para quem deseja explorar o desenvolvimento de aplicativos web responsivos com funcionalidades avançadas, como autenticação social e cálculo de frete.
interface:
![image](https://github.com/user-attachments/assets/979fbdb5-71d7-4c98-8db3-44106dd5af3d)

detalhes:
![image](https://github.com/user-attachments/assets/6be686fa-9603-4a31-8ad3-2351690f8524)

buscar:
![image](https://github.com/user-attachments/assets/3501c1e3-a4e6-4cbe-b360-20bed22acd04)

favoritos:
![image](https://github.com/user-attachments/assets/e75dbfdc-842d-4eca-900f-958c84d24a40)

Carrinho:
![image](https://github.com/user-attachments/assets/404298c0-ee2a-4af1-a170-6db940877aea)

frameworks:
![image](https://github.com/user-attachments/assets/76970f57-f189-4796-abf8-74b1e895c0b0)
![image](https://github.com/user-attachments/assets/35201f36-7f5d-4238-97ca-ecae764a933c)

Login:
![image](https://github.com/user-attachments/assets/27783af3-64ad-4500-9037-e50e0f9a9135)







