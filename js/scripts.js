let pokemonRepository = (function (){


  let pokemonList= [
    {name:'Bulbasaur', height: 7, types:['grass','poison']},
    {name:'Charmander', height: 6, types:'fire'},
    {name:'Squirtle', height: 5, types:'water'}
  ];

  pokemonList.forEach(pokemonPrint)

  function pokemonPrint(pokemon){
    document.write("<br>" + pokemon.name + " (height: " + pokemon.height + ")" );
      if (pokemon.height > 6){
        document.write(" - Wow that\'s big!")
        }
      else {"<br>"
    }
  };

  function getAll(){
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
  }

})();

pokemonRepository.getAll();
