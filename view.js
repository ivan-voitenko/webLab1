export default class View {
    constructor() {
        this.createContactForm = document.getElementById('createContactForm');
        this.updateContactForm = document.getElementById('updateContactForm');
        this.deleteContactForm = document.getElementById('deleteContactForm');
        this.sortContactsForm = document.getElementById('sortContactsForm');
        this.contactsContainer = document.getElementById('contactsContainer');

        this.createContactForm.addEventListener('submit', this.handleCreateContact);
        this.updateContactForm.addEventListener('submit', this.handleUpdateContact);
        this.deleteContactForm.addEventListener('submit', this.handleDeleteContact);
        this.sortContactsForm.addEventListener('submit', this.handleSortContacts);
    }

    // Метод для відображення контактів
    renderContacts(contacts) {
        // Очищення контейнера перед оновленням
        this.contactsContainer.innerHTML = '';

        // Відображення кожного контакту в контейнері
        contacts.forEach(contact => {
            const contactElement = document.createElement('div');
            contactElement.textContent = `${contact.name} - ${contact.email} - ${contact.number}`;
            this.contactsContainer.appendChild(contactElement);
        });
    }

    // Метод для отримання даних форми створення контакту
    getCreateContactData() {
        const name = this.createContactForm.querySelector('#name').value;
        const email = this.createContactForm.querySelector('#email').value;
        const number = this.createContactForm.querySelector('#number').value;
        return { name, email, number };
    }

    // Метод для отримання даних форми оновлення контакту
    getUpdateContactData() {
        const id = this.updateContactForm.querySelector('#contactId').value;
        const name = this.updateContactForm.querySelector('#name').value;
        const email = this.updateContactForm.querySelector('#email').value;
        const number = this.updateContactForm.querySelector('#number').value;
        return { id, name, email, number };
    }

    // Метод для отримання id контакту для видалення
    getDeleteContactId() {
        return this.deleteContactForm.querySelector('#contactId').value;
    }

    // Метод для отримання параметрів сортування контактів
    getSortBy() {
        return this.sortContactsForm.querySelector('input[name="sortBy"]:checked').value;
    }

    // Метод для прив'язки обробників подій до форм
    bindCreateContact(handler) {
        this.handleCreateContact = (event) => {
            event.preventDefault();
            handler(this.getCreateContactData());
        }
    }

    bindUpdateContact(handler) {
        this.handleUpdateContact = (event) => {
            event.preventDefault();
            handler(this.getUpdateContactData());
        }
    }

    bindDeleteContact(handler) {
        this.handleDeleteContact = (event) => {
            event.preventDefault();
            handler(this.getDeleteContactId());
        }
    }

    bindSortContacts(handler) {
        this.handleSortContacts = (event) => {
            event.preventDefault();
            handler(this.getSortBy());
        }
    }
}

