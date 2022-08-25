let pokemonRepository = (function() {


  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //let pokemonModalContainer = document.querySelector('#pokemon-modal-container');


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
    button.classList.add('btn');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonDetailModal')
    //button.classList.add('btn-primary')
    listItem.classList.add('pokemon-list');
    listItem.classList.add('group-list-item');
    listItem.appendChild(button);
    pokemonOrder.appendChild(listItem);
    button.addEventListener('click', function() { showDetails(pokemon) });
  }


  function showDetails(item) {
    loadDetails(item).then(function() {
      //left console log for sanity check
      console.log(item);
      showModal(item);
    })
  };

 function showModal(item) {
   // let pokemonModalContainer = document.querySelector('#pokemon-modal-container');
   // pokemonModalContainer.innerHTML = ''
   // let pokemonModalContent = document.createElement('div');

    let modalBody = $(".modal-body");
   // let modalHeader = $(".modal-header");
    let pokemonName = $(".pokemon-name");

    //Clear all existing modal content


    pokemonName.empty();
    modalBody.empty();

    //pokemonModalContent.classList.add('show-pokemon-modal');
    //pokemonModalContent.classList.add('modal-content');



  /*  let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);*/

    let titleElement = $("<h1>" + item.name + "</h1>");

    //titleElement.innerText = item.name;
    //titleElement.classList.add('pokemon-name');

   //let imageElement = $('<img class='modal-img'>');
    //imageElement.setAttribute('src', item.imageUrl);
    //imageElement.setAttribute('alt', "Poke-IMG");

    let heightElement = $('<p>' + 'Height: ' + item.height +'</p>');

    //heightElement.innerText = 'Height: ' + item.height;
    //heightElement.classList.add('modal-body');

    //console.log(titleElement);
    //console.log(heightElement);

    pokemonName.append(titleElement);
//modalBody.append(imageElement);
    modalBody.append(heightElement);

    //pokemonModalContent.classList.add('is-visible');

    //pokemonModalContent.appendChild(closeButtonElement);
   // pokemonModalContent.appendChild(titleElement);
    //pokemonModalContent.appendChild(imageElement);
    //pokemonModalContent.appendChild(heightElement);
    //pokemonModalContainer.appendChild(pokemonModalContent);

    //pokemonModalContainer.classList.add('is-visible');*/
 }

    function hideModal() {
      pokemonModalContainer.classList.remove('is-visible');
    }



  function hideModal() {
    pokemonModalContainer.classList.remove('is-visible');
  }

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
