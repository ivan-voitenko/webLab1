export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Додавання обробників подій
        this.view.bindCreateContact(this.handleCreateContact);
        this.view.bindUpdateContact(this.handleUpdateContact);
        this.view.bindDeleteContact(this.handleDeleteContact);
        this.view.bindSortContacts(this.handleSortContacts);
    }

    // Обробник події створення контакту
    handleCreateContact = (contactData) => {
        this.model.createContact(contactData);
        this.view.renderContacts(this.model.contacts);
    }

    // Обробник події оновлення контакту
    handleUpdateContact = (contactId, updatedData) => {
        this.model.updateContact(contactId, updatedData);
        this.view.renderContacts(this.model.contacts);
    }

    // Обробник події видалення контакту
    handleDeleteContact = (contactId) => {
        this.model.deleteContact(contactId);
        this.view.renderContacts(this.model.contacts);
    }

    // Обробник події сортування контактів
    handleSortContacts = (sortBy) => {
        this.model.sortContacts(sortBy);
        this.view.renderContacts(this.model.contacts);
    }
}
