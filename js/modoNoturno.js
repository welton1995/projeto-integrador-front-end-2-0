  // // Função para aplicar o tema
  // function applyTheme(isDarkMode) {
  //   const body = document.body;
  //   const nav = document.querySelector('.navbar');
  //   const cards = document.querySelectorAll('.card');
  //   const footer = document.querySelector('.footer');
  //   const toggleButton = document.getElementById('toggleDarkMode');

  //   if (isDarkMode) {
  //     // Aplica o modo noturno
  //     body.classList.add('bg-dark', 'text-light');
  //     nav.classList.add('header-dark', 'navbar-dark');
  //     nav.classList.remove('navbar-light');
  //     cards.forEach(card => card.classList.add('bg-dark', 'text-light', 'border-light'));
  //     footer.classList.add('footer-dark', 'text-light');
  //     toggleButton.textContent = 'Modo Claro';
  //   } else {
  //     // Remove o modo noturno
  //     body.classList.remove('bg-dark', 'text-light');
  //     nav.classList.remove('header-dark', 'navbar-dark');
  //     nav.classList.add('navbar-light');
  //     cards.forEach(card => card.classList.remove('bg-dark', 'text-light', 'border-light'));
  //     footer.classList.remove('footer-dark', 'text-light');
  //     toggleButton.textContent = 'Modo Noturno';
  //   }
  // }

  // // Carrega o tema ao carregar a página
  // document.addEventListener('DOMContentLoaded', function () {
  //   const isDarkMode = localStorage.getItem('darkMode') === 'true';
  //   applyTheme(isDarkMode); // Aplica o tema salvo
  // });

  // // Alterna o tema e salva no localStorage
  // document.getElementById('toggleDarkMode').addEventListener('click', function () {
  //   const isDarkMode = document.body.classList.contains('bg-dark');
  //   applyTheme(!isDarkMode); // Alterna o tema
  //   localStorage.setItem('darkMode', !isDarkMode); // Salva a preferência
  // });

  // Função para aplicar o tema
function applyTheme(isDarkMode) {
  const body = document.body;
  const container = document.querySelector('.container-default');
  const nav = document.querySelector('.navbar');
  const cards = document.querySelectorAll('.card');
  const footer = document.querySelector('.footer');
  const toggleButton = document.getElementById('toggleDarkMode');
  const buttons = document.querySelectorAll('.btns'); // Seleciona todos os botões com a classe .btns

  if (isDarkMode) {
    // Aplica o modo noturno
    body.classList.add('bg-dark', 'text-light');
    container.classList.add('container-default-dark');
    nav.classList.add('header-dark', 'navbar-dark');
    nav.classList.remove('navbar-light');
    cards.forEach(card => card.classList.add('bg-dark', 'text-light', 'border-light'));
    footer.classList.add('footer-dark', 'text-light');
    buttons.forEach(button => button.classList.add('btn-dark', 'text-light', 'border-light')); // Aplica o dark mode nos botões
    toggleButton.textContent = '🌞';
  } else {
    // Remove o modo noturno
    body.classList.remove('bg-dark', 'text-light');
    container.classList.remove('container-default-dark');
    nav.classList.remove('header-dark', 'navbar-dark');
    nav.classList.add('navbar-light');
    cards.forEach(card => card.classList.remove('bg-dark', 'text-light', 'border-light'));
    footer.classList.remove('footer-dark', 'text-light');
    buttons.forEach(button => button.classList.remove('btn-dark', 'text-light', 'border-light')); // Remove o dark mode dos botões
    toggleButton.textContent = '🌙';
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

