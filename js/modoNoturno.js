
  // Função para aplicar o tema
  function applyTheme(isDarkMode) {
    const body = document.body;
    const nav = document.querySelector('.navbar');
    const cards = document.querySelectorAll('.card');
    const footer = document.querySelector('.footer');
    const toggleButton = document.getElementById('toggleDarkMode');

    if (isDarkMode) {
      // Aplica o modo noturno
      body.classList.add('bg-dark', 'text-light');
      nav.classList.add('bg-dark', 'navbar-dark');
      nav.classList.remove('navbar-light');
      cards.forEach(card => card.classList.add('bg-dark', 'text-light', 'border-light'));
      footer.classList.add('footer-dark', 'text-light');
      toggleButton.textContent = 'Modo Claro';
    } else {
      // Remove o modo noturno
      body.classList.remove('bg-dark', 'text-light');
      nav.classList.remove('bg-dark', 'navbar-dark');
      nav.classList.add('navbar-light');
      cards.forEach(card => card.classList.remove('bg-dark', 'text-light', 'border-light'));
      footer.classList.remove('footer-dark', 'text-light');
      toggleButton.textContent = 'Modo Noturno';
    }
  }

  // Carrega o tema ao carregar a página
  document.addEventListener('DOMContentLoaded', function () {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    applyTheme(isDarkMode); // Aplica o tema salvo
  });

  // Alterna o tema e salva no localStorage
  document.getElementById('toggleDarkMode').addEventListener('click', function () {
    const isDarkMode = document.body.classList.contains('bg-dark');
    applyTheme(!isDarkMode); // Alterna o tema
    localStorage.setItem('darkMode', !isDarkMode); // Salva a preferência
  });

