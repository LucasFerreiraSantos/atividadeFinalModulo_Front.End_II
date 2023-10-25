// GERADOR DA LISTA DE CARDS
let currentPage = 1;
const characterContainer = document.querySelector(".character_list");
const input_search_character = document.getElementById("btn_search_character");

async function getCharacters(page = 1, name = "") {
  const params = {
    page,
    name
  };

  await fetch("https://rickandmortyapi.com/api/character", {
    params,
  })
    .then((res) => {
      res.json().then((data) => {
        const characters = data.results;

        characters.forEach((character) => {
          const card = document.createElement("div");
          card.classList.add("character_card");

          card.innerHTML = `
        <img src="${character.image}" alt="#">
        <div>
        <h3><strong>${character.name}</strong></h3>
        <p><strong>${character.status} - ${character.species}</strong></p>
        <p>última localização conhecida</p>
        <p><strong>${character.location.name}</strong></p>
        </div>
      `;
          characterContainer.appendChild(card);
        });
      });
    })
    .catch((err) =>
      console.error("Não foi possível encontrar a informação", err)
    );
}

// PEGAR O TOTAL DE PERSONAGENS
async function totalCharacters() {
  const data_api = document.getElementById("data_api");

  await fetch("https://rickandmortyapi.com/api/character")
    .then((res) => {
      res.json().then((data) => {
        const characters = data;
        data_api.innerHTML = `
        <p>PERSONAGENS: ${characters.info.count}</p>
        <p>EPISÓDIOS: ${characters.results[0].episode.length}</p>
        `;
      });
    })
    .catch((err) => console.error("Não é possível achar a informação", err));
}

// VOLTAR UMA PÁGINA
function previousPage() {
  characterContainer.innerHTML = "";
  if (currentPage >= 1) {
    currentPage--;
    getCharacters(currentPage);
  }
}

const btnPaginatePrevious = document.getElementById("btnPaginatePrevious");
btnPaginatePrevious.addEventListener("click", previousPage);

// AVANÇAR UMA PÁGINA
function nextPage() {
  characterContainer.innerHTML = "";
  if (currentPage < 42) {
    currentPage++;
    getCharacters(currentPage);
  }
}

const btnPaginateNext = document.getElementById("btnPaginateNext");
btnPaginateNext.addEventListener("click", nextPage);

// PESQUISAR POR NOME
input_search_character.addEventListener("input", () => {
  currentPage = 1;
  getCharacters(currentPage, input_search_character.value);
});

getCharacters();
totalCharacters();
