let pokemonRepository = (function() {


  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let pokemonModalContent= document.createElement('div');


  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        }
        add(pokemon);
        console.log(pokemon);
      })
    }).catch(function(error) {
      console.log(error);
    });
  };

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(error) {
      console.log(error);
    });
  }


  function addListItem(pokemon) {
    let pokemonOrder = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listItem.appendChild(button);
    pokemonOrder.appendChild(listItem);
    button.addEventListener('click', function() { showDetails(pokemon) });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      //left console log for sanity check
      console.log(item);
      showModal(item);
})};

      function showModal(item){
        let pokemonModalContainer = document.querySelector('#pokemon-modal-container');
        let pokemonModalContent= document.createElement('div');
        //Clear all existing modal content
        pokemonModalContainer.innerHTML = ''


        pokemonModalContent.classList.add('show-pokemon-modal');

        let pokemonName = item.name;
        let pokemonHeight = item.height;
        let pokemonImage = item.imageUrl;


        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h4');
        titleElement.innertext = pokemonName;

        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', pokemonImage);
        imageElement.setAttribute('alt', "Poke-IMG")

        let heightElement = document.createElement('p');
        heightElement.innertext = pokemonHeight;

        console.log(titleElement);
        console.log(heightElement);

        pokemonModalContent.classList.add('is-visible');

        pokemonModalContent.appendChild(closeButtonElement);
        pokemonModalContent.appendChild(titleElement);
        pokemonModalContent.appendChild(imageElement);
        pokemonModalContent.appendChild(heightElement);
        pokemonModalContainer.appendChild(pokemonModalContent);

        pokemonModalContainer.classList.add('is-visible')

        function hideModal() {
    pokemonModalContainer.classList.remove('is-visible');
  }

      };

  //function hideModal() {
 //   pokemonModalContainer.classList.remove('is-visible');
//  }

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
