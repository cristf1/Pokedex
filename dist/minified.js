let pokemonRepository=function(){let d=[];function a(a){return fetch(a.detailsUrl).then(function(a){return a.json()}).then(function(b){a.imageUrl=b.sprites.front_default,a.height=b.height,a.types=b.types,a.weight=b.weight}).catch(function(a){console.log(a)})}function b(){return d}function c(a){d.push(a)}return{getAll:b,add:c,addListItem:function(d){let e=document.querySelector(".pokemon-list"),c=document.createElement("li"),b=document.createElement("button");b.innerText=d.name,b.classList.add("btn"),b.setAttribute("data-toggle","modal"),b.setAttribute("data-target","#modal-container"),c.classList.add("pokemon-list"),c.classList.add("group-list-item"),c.appendChild(b),e.appendChild(c),b.addEventListener("click",function(){(function(b){a(b).then(function(){var a;let c,d,f,e,g,h;console.log(b),a=b,c=$(".modal-body"),d=$(".pokemon-name"),d.empty(),c.empty(),f=$("<h1>"+a.name+"</h1>"),e=$('<img class="pokemon-img">'),e.attr("src",a.imageUrl),g=$("<p>Height: "+a.height+"</p>"),h=$("<p>Weight: "+a.weight+"</p>"),d.append(f),c.append(g),c.append(h),c.append(e)})})(d)})},loadList:function(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(a){return a.json()}).then(function(a){a.results.forEach(function(a){let b={name:a.name,detailsUrl:a.url};c(b),console.log(b)})}).catch(function(a){console.log(a)})},loadDetails:a}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(a){pokemonRepository.addListItem(a)})})
