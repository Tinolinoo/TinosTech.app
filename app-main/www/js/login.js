// Configuração do botão do Google
function renderGoogleButton() {
    if (window.google && google.accounts && google.accounts.id) {
        google.accounts.id.initialize({
            client_id: '397413400298-r7ubq2778r5pfg8msv09m2sftivjlv9d.apps.googleusercontent.com',
            callback: handleCredentialResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('google-signin-button'),
            { 
                type: 'standard',
                theme: 'outline',
                size: 'large',
                text: 'signin_with',
                shape: 'rectangular',
                width: 300
            }
        );
    } else {
        console.error('Google Identity Services não está disponível');
    }
}

// Função para mostrar mensagem de erro
function showError(message) {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Esconde a mensagem após 5 segundos
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }
}

// Função para atualizar a UI do usuário
function updateUserUI(name, email, photo) {
    document.getElementById('user-name').textContent = name;
    document.getElementById('user-email').textContent = email;
    document.getElementById('user-photo').src = photo;
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('user-section').style.display = 'block';
}

// Função para salvar dados do usuário
function saveUserData(name, email, photo) {
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPhoto', photo);
}

// Configuração do logout
document.getElementById('logout-button')?.addEventListener('click', function() {
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhoto');
    
    // Animação suave de fade out
    const userSection = document.getElementById('user-section');
    userSection.style.opacity = '0';
    userSection.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        userSection.style.display = 'none';
        document.getElementById('login-section').style.display = 'block';
        // Recarrega a página após um breve delay para garantir uma transição suave
        setTimeout(() => location.reload(), 100);
    }, 300);
});

// Inicialização quando a página é carregada
document.addEventListener('DOMContentLoaded', function() {
    renderGoogleButton();

    // Verifica se há usuário logado
    const userName = localStorage.getItem('userName');
    if (userName) {
        updateUserUI(
            userName,
            localStorage.getItem('userEmail'),
            localStorage.getItem('userPhoto')
        );
    }

    // Configuração do formulário de login
    const emailLoginForm = document.getElementById('email-login-form');
    if (emailLoginForm) {
        emailLoginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Simulação de autenticação
            if (email === "teste@exemplo.com" && password === "123456") {
                const userData = {
                    name: "Usuário Teste",
                    email: email,
                    photo: "https://via.placeholder.com/150"
                };

                saveUserData(userData.name, userData.email, userData.photo);
                updateUserUI(userData.name, userData.email, userData.photo);
            } else {
                showError("E-mail ou senha inválidos");
            }
        });
    }
});

// Callback do Google Sign-In
window.handleCredentialResponse = function(response) {
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    
    saveUserData(payload.name, payload.email, payload.picture);
    updateUserUI(payload.name, payload.email, payload.picture);
    
    // Redireciona para a área do usuário se necessário
    if (window.app?.views?.main) {
        app.views.main.router.navigate('/usuario/');
    }
};

// Suporte ao Framework7
if (window.app) {
    app.on('pageInit', function(e) {
        if (e.page?.name === 'login') {
            renderGoogleButton();
        }
    });
}