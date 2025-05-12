document.addEventListener('DOMContentLoaded', () => {
	const addBookBtn = document.querySelector('.new-book-btn')
	const modal = document.getElementById('add-book-modal')
	const closeBtn = document.querySelector('.close-btn')
	const addBookForm = document.getElementById('add-book-form')
	const libraryContainer = document.querySelector('.library-container')

	// --- MODAL CONTROLS ---
	function openModal() {
		modal.classList.add('modal-open')
		document.body.style.overflow = 'hidden'
	}

	function closeModal() {
		modal.classList.remove('modal-open')
		document.body.style.overflow = 'auto'
		addBookForm.reset()
	}

	addBookBtn.addEventListener('click', openModal)
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

	function displayBooks() {
		libraryContainer.innerHTML = ''

		myLibrary.forEach((book, index) => {
			const card = document.createElement('div')
			card.classList.add('book-card')
			if (book.showText) {
				card.classList.add('show-text')
			}
			card.dataset.index = index

			card.innerHTML = `
        <div class="card-header">
          <h2 class="book-title">${book.title}</h2>
          <p class="card-author">${book.author}</p>
        </div>
        <div class="card-body">
          <p class="book-pages">${book.pages} pages</p>
          <p class="book-text">${book.read ? 'Read' : 'Not read yet'}</p>
        </div>`

			libraryContainer.appendChild(card)
		})
	}

	// --- FORM SUBMISSION ---
	addBookForm.addEventListener('submit', e => {
		e.preventDefault()

		const title = document.getElementById('title').value
		const author = document.getElementById('author').value
		const pages = parseInt(document.getElementById('pages').value, 10)
		const read = document.getElementById('read').checked
		const id = crypto.randomUUID()

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

		// Add new book to library
		addBookToLibrary(title, author, pages, read, id)
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
