let pokemonRepository = (function (){


  let pokemonList= [];
  let apiUrl= 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function loadList() {
    return fetch(apiUrl).then(function(response){
      return response.json();
    }).then(function(json){
      json.results.forEach(function(item){
        let pokemon ={
          name: item.name,
          detailsUrl:item.url,
        }
        add(pokemon);
        console.log(pokemon);
      })
    }).catch(function(error){
      console.log(error);
    });
  };

  function loadDetails(item) {
   let url = item.detailsUrl;
   return fetch(url).then(function (response) {
     return response.json();
   }).then(function (details) {
     item.imageUrl = details.sprites.front_default;
     item.height = details.height;
     item.types = details.types;
   }).catch(function (error) {
     console.log(error);
   });
 }

    function showDetails(item){
    pokemonRepository.loadDetails(item).then(function(){
    console.log(item);
   });
  }

  function addListItem(pokemon){
    let pokemonOrder= document.querySelector('.pokemon-list');
    let listItem= document.createElement('li');
    let button = document.createElement('button');
    button.innerText= pokemon.name;
    button.classList.add('button-class');
    listItem.appendChild(button);
    pokemonOrder.appendChild(listItem);
    button.addEventListener('click', function() {showDetails(pokemon)});
  }



  function getAll(){
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
    loadDetails:loadDetails,
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
