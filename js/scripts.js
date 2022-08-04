let pokemonRepository = (function (){


  let pokemonList= [
    {name:'Bulbasaur', height: 7, types:['grass','poison']},
    {name:'Charmander', height: 6, types:'fire'},
    {name:'Squirtle', height: 5, types:'water'}
  ];

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

  function showDetails(pokemon){
    console.log(pokemon);
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
  }

})();

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
});
