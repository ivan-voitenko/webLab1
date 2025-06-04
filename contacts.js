// contacts.js

// Загрузка контактов из localStorage или дефолтный список
let contacts = JSON.parse(localStorage.getItem('contacts'));
if (!contacts || contacts.length === 0) {
  contacts = [
    { id: 1, name: "Veronica Burda", number: "+380638720754" },
    { id: 2, name: "Angela Bailuk", number: "+380979837621" },
    { id: 3, name: "Amelia Sluchinska", number: "+380638729870" },
    { id: 4, name: "Marina Ardanovich", number: "+380638720912" }
  ];
  localStorage.setItem('contacts', JSON.stringify(contacts)); // сохранить дефолтный список при первом запуске
}


// Проверка, вошёл ли пользователь (например, в localStorage хранится флаг loggedIn)
const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

// Добавляем кнопку Sign Out, если пользователь вошёл
function addSignOutButton() {
  if (!isLoggedIn) return;

  const nav = document.querySelector('.navbar-nav');
  if (!nav) return;

  // Проверим, чтобы не добавлять кнопку дважды
  if (document.getElementById('sign-out-btn')) return;

  const signOutBtn = document.createElement('button');
  signOutBtn.textContent = 'Sign Out';
  signOutBtn.className = 'btn btn-outline-light ms-2';
  signOutBtn.id = 'sign-out-btn';

  signOutBtn.onclick = () => {
    localStorage.removeItem('loggedIn');  // Выход
    window.location.href = 'sign.html';    // Перенаправление на страницу входа
  };

  nav.appendChild(signOutBtn);
}

// Функция добавления нового контакта
function addContact(name, number) {
  const newId = contacts.length ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
  contacts.push({ id: newId, name, number });
  localStorage.setItem('contacts', JSON.stringify(contacts));
  renderContacts();
}

// Функция для рендера таблицы контактов
function renderContacts() {
  const tbody = document.querySelector('table.contact_table tbody');
  if (!tbody) return;
  tbody.innerHTML = ''; // Очистить текущие строки

  contacts.forEach((contact, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${contact.name}</td>
      <td>${contact.number}</td>
      <td>
        <div class="form-check">
          <input class="form-check-input contact-checkbox" type="checkbox" data-id="${contact.id}">
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Удаление выбранных контактов
function deleteSelectedContacts() {
  const checkedBoxes = document.querySelectorAll('.contact-checkbox:checked');
  if (checkedBoxes.length === 0) {
    alert('Please select at least one contact to delete.');
    return;
  }

  const idsToDelete = Array.from(checkedBoxes).map(ch => +ch.dataset.id);
  contacts = contacts.filter(c => !idsToDelete.includes(c.id));
  localStorage.setItem('contacts', JSON.stringify(contacts));
  renderContacts();
}

// Сортировка по имени (алфавит)
function arrangeContacts() {
  contacts.sort((a, b) => a.name.localeCompare(b.name));
  localStorage.setItem('contacts', JSON.stringify(contacts));
  renderContacts();
}

// Редактирование выбранного контакта (только один)
function editSelectedContact() {
  const checkedBoxes = document.querySelectorAll('.contact-checkbox:checked');
  if (checkedBoxes.length !== 1) {
    alert('Please select exactly one contact to edit.');
    return;
  }

  const id = +checkedBoxes[0].dataset.id;
  const contact = contacts.find(c => c.id === id);
  if (!contact) return;

  const newName = prompt('Enter new name:', contact.name);
  if (newName === null || newName.trim() === '') return;

  const newNumber = prompt('Enter new number:', contact.number);
  if (newNumber === null || newNumber.trim() === '') return;

  contact.name = newName.trim();
  contact.number = newNumber.trim();

  localStorage.setItem('contacts', JSON.stringify(contacts));
  renderContacts();
}

// Инициализация событий и UI после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
  addSignOutButton();
  renderContacts();

  // Обработчики кнопок
  document.getElementById('delete-contact').onclick = deleteSelectedContacts;
  document.getElementById('arrange-contacts').onclick = arrangeContacts;
  document.getElementById('edit-contact').onclick = editSelectedContact;

  // Обработчик добавления контакта
  document.getElementById('add-contact-btn').addEventListener('click', () => {
    const nameInput = document.getElementById('contact-name');
    const numberInput = document.getElementById('contact-number');

    const name = nameInput.value.trim();
    const number = numberInput.value.trim();

    if (!name || !number) {
      alert('Please enter both name and number.');
      return;
    }

    addContact(name, number);

    // Очистить поля после добавления
    nameInput.value = '';
    numberInput.value = '';
  });
});
