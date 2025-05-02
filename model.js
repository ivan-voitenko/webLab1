export default class Model {
    constructor() {
        // Ініціалізуємо базу даних контактів
        this.contacts = [];
    }

    // Метод для додавання нового контакту
    addContact(contact) {
        this.contacts.push(contact);
    }

    // Метод для оновлення інформації про контакт
    updateContact(id, updatedContact) {
        const index = this.contacts.findIndex(contact => contact.id === id);
        if (index !== -1) {
            this.contacts[index] = { ...this.contacts[index], ...updatedContact };
        }
    }

    // Метод для видалення контакту
    deleteContact(id) {
        this.contacts = this.contacts.filter(contact => contact.id !== id);
    }

    // Метод для сортування контактів за вказаним параметром
    sortContacts(sortBy) {
        switch (sortBy) {
            case 'name':
                this.contacts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'email':
                this.contacts.sort((a, b) => a.email.localeCompare(b.email));
                break;
            case 'number':
                this.contacts.sort((a, b) => a.number.localeCompare(b.number));
                break;
            default:
                break;
        }
    }
}
