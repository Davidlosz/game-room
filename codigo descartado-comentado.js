
//Muestra un mensaje de advertencia si el navegador no soporta Drag & Drop. (En Windows no lo soportan ni IE ni Safari)

// function comprobarNavegador() 
// {
//   if((navigator.userAgent.toLowerCase().indexOf('msie ') > -1) || ((navigator.userAgent.toLowerCase().indexOf('safari') > -1) && (navigator.userAgent.toLowerCase().indexOf('chrome') == -1)))
//   {
//     alert("Tu navegador no soporta correctamente las funciones Drag & Drop de HTML5. Prueba con otro navegador.");
//   }

// }



// let arreglo=[151];

// function allowDrop(event)
// {
//     event.preventDefault();
// }

// function drag(event)
// {
//     event.dataTransfer.setData("text", event.target.id);
// }

// function drop(event)
// {
//     if(arreglo[parseInt(event.target.id)]=="")
//     {
//         let data=event.dataTransfer.getData("text");
//     }

//     arreglo[parseInt(event.target.id)]=data;
//     event.target.appendChild(document.getElementById(data));

//     for(let i=1; i<=151; i++)
//     {
//         if(arreglo[i]==arreglo.length)
//         {
//             document.querySelector("h1").innerHTML="¡Genial!";
//         }
//         else 
//         {
//             document.querySelector("h1").innerHTML="¡Incorrecto!";
//         }
//     }
// }



//PARA ARRASTRAR LAS "img" (CAJA) AL "section" (CONTENEDOR) 

// const caja=document.querySelector('.pokemon-img');
// const contenedor=document.querySelector('.colocados');

// contenedor.addEventListener('dragenter', e =>
// {
// 	console.log('Seleccionado');
// });
	
// contenedor.addEventListener('dragleave', e =>
// {
// 	console.log('Arrastrando...');
// });

// contenedor.addEventListener('dragover', e =>
// {
//     e.preventDefault();
//     console.log('Arrastrado');
// });

// contenedor.addEventListener('drop', e =>
// {
//     contenedor.appendChild(caja);
// 	   console.log('drop');
// });



//PARA ORDEN ALEATORIO DE LAS IMG

// function getRandomId(max)
// {
//     return max[Math.floor(Math.random()*max.length)];
// }



//INTENTO DE INTERCAMBIAR POSICIONES, CUANDO SE ARRASTREN...

// let pokemonPulsado=false;
// let pokemons=document.querySelectorAll('.image');

// function pulsarPoke() 
// {
//     if(pokemonPulsado==true)
//     {
//         // pokemon.addEventListener('click', event =>
//         // {
//         //     event.dataTransfer.setData('position', event.target.id);
//         // })

//         pokemon.addEventListener('drag', event =>
//         {
//             event.dataTransfer.setData('image', event.target.pokemons);
//         })
//      } 
// }


//parseInt("", 0); --> para convertir un texto en numero





// Version del código, aun sin funcionar, con la misma funcionalidad...


// const numPokes=151;

// for(let i=1; i<=numPokes; i++)
// {
//     let id=getRandomId(151);
//     searchPokemonById(id);
// }

// function getRandomId(max)
// {
//     return Math.floor(Math.random()*max)+1;
// }

// let draggableElements=document.querySelector('.draggable-elements');
// let droppableElements=document.querySelector('.droppable-elements');
// let pokemonSearched=[];
// let pokemonNames=[];

// async function searchPokemonById(id) 
// {
//     const res=await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
//     const data=await res.json();
//     pokemonSearched.push(data);
//     pokemonNames.push(data.name);

//     pokemonNames=pokemonNames.sort(()=>Math.random()-0.5);

//     draggableElements.innerHTML='';
//     pokemonSearched.forEach(pokemon =>
//     {
//         draggableElements.innerHTML+=
//         `
//         <div class="pokemon">
//             <img id="${pokemon.name}" draggable="true" class="image" src="${pokemon.sprites.other['official.artwork']}"
//         </div>
//         `;
//     })

//     pokemonNames.forEach(name =>
//     {
//         droppableElements.innerHTML+=
//         `
//         <div class="names">
//             <p>${name}</p>
//         </div>
//         `;
//     })

//     let pokemons=document.querySelectorAll('.image');
//     pokemons=[...pokemons];
//     pokemons.forEach(pokemon =>
//     {
//         pokemon.addEventListener('dragstart', event =>
//         {
//             event.dataTransfer.setData('text', event.target.id);
//         })
//     })

//     let names=document.querySelectorAll('.names');
//     let wrongMsg=document.querySelector('.wrong');
//     let points=0;
//     names=[...names];
//     names.forEach(name =>
//     {
//         name.addEventListener('draggover', event =>
//         {
//             event.preventDefault();
//         });
//         name.addEventListener('drop', event =>
//         {
//             const draggableElementData=event.dataTransfer.getData('text');
//             let pokemonElement=document.querySelector(`#${draggableElementData}`);
//             console.log(pokemonElement);

//             if(event.target.innerHTML==draggableElementData)
//             {
//                 console.log('Si');
//                 points++;
//                 event.target.innerHTML='';
//                 event.target.appendChild(pokemonElement);
//                 wrongMsg.innerHTML='';

//                 if(points==numPokes)
//                 {
//                     draggableElements.innerHTML=`<p class="win">Pokedex ordenada y completada</p>`;
//                 }
//             }
//             else
//             {
//                 console.log('No');
//                 wrongMsg.innerHTML='Ups!';
//             }
//         })
//     })
// }