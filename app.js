document.addEventListener('DOMContentLoaded', () => {
	const addBookBtn = document.querySelector('.new-book-btn')
	const closeBtn = document.querySelector('.close-btn')
	const submitBtn = document.querySelector('button[type="submit"]')
	const bookForm = document.getElementById('book-form')
	const libraryContainer = document.querySelector('.library-container')
	const modal = document.getElementById('add-book-modal')

	let modalMode = 'add'
	let bookIdToEdit = null

	// --- BOOK CLASS ---
	class Book {
		constructor(title, author, pages, read, id) {
			this.title = title
			this.author = author
			this.pages = pages
			this.read = read
			this.id = id
		}

		get info() {
			console.log(
				`${this.title} by ${this.author}, ${this.pages} pages, ${
					this.read ? 'read' : 'not read yet'
				}`
			)
		}
	}

	// --- LIBRARY CLASS ---
	class Library {
		constructor() {
			this.books = [
				{
					title: 'Terminal List',
					author: 'Jack Carr',
					pages: 350,
					read: true,
					id: crypto.randomUUID()
				}
			]
		}

		addBook(book) {
			this.books.push(book)
		}

		updateBook(updatedBook) {
			const index = this.books.findIndex(book => book.id === updatedBook.id)
			if (index !== -1) {
				this.books[index] = updatedBook
			}
		}

		getBookById(id) {
			return this.books.find(book => book.id === id)
		}

		removeBook(id) {
			const index = this.books.findIndex(book => book.id === id)
			if (index !== -1) {
				this.books.splice(index, 1)
			}
		}

		getAllBooks() {
			return this.books
		}
	}

	const library = new Library()

	// --- MODAL CONTROLS ---
	function openModal() {
		modal.classList.add('modal-open')
		document.body.style.overflow = 'hidden'
	}

	function closeModal() {
		modal.classList.remove('modal-open')
		document.body.style.overflow = 'auto'
		bookForm.reset()
		bookIdToEdit = null
		modalMode = 'add'
		submitBtn.textContent = 'Add new book'
	}

	addBookBtn.addEventListener('click', () => {
		modalMode = 'add'
		bookForm.reset()
		submitBtn.textContent = 'Add new book'
		openModal()
	})

	closeBtn.addEventListener('click', closeModal)

	// Close modal if user clicks outside the modal
	window.addEventListener('click', e => {
		if (e.target === modal) {
			closeModal()
		}
	})

	// Close modal if user presses escape key
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape' && modal.classList.contains('modal-open')) {
			closeModal()
		}
	})

	function displayBooks() {
		libraryContainer.innerHTML = ''

		library.getAllBooks().forEach(book => {
			const card = document.createElement('div')
			card.classList.add('book-card')
			card.dataset.bookId = book.id

			card.innerHTML = `
        <div class="card-header">
          <h2 class="book-title">${book.title}</h2>
          <p class="book-author">${book.author}</p>
        </div>
        <div class="card-body">
          <p class="book-pages">${book.pages} pages</p>
          <p class="book-text">${book.read ? 'Read' : 'Not read yet'}</p>
        </div>
        <div class="card-footer">
          <button class="delete-btn" data-book-id="${
						book.id
					}">Delete Book</button>
          <button class="edit-btn" data-book-id="${book.id}">Edit Book</button>
        </div>
        `

			libraryContainer.appendChild(card)

			const deleteBtn = card.querySelector('.delete-btn')
			deleteBtn.addEventListener('click', function () {
				const bookIdToDelete = this.dataset.bookId
				library.removeBook(bookIdToDelete)
				displayBooks()
			})

			const editBtn = card.querySelector('.edit-btn')
			editBtn.addEventListener('click', function () {
				modalMode = 'edit'
				bookIdToEdit = this.dataset.bookId
				const bookToEdit = library.getBookById(bookIdToEdit)

				if (bookToEdit) {
					document.getElementById('title').value = bookToEdit.title || ''
					document.getElementById('author').value = bookToEdit.author || ''
					document.getElementById('pages').value = bookToEdit.pages || ''
					document.getElementById('read').checked = bookToEdit.read || false
					submitBtn.textContent = 'Save changes'
					openModal()
				}
				displayBooks()
			})
		})
	}

	// --- FORM SUBMISSION ---
	bookForm.addEventListener('submit', e => {
		e.preventDefault()

		const title = document.getElementById('title').value
		const author = document.getElementById('author').value
		const pages = parseInt(document.getElementById('pages').value, 10)
		const read = document.getElementById('read').checked

		// Validate input
		if (
			title.trim() === '' ||
			author.trim() === '' ||
			isNaN(pages) ||
			pages <= 0
		) {
			alert('Please fill in all fields correctly.')
			return
		}

		if (modalMode === 'edit' && bookIdToEdit) {
			const updatedBook = new Book(title, author, pages, read, bookIdToEdit)
			library.updateBook(updatedBook)
			bookIdToEdit = null
		} else {
			const id = crypto.randomUUID()
			const newBook = new Book(title, author, pages, read, id)
			library.addBook(newBook)
		}

		// Add new book to library
		displayBooks() // Display updated library
		closeModal() // Close modal
	})

	// Initial display of books if any exist in myLibrary
	if (libraryContainer) {
		displayBooks()
	} else {
		console.error('Library container not found. Books cannot be displayed.')
	}

	console.log(library.books[0])
})
