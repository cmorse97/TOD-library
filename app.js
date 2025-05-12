document.addEventListener('DOMContentLoaded', () => {
	const addBookBtn = document.querySelector('.new-book-btn')
	const modal = document.getElementById('add-book-modal')
	const closeBtn = document.querySelector('.close-btn')
	const bookForm = document.getElementById('book-form')
	const libraryContainer = document.querySelector('.library-container')
	const submitBtn = document.querySelector('button[type="submit"]')

	let modalMode = 'add'
	let bookIdToEdit = null

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

	// --- LIBRARY FUNCTIONALITY ---
	const myLibrary = [
		{
			title: 'Terminal List',
			author: 'Jack Carr',
			pages: 350,
			read: true,
			id: crypto.randomUUID()
		}
	]

	function Book(title, author, pages, read, id) {
		// the constructor...
		this.title = title // text
		this.author = author // text
		this.pages = pages // number
		this.read = read // boolean
		this.id = id
		this.info = function () {
			console.log(
				`${this.title} by ${this.author}, ${this.pages} pages, ${
					this.read ? 'read' : 'not read yet'
				}`
			)
		}
	}

	function addBookToLibrary(title, author, pages, read, id) {
		// take params, create a book then store it in the library
		const book = new Book(title, author, pages, read, id)

		myLibrary.push(book)
	}

	function updateBookInLibrary(title, author, pages, read, id) {
		const bookIndex = myLibrary.findIndex(book => book.id === id)
		if (bookIndex !== -1) {
			myLibrary[bookIndex] = { title, author, pages, read, id }
		}
	}

	function displayBooks() {
		libraryContainer.innerHTML = ''

		myLibrary.forEach(book => {
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
				const bookToDelete = myLibrary.findIndex(
					book => book.id === bookIdToDelete
				)
				myLibrary.splice(bookToDelete, 1)
				displayBooks()
			})

			const editBtn = card.querySelector('.edit-btn')
			editBtn.addEventListener('click', function () {
				modalMode = 'edit'
				bookIdToEdit = this.dataset.bookId
				const bookToEdit = myLibrary.find(book => book.id === bookIdToEdit)

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
			updateBookInLibrary(title, author, pages, read, bookIdToEdit)
			bookIdToEdit = null
		} else {
			const id = crypto.randomUUID()
			addBookToLibrary(title, author, pages, read, id)
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
})
