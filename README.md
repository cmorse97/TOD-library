# Simple Library App

A web application to manage a collection of books, allowing users to add new books, view their details, mark them as read or unread, delete books, and edit existing book information. Built with HTML, CSS, and vanilla JavaScript, utilizing classes for object-oriented organization.

## How to Use

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:cmorse97/TOD-library.git
    ```
2.  **Open `index.html`** in your web browser.
3.  **Adding a New Book:**
    - Click the "New Book" button to open the "Add New Book" modal.
    - Fill in the details for the book: Title, Author, Number of Pages, and whether you have read it or not.
    - Click the "Add new book" button to save the book to your library.
4.  **Viewing Your Library:**
    - Added books will appear as individual cards in the main library container.
    - Each card displays the book's title, author, number of pages, and read status.
5.  **Deleting a Book:**
    - On each book card, there is a "Delete Book" button.
    - Clicking this button will remove the corresponding book from your library.
6.  **Editing a Book:**
    - On each book card, there is an "Edit Book" button.
    - Clicking this button will open the "Edit Book" modal, pre-filled with the book's current information.
    - Modify the details as needed and click the "Save changes" button to update the book in your library.
7.  **Closing the Modal:**
    - You can close the "Add New Book" or "Edit Book" modal by clicking the "Close" button in the modal's header.
    - Alternatively, clicking outside the modal or pressing the "Escape" key will also close it.

## Features

- **Add New Books:** Easily add books to your virtual library with title, author, page count, and read status.
- **View Library:** A clear display of all the books in your library with essential information.
- **Mark as Read/Unread:** The read status of each book is clearly indicated on its card. (Note: Currently, there is no direct UI interaction to toggle the read status after a book is added. This would be a future enhancement.)
- **Delete Books:** Remove books from your library with a simple click.
- **Edit Books:** Modify the details of existing books in your library.
- **Object-Oriented Structure:** Utilizes JavaScript classes (`Book` and `Library`) for organized and maintainable code.

## Technologies Used

- HTML
- CSS
- JavaScript (Vanilla - no external libraries)

## Code Structure

The JavaScript code is organized into the following sections:

- **DOM Elements:** Variables to reference key HTML elements for interaction.
- **Modal Controls:** Functions and event listeners to handle the opening and closing of the "Add New Book" and "Edit Book" modals.
- **`Book` Class:** Defines the structure and properties of a book object (title, author, pages, read status, ID), including a getter (`info`) to retrieve a formatted string of book details.
- **`Library` Class:** Manages the collection of `Book` objects. It includes methods for:
  - Adding new books (`addBook`).
  - Updating existing books (`updateBook`).
  - Retrieving a book by its unique ID (`getBookById`).
  - Removing a book from the library (`removeBook`).
  - Getting all books in the library (`getAllBooks`).
- **Display Logic (`displayBooks` function):** Dynamically renders the book cards in the `libraryContainer` based on the books stored in the `Library` instance. It also attaches event listeners to the "Delete Book" and "Edit Book" buttons on each card.
- **Form Submission:** An event listener on the book form (`book-form`) handles the submission of new books and the saving of edited book information, interacting with the `Library` instance to update the data and then re-rendering the book display.
- **Initial Display:** Ensures that any books present in the `Library` on page load are displayed.

## Potential Future Enhancements

- Implement UI functionality to toggle the read status of books directly from the book cards.
- Add input validation to the form to provide more specific error messages.
- Implement local storage to persist the library data across browser sessions.
- Allow users to sort and filter their library.
- Enhance the visual design and user experience.

## Author

Caleb Morse
