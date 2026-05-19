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

let allPosts = []; // Змінна для зберігання постів

async function loadPosts() {
  const loading = document.querySelector('#loading');
  const postsContainer = document.querySelector('#posts-container');

  if (!loading || !postsContainer) return;

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!response.ok) {
      throw new Error('Server error');
    }

    const data = await response.json();

    // Зберігаємо перші 10 постів
    allPosts = data.slice(0, 10);

    // Рендеримо завантажені пости
    renderPosts(allPosts);

    loading.style.display = 'none';

  } catch (error) {
    console.error(error);
    loading.textContent = 'Помилка завантаження даних';
    loading.style.color = 'red';
  }
}

// Функція відображення постів
function renderPosts(list) {
  const postsContainer = document.querySelector('#posts-container');
  if (!postsContainer) return;

  const html = list
    .map(post => `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      </div>
    `)
    .join('');

  postsContainer.innerHTML = html;
}

loadPosts();

// Пошук (фільтрація) постів
const searchPostsInput = document.querySelector('#search-posts');

if (searchPostsInput) {
  searchPostsInput.addEventListener('input', () => {
    const value = searchPostsInput.value.toLowerCase().trim();

    const filtered = allPosts.filter(post =>
      post.title.toLowerCase().includes(value)
    );

    renderPosts(filtered);
  });
}



let tasks = [];

// Функції збереження та завантаження
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const data = localStorage.getItem('tasks');
    if (data) {
        tasks = JSON.parse(data);
    }
}

const input = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-task');

if (addBtn && input) {
    addBtn.addEventListener('click', () => {
        const value = input.value.trim();

        if (value === '') return;

        tasks.push({ text: value });
        saveTasks();
        renderTasks();

        input.value = '';
    });

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addBtn.click();
        }
    });
}

// Рендеринг списку
const list = document.querySelector('#task-list');

function renderTasks() {
    if (!list) return;
    list.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item'; // Клас для стилізації

        const textSpan = document.createElement('span');
        textSpan.textContent = task.text;
        li.appendChild(textSpan);

        const btn = document.createElement('button');
        btn.textContent = '✕';
        btn.className = 'delete-task-btn'; // Клас для стилізації кнопки видалення

        btn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(btn);
        list.appendChild(li);
    });
}

loadTasks();
renderTasks();


/* UI ЕЛЕМЕНТИ */

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