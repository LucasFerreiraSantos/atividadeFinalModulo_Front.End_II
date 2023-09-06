const data_api = document.getElementById("data_api");

async function totalCharacters() {
  await fetch("https://rickandmortyapi.com/api/character")
    .then((res) => {
      res.json().then((data) => {
        const characters = data.info;
        data_api.innerHTML = `
        <p>PERSONAGENS: ${characters.count}</p>
        `;
      });
    })
    .catch((err) => console.error("Não é possível achar a informação", err));
}

async function getCharacters() {
  const characterContainer = document.querySelector(".character_list");
  await fetch("https://rickandmortyapi.com/api/character")
    .then((res) => {
      res.json().then((data) => {
        const characters = data.results;

        characters.map((character) => {
          const card = document.createElement("div");
          card.classList.add("character_card");

          card.innerHTML = `
        <img src="${character.image}" alt="#">
        <div>
        <h3>${character.name}</h3>
        <p>${character.status}</p>
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
//   console.log(data);
//   const data_api = document.getElementById("data_api");
//   const container_characters = document.getElementById(
//     "container_characters"
//   );
//   const quantCharacter = data.info.count;
//   data_api.innerHTML = `
//     <p>PERSONAGENS: ${quantCharacter}</p>
//     `;
//   const characters = data.results;
//   return characters.forEach((character) => {
//     container_characters.innerHTML = `
//       <div>
//       <img src="${character.image}"></img>
//       </div>
//       <div>
//       <h5>${character.name}</h5>
//       <p>${character.status}</p>
//       <p>${character.species}</p>
//       </div>
//       `;
//   });
// })
// .catch((err) => {
//   console.error("A requisição falhou!", err);
// })

// const fetchApiSearch = (value) => {
//   const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
//     .then((res) => res.json())
//     .then((data) => {
//       return data;
//     });

//   return result;
// };

// btn_search_character.addEventListener("click", (e) => {
//   e.preventDefaulf();
//   const result = fetchApiSearch(id_character.value);
//   container_characters.innerHTML = result;
// });
