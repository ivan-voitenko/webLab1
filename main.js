// Підключення модулів
import Model from './model.js';
import View from './view.js';
import Controller from './controller.js';

// Ініціалізація моделі, виду і контролера
const model = new Model();
const view = new View();
const controller = new Controller(model, view);

// Функція для запуску додатку
function initApp() {
    // Завантаження даних при запуску
    model.loadInitialData();

    // Відображення веб-інтерфейсу
    view.render();
}

// Обробка події завантаження сторінки
document.addEventListener('DOMContentLoaded', initApp);
