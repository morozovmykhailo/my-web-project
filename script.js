console.log("JS connected!");

const projects = [
  { id: 1, title: "Сайт-візитка", tech: "HTML/CSS" },
  { id: 2, title: "Проста гра", tech: "С" },
  { id: 3, title: "Портфоліо", tech: "HTML/CSS/JS" },
  { id: 4, title: "Магазин", tech: "JavaScript" },
  { id: 5, title: "Скрипт автоматизації", tech: "Python" },
  { id: 6, title: "Програма обробки даних", tech: "C" }
];

const projectsContainer = document.querySelector('#projects-container');
const searchInput = document.querySelector('#search-input');

function createProjectCard(project) {
  return `
    <article class="project-card">
      <h3>${project.title}</h3>
      <p>Технології: ${project.tech}</p>
    </article>
  `;
}

function renderProjects(list) {
  if (!projectsContainer) return;
  const html = list.map(project => createProjectCard(project)).join('');
  projectsContainer.innerHTML = html;
}

renderProjects(projects);

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

async function loadPosts() {
  const loading = document.querySelector('#loading');
  const postsContainer = document.querySelector('#posts-container');

  if (!loading || !postsContainer) return;

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!response.ok) {
      throw new Error('Server error');
    }

    // Очікуємо перетворення відповіді у формат JSON
    const data = await response.json();

    // Беремо перші 5 постів перетворюємо на HTML і об'єднуємо
    const html = data.slice(0, 5)
      .map(post => `
        <div class="post">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </div>
      `)
      .join('');

    // Рендеринг в DOM
    postsContainer.innerHTML = html;

    loading.style.display = 'none';

  } catch (error) {
    console.error(error);
    loading.textContent = 'Помилка завантаження даних';
    loading.style.color = 'red';
  }
}

loadPosts();


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