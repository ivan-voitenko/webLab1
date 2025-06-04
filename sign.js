document.addEventListener('DOMContentLoaded', () => {
  const enterBtn = document.querySelector('.button1 button');
  const errorMessage = document.createElement('div');
  errorMessage.style.color = 'red';
  errorMessage.style.textAlign = 'center';
  errorMessage.style.marginTop = '10px';

  const form = document.getElementById('signinForm');
  form.appendChild(errorMessage);

  enterBtn.addEventListener('click', () => {
    errorMessage.textContent = '';

    const number = form.number.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!number || !email || !password) {
      errorMessage.textContent = 'Пожалуйста, заполните все поля.';
      return;
    }

    // Получаем пользователей из localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Поиск пользователя по номеру и email одновременно (можно по одному, если хотите)
    const user = users.find(u => u.number === number && u.email === email);

    if (!user) {
      errorMessage.textContent = 'Пользователь с таким номером и email не найден.';
      return;
    }

    if (user.password !== password) {
	  errorMessage.textContent = 'Неверный пароль.';
	  return;
	}

	// Успешный вход — сохраняем текущего пользователя для сессии
	localStorage.setItem('currentUser', JSON.stringify(user));
	localStorage.setItem('loggedIn', 'true');  // <-- вот эта строка

	// Перенаправляем на профиль
	window.location.href = 'profile.html';

  });
});
