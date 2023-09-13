const data_api = document.getElementById("data_api");

// PEGUEI O TOTAL DE PERSONAGENS
function totalCharacters() {
  fetch("https://rickandmortyapi.com/api/character")
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

// GERADOR DA LISTA DE CARDS
function getCharacters() {
  const characterContainer = document.querySelector(".character_list");
  fetch("https://rickandmortyapi.com/api/character")
    .then((res) => {
      res.json().then((data) => {
        const characters = data.results;

        characters.forEach((character) => {
          // BUSCAR O ÚLTIMO EPISÓDIO
          async function lastEpisode(character) {
            const ep = (await character.episode.length) - 1;
            try {
              const response = await fetch(`${character.episode[ep]}`).then(
                (value) => value.json()
              );
              return response.name;
            } catch (error) {
              console.log("Erro no Get:", error);
            }
          }

          const lastEp = lastEpisode(character);

          const card = document.createElement("div");
          card.classList.add("character_card");

          card.innerHTML = `
        <img src="${character.image}" alt="#">
        <div>
        <h3><strong>${character.name}</strong></h3>
        <p><strong>${character.status} - ${character.species}</strong></p>
        <p>última localização conhecida</p>
        <p><strong>${character.location.name}</strong></p>
        <p>visto a última vez em:</p>
        <p><strong>${lastEp}</strong></p>
        </div>
      `;
          characterContainer.appendChild(card);
        });
      });
    })
    .catch((err) => console.error("Não é possível achar a informação", err));
}

getCharacters();
totalCharacters();
