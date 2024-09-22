  document.getElementById('toggleDarkMode').addEventListener('click', function () {
    const body = document.body;
    const nav = document.querySelector('.navbar');
    const cards = document.querySelectorAll('.card');
    const footer = document.querySelector('.footer');

    // Alterna a cor de fundo e o texto para o modo escuro
    body.classList.toggle('bg-dark');
    body.classList.toggle('text-light');

    // Ajusta a barra de navegação
    nav.classList.toggle('bg-dark');
    nav.classList.toggle('navbar-dark');
    nav.classList.toggle('navbar-light');

    // Alterna o tema dos cards
    cards.forEach(card => {
      card.classList.toggle('bg-dark');
      card.classList.toggle('text-light');
      card.classList.toggle('border-light');
    });

    // Ajusta o rodapé para modo escuro
    footer.classList.toggle('bg-dark');
    footer.classList.toggle('text-light');

    // Atualiza o texto do botão
    this.textContent = body.classList.contains('bg-dark') ? '☼' : '☾';
  });
