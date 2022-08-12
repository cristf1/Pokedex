let pokemonRepository = (function() {


  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

      //function to show Modal
      function showModal(){
        //I am adding a class
        let pokemonModal = document.querySelector('.button-class');
        pokemonModal.classList.add('show-pokemon-modal')
        let pokemonModalDetail = document.createElement('h1');
        pokemonModalDetail.innertext = 'Hi';
        pokemonModal.appendChild(pokemonModalDetail);
      }
})};

      /*function showModal(item){

  })};
        let pokemonName = item.name;
        let pokemonHeight = item.height;
        let pokemonImage = item.imageUrl;


          let closeButtonElement = document.createElement('button');
          closeButtonElement.classList.add('modal-close');
          closeButtonElement.innerText = 'Close';
          closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innertext = pokemonName

        let imageElement = document.createElement('p');
        imageElement.innertext = pokemonImage;

        let heightElement = document.createElement('p');
        heightElement.innertext = pokemoneHeight;

        pokemonModal.classList.add('is-visible');

        pokemonModal.appendChild(closeButtonElement);
        pokemonModal.appendChild(titleElement);
        pokemonModal.appendChild(imageElement);
        pokemonModal.appendChild(heightElement);

      };*/






  // document.querySelector('.pokemon-modal').addEventListener('click', () => {
    //showModal();
  //});

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
