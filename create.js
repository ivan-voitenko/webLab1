document.getElementById('addBtn').addEventListener('click', async () => {
    const surname = document.getElementById('surname').value.trim();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!surname || !name || !phone) {
        alert('Пожалуйста, заполните все поля!');
        return;
    }

    const newContact = {
        name: surname + ' ' + name,
        number: phone
    };

    try {
        const response = await fetch('http://localhost:3000/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newContact)
        });

        if (response.ok) {
            alert('Контакт успешно добавлен!');
            document.getElementById('surname').value = '';
            document.getElementById('name').value = '';
            document.getElementById('phone').value = '+380';
        } else {
            alert('Ошибка при добавлении контакта');
        }
    } catch (error) {
        alert('Не удалось подключиться к серверу');
        console.error(error);
    }
});
