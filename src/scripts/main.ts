import {
  containerButtons,
  countMovie,
  moviesTable,
  pageTitle,
  paginationContainer,
  searchInput,
} from "./elements";
import type { MovieData, Movies } from "./type";
let currentPage = 1;
const moviePerPage = 5;

function loadData(callback: (data: MovieData) => void) {
  fetch("src/data/data-base.json")
    .then((res) => res.json())
    .then((data: MovieData) => {
      callback(data);
    })
    .catch((err) => console.log("Malumot olinmadi!"));
}

loadData((data) => {
  const movies = data["all-movies"];
  const shuffledMovies = [...movies].sort(() => Math.random() - 0.5);

  renderWithPagination(shuffledMovies);

  searchInput!.addEventListener("input", (event: Event) => {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredMovies = movies.filter((mov) =>
      mov.genre.name.toLowerCase().includes(value)
    );
    renderWithPagination(filteredMovies);
  });

  containerButtons.addEventListener("click", (event: MouseEvent) => {
    const btn = event.target as HTMLButtonElement;
    const button = btn.getAttribute("data-category");
    if (!button) return;
    pageTitle.innerHTML = `${
      button.charAt(0).toUpperCase() + button.slice(1)
    } Movies`;
    const filteredMovies =
      button === "all"
        ? movies
        : movies.filter(
            (mov) => mov.genre.name.toLowerCase() === button.toLowerCase()
          );

    const allBtns = containerButtons.querySelectorAll(
      ".list-group-item"
    ) as NodeListOf<HTMLButtonElement>;
    allBtns.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");

    currentPage = 1; 
    renderWithPagination(filteredMovies);
  });
});

function renderWithPagination(movies: Movies[]) {
  const totalPages = Math.ceil(movies.length / moviePerPage);
  const start = (currentPage - 1) * moviePerPage;
  const end = start + moviePerPage;
  const paginatedMovies = movies.slice(start, end);

  renderMovies(paginatedMovies);
  renderPaginationButtons(movies, totalPages);
}

function renderPaginationButtons(movies: Movies[], totalPages: number) {
  paginationContainer.innerHTML = ""; 
  for (let i = 1; i <= totalPages; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = i.toString();
    listItem.className = `page-item page-link ${
      i === currentPage ? "active" : ""
    }`;

    listItem.addEventListener("click", () => {
      currentPage = i;
      renderWithPagination(movies);
    });

    paginationContainer.appendChild(listItem);
  }
}

function renderMovies(movies: Movies[]) {
  countMovie!.textContent = movies.length.toString();
  moviesTable.innerHTML = "";
  movies.forEach((movie) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><a class="movie-title" href="#">${movie.title}</a></td>
      <td>${movie.genre.name}</td>
      <td>${movie.numberInStock}</td>
      <td>$${movie.dailyRentalRate}</td>
    `;
    moviesTable.append(tr);
  });
}
function openLoginPage(): void {
  const mainPage = document.getElementById("mainPage") as HTMLElement;
  const loginPage = document.getElementById("loginPage") as HTMLElement;

  if (mainPage && loginPage) {
    mainPage.style.display = "none";
    loginPage.style.display = "block";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm") as HTMLFormElement;

  loginForm.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // Пример: простая проверка (в реальных проектах отправляется на сервер)
    if (email === "admin@gmail.com" && password === "1234") {
      alert("Login successful!");
    } else {
      alert("Invalid email or password.");
    }
  });
});
