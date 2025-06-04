document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const btnAdd = form.querySelector('button[type="button"]');

  btnAdd.addEventListener('click', (e) => {
    e.preventDefault();

    const surname = form.querySelector('#surname').value.trim();
    const name = form.querySelector('#name').value.trim();
    const phone = form.querySelector('#phone').value.trim();

    if (!surname || !name || !phone) {
      alert('Заполните все поля');
      return;
    }

    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    const newId = contacts.length ? Math.max(...contacts.map(c => c.id || 0)) + 1 : 1;
    const fullName = `${surname} ${name}`.trim();

    contacts.push({ id: newId, name: fullName, number: phone });

    console.log('Сохраняю контакты:', contacts);

    localStorage.setItem('contacts', JSON.stringify(contacts));

    form.reset();
    form.querySelector('#phone').value = '+380';

    alert('Контакт добавлен');
  });
});
