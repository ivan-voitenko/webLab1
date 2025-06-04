document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('createContactForm');
  const btnCreate = form.querySelector('button[type="button"]');

  btnCreate.addEventListener('click', () => {
    // Получаем значения из формы
    const name = form.name.value.trim();
    const password = form.password.value.trim();
    const email = form.email.value.trim();
    const gender = form.gender.value;
    const dateofbirth = form.dateofbirth.value;
    const number = form.number.value.trim();

    // Проверка на заполненность
    if (!name || !password || !email || !gender || !dateofbirth || !number) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    // Получаем существующих пользователей
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Проверка, есть ли уже пользователь с таким email
    if (users.find(u => u.email === email)) {
      alert('Пользователь с таким email уже зарегистрирован.');
      return;
    }

    // Создаем объект пользователя
    const newUser = { name, password, email, gender, dateofbirth, number };

    // Добавляем пользователя в массив
    users.push(newUser);

    // Сохраняем в localStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert('Регистрация прошла успешно!');

    // Можно очистить форму
    form.reset();
  });
});
