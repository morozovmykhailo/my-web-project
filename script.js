// Масив проєктів
const projects = [
  { id: 1, title: "Сайт-візитка", tech: "HTML/CSS" },
  { id: 2, title: "Проста гра", tech: "С" },
  { id: 3, title: "Портфоліо", tech: "HTML/CSS/JS" },
  { id: 4, title: "Магазин", tech: "JavaScript" },
  { id: 5, title: "Скрипт автоматизації", tech: "Python" },
  { id: 6, title: "Програма обробки даних", tech: "C" }
];

// Отримання контейнера для проєктів та поля пошуку
const container = document.querySelector('#projects-container');
const searchInput = document.querySelector('#search-input');

// Функція генерації HTML через шаблонні рядки
function createProjectCard(project) {
  return `
    <article class="project-card">
      <h3>${project.title}</h3>
      <p>Технології: ${project.tech}</p>
    </article>
  `;
}

// Функція рендерингу списку через MAP
function renderProjects(list) {
  if (!container) return;

  const html = list
    .map(project => createProjectCard(project))
    .join('');

  container.innerHTML = html;
}

// Первинний виклик для відображення всіх карток при завантаженні
renderProjects(projects);

// 4. Реалізація пошуку за допомогою фільтрації
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase().trim();

    const filtered = projects.filter(project =>
      project.title.toLowerCase().includes(value) || 
      project.tech.toLowerCase().includes(value)
    );

    renderProjects(filtered);
  });
}

// Перемикач теми
const themeBtn = document.querySelector('#theme-toggle');
const bodyElement = document.body;

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-theme');
  });
}

// Модальне вікно
const openBtn = document.querySelector('#open-modal');
const closeBtn = document.querySelector('#close-modal');
const modal = document.querySelector('#modal');

if (openBtn && closeBtn && modal) {
  openBtn.addEventListener('click', () => {
    modal.classList.add('is-open');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('is-open');
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal) {
    modal.classList.remove('is-open');
  }
});

// Валідація форми
const form = document.querySelector('#contact-form');
const nameInput = document.querySelector('#user-name');

if (form && nameInput) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (nameInput.value.trim().length < 2) {
      alert("Ім'я має містити щонайменше 2 символи");
    } else {
      alert("Форму відправлено!");
    }
  });
}