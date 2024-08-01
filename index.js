const myLibrary = [];

function Book(title, author, isRead, pages) {
  this.title = title;
  this.author = author;
  this.isRead = isRead;
  this.pages = pages;
}

function newBook() {
  document.getElementById("new-book").onclick = () => {
    document.getElementById("form").style.display = "block";
    document.getElementById("new-book").style.display = "none";
  };
}

function addBookToLibrary(event) {
  const fields = ["title", "author", "pages", "is-read"];

  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let isRead = document.getElementById("is-read").checked;

  myLibrary.push(new Book(title, author, isRead, pages));
  fields.forEach((id) => (document.getElementById(id).value = ""));
  document.getElementById("is-read").checked = false;
  displayLibrary();
  document.getElementById("form").style.display = "none";
  document.getElementById("new-book").style.display = "block";

  event.preventDefault();
}

function displayLibrary() {
  let libraryHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    libraryHTML += `
      <div class="book">
        <p><span>Title</span>: ${myLibrary[i].title}</p>
        <p><span>Author</span>: ${myLibrary[i].author}</p>
        <p><span>Pages</span>: ${myLibrary[i].pages}</p>
        <button data-index="${i}"class=${
      myLibrary[i].isRead ? "book-is-read" : "book-not-read"
    }></button>
            <button class="remove-book" data-index="${i}">Remove</button>
      </div>
    `;
  }
  document.getElementById("books").innerHTML = libraryHTML;

  const removeButtons = document.querySelectorAll(".remove-book");
  removeButtons.forEach((button) => {
    button.addEventListener("click", handleRemove);
  });
  const statusButtons = document.querySelectorAll(
    ".book-is-read, .book-not-read"
  );
  statusButtons.forEach((button) => {
    button.addEventListener("click", toggleReadStatus);
  });
}

function handleRemove(event) {
  const index = event.target.getAttribute("data-index");
  myLibrary.splice(index, 1);
  displayLibrary();
}

function toggleReadStatus(event) {
  const index = event.target.getAttribute("data-index");
  console.log(index, "hissidisd");
  myLibrary[index].isRead = !myLibrary[index].isRead;
  displayLibrary();
}

console.log(myLibrary);
const form = document.getElementById("form");
form.addEventListener("submit", addBookToLibrary);

function init() {
  displayLibrary();
  newBook();
}

init();
