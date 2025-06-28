import {
  containerButtons,
  countMovie,
  moviesTable,
  searchInput,
} from "./elements";
import type { MovieData, Movies } from "./type";

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
  // const genres = data["filtered-movie"];
  const shuffledMovies = [...movies].sort(() => Math.random() - 0.5);
  renderMovies(shuffledMovies);

  searchInput!.addEventListener("input", (event: Event) => {
    const value = (event.target as HTMLInputElement).value.toLowerCase();

    const filteredMovie = movies.filter((mov) =>
      mov.genre.name.toLowerCase().includes(value)
    );

    renderMovies(filteredMovie);
  });
  containerButtons.addEventListener("click", (event: MouseEvent) => {
    const btn = event.target as HTMLButtonElement;
    const button = btn.getAttribute("data-category");
    if (!button) return;

    const filteredMovie =
      button === "all"
        ? movies
        : movies.filter(
            (mov) => mov.genre.name.toLowerCase() === button.toLowerCase()
          );
    renderMovies(filteredMovie);
    const allBtns = containerButtons.querySelectorAll(
      ".list-group-item"
    ) as NodeListOf<HTMLButtonElement>;
    allBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");
  });
});

function renderMovies(movies: Movies[]) {
  countMovie!.textContent = movies.length.toString();
  moviesTable.innerHTML = "";
  movies.forEach((movie) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
                  <td><a href="#">${movie.title}</a></td>
                  <td>${movie.genre.name}</td>
                  <td>${movie.numberInStock}</td>
                  <td>$${movie.dailyRentalRate}</td>
                `;
    moviesTable.append(tr);
  });
}function openLoginPage(): void {
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
