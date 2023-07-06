
// PASOS QUE QUEDAN POR HACER: 
  // 0. Hacer que el tiempo no transcurra, mientras no empiece el juego  
  // 1. SACAR EL ORDEN CORRECTO DE LA POKEDEX, PARA CORREGIR LOS SALTOS SIN SENTIDO EN LA PANTALLA
  // 2. Aplicar un numero aleatorio para el orden de aparicion de las imagenes
  // 3. Corregir la funcionalidad de "pinchar y arrastar" o pulsar "boton-boton", para jugar con el orden
  // 4. Verificar con "verdadero y falso" si el orden introducido es el correcto 
  // 5. Si el orden ha sido colocado correctamente, dentro del tiempo...saldrá la pantalla de ÉXITO



window.onload=actualizadorTiempo; //ejecuta antes de todo, por pantalla, una funcion determinada

// window.addEventListener("load", (event) => 
// {
//     console.log("cancion cargada");
//     const audio1= new Audio("Welcome to the World of Pokémon! 2.mp3"); // INTENTO DE AÑADIR Y ACTIVAR-DESACTIVAR LAS MUSICAS, SEGUN LAS ESCENAS
    
//     audio("Welcome to the World of Pokémon! 2.mp3")
    
//         .then((cancion)=>{cancion.autoplay;})
//         .catch((err)=>{console.log(err);});
// });

// function audio(url){
//     return new Promise((resolve, reject)=>{
//         const audio1= new Audio(url); // INTENTO DE AÑADIR Y ACTIVAR-DESACTIVAR LAS MUSICAS, SEGUN LAS ESCENAS
//         resolve (audio1);
//         reject("No se ha cargado el audio");
//     });
// }


let tiempo;

function actualizadorTiempo()
{
    document.getElementById('contador').innerHTML=tiempo; //mostramos el contador/cuenta atras
        
    if(tiempo==-1) //si el tiempo se acaba...
    {
        // alert("Se acabó el tiempo"); //mostramos un pop-up
        tiempoAcabado(); //y cargamos la funcion 
    }
    else //en caso de que el tiempo no se haya acabado aún...
    {
        tiempo--; //va disminuyendo...
        setTimeout("actualizadorTiempo()", 2000); //contador matematico (1000 equivale a 10 segundos)
    }
}


// const audio1= new Audio("Welcome to the World of Pokémon! 2.mp3"); // INTENTO DE AÑADIR Y ACTIVAR-DESACTIVAR LAS MUSICAS, SEGUN LAS ESCENAS
// const audio2= new Audio("Welcome to the World of Pokémon! 1.mp3");

//volume=0.2   //para reducir el volumen de las musicas

// const audio1=getElementById("music1");
// const audio2=getElementById("music2");

//audio1.play()


function juegoIniciado() //funcion que se iniciará al pulsar el boton empezar (Aceptar el reto) en Hmtl
{
    document.getElementById("pantalla-inicio").style.display="none"; //ocultamos la pantalla de inicio, aplicando/modificando la propiedad "display" a "none" desde el style (css) 
    document.getElementById("pantalla-juego").style.display="block"; //cargamos la pantalla de juego, aplicando/modificando la propiedad "display" a "block" desde el style (css)
    // audio1.pause();
    // audio2.play();
    tiempo=151; //mantenemos el tiempo y lo reiniciamos, en caso de que se esté rejugando...
    actualizadorTiempo();
    //tiempo.preventDefault();
}

function tiempoAcabado() //funcion que se iniciará al acabarse el tiempo
{
    document.getElementById("pantalla-juego").style.display="none";
    window.alert("Se acabó el tiempo"); //mostramos un pop-up
    // window.prompt("PUES..."); //mostramos un pop-up que permite introducir datos
    // window.confirm("OK");  //mostramos un pop-up que permite aceptar datos
    document.getElementById("pantalla-inicio").style.display="block";
    // audio2.pause();
    // audio1.play();
    //tiempo=10;
    //tiempo.preventDefault(); //reiniciamos el contador, despues de que se haya acabado el tiempo inicial, al volver a la pantalla de inicio
    //actualizadorTiempo();
}

//INTENTO DE PONER MÚSICA SEGÚN LA ESCENA

// function musicaFondo(music)
// {
//     const music=document.createElement('section'); 
//     music.classList.add("musica"); 
//     music.setAttribute('style', 'display: none');
//     music.innerHTML=
//     `
//     <audio autoplay loop>
//         <source src="sounds/Welcome to the World of Pokémon! 2.mp3" type="audio/mpeg">
//     </audio>
//     `; 

//     document.body.appendChild(section);
//     document.removeEventListener('click', playSound);
// }

// document.addEventListener('click', playSound);

const listaPokes=document.querySelector('#listaPokes'); //creamos una variable constante (porque no va a cambiar su valor...) con el valor de la "id" listaPokes (una seccion de html)
let URL="https://pokeapi.co/api/v2/pokemon/?limit=151&offset=1";  //cargamos la informacion de la Pokeapi
                                             // ?limit=151&offset=151

// for(let i=1; i<=151; i++)  // no es recomendable hacer tantas peticiones a una API, puesto que puede cancelarnos el acceso
// { 
    fetch(URL) 
        .then((response) => response.json()) 
        .then(data => mostrarPokes(data)) 
// }

function mostrarPokes(poke)
{   
    for(let i=1; i<=151; i++)   // bucle sin usar: no carga (aunque debiera...), por orden numerico, cada posicion de la pokedex
	{ 
        // console.log(poke);
        // let spritePokemon=poke.sprites[i];

		const boton=document.createElement('button');
        // const boton=document.querySelector('#listaPokes');
        // const boton=document.getElementById("#listaPokes");

		boton.classList.add("pokemon-btn"); 
        // boton.className("pokemon-btn"); 
		boton.innerHTML=
		`  
		    <img id="${i}" draggable="true" ondragstart="onDragStart(event)" ondragend="onDragEnd(event)" src="${"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+i+".png"}" alt="${poke.name}">
        `; 
        // button
        // src="${poke.sprites.other['official-artwork'].front_default}" alt="${poke.name}"
        // button
        // draggable="true" ondragstart="onDragStart(event)" ondragend="onDragEnd(event)"
        // id="botonPoke" - id="image"
        
		listaPokes.append(boton);
        console.log(boton);
    }
}


//PARA ARRASTRAR LAS "img" AL "section" (input)

function onDragStart(event) //al empezar a mover/arrastrar
{
    console.log("dragstart-arrastrando...");
    event.dataTransfer.effecAllowed = 'move'; //efecto mover
    event.dataTransfer.setData("Data", event.target.id); //coje el elemento a mover
    // event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.setDragImage(event.target, 0, 0); //escoge la imagen que se verá, al arrastrar el elemento, y por donde se coje el elemento que se va a mover... (el raton aparece en la esquina superior izq con 0,0)
}

function onDragEnter(event) //al entrar en otro lugar/elemento
{
    console.log("dragenter-ha entrado");
    event.target.style.border = '3px dotted black'; 
    // if (target != 'colocados')
    // {
    //     event.target.style.border = '';
    // }
}

// function onDragLeave(event) 
// {
//     console.log("dragleave");
//     event.target.style.border = ''; //hace que, al pasar por encima el objeto arrastrado, no aparezcan/no se activen los contornos del resto de elementos del contenedor
// }

function onDragOver(event) //cuando se mantiene el elemento sobre algo
{
    // event.preventDefault(); //evita que se ejecute la accion por defecto del elemento

    console.log("dragover-manteniendo...");
    let elemArrastrable = event.dataTransfer.getData("Data"); //elemento arrastrado
    let id = event.target.id; //elemento sobre el que se arrastra
    
    if (id == 'ubicacion-arrastrar')
    {
        return false; //para que se pueda soltar el elemento en el destino indicado
    }
    // if ((id == 'listaPokes') && (elemArrastrable != 'texto-colocados') && (elemArrastrable != 'img-colocados'))
    // {
    //     return false; 
    // } 
}

function onDrop(event) //al soltar el elemento arrastrado
{
    console.log("dragdrop-soltado");
    // const id = event.dataTransfer.getData('text');

    // const draggableElement = document.getElementById(id);
    // const dropzone = event.target;

    // dropzone.appendChild(draggableElement);
    // event.dataTransfer.clearData();


    // event.preventDefault(); //poner esto aqui, hace que al arrastrar un elemento a la zona de colocacion, no salga como enlace

    // let pokeImg = event.dataTransfer.getData("Data"); 
    event.target.appendChild(document.getElementById(pokemon-btn)); //coloca el elemento sobre el otro indicado
    
    // event.target.style.border = '';
    
    //dimensiones del elemento sobre el que se arrastra
    // tamContX = document.querySelector('#'+event.target.id).width();
    // tamContY = document.querySelector('#'+event.target.id).height();

    //dimensiones del elemento arrastrado
    // tamElemX = document.querySelector('#'+pokemon-btn).width();
    // tamElemY = document.querySelector('#'+pokemon-btn).height();
  
    //posicion del elemento sobre el que se arrastra
    // posXCont = document.querySelector('#'+event.target.id).position().left;
    // posYCont = document.querySelector('#'+event.target.id).position().top;

    //posicion absoluta del raton
    // x = event.layerX;
    // y = event.layerY;

    //si parte del elemento movido se queda fuera del sitio a arrastrar, cambian las coordenadas al origen, para que no se cambie de lugar
    // if (posXCont + tamContX <= x + tamElemX)
    // {
    //     x = posXCont + tamContX - tamElemX;
    // }

    // if (posYCont + tamContY <= y + tamElemY)
    // {
    //     y = posYCont + tamContY - tamElemY;
    // }

    // document.getElementById(pokemon-btn).style.position = "absolute";
    // document.getElementById(pokemon-btn).style.left = x + "px";
    // document.getElementById(pokemon-btn).style.top = y + "px";
}

function onDragEnd(event) //al finalizar el arrastre
{
    console.log("dragend-colocado en el nuevo destino");
    // event.target.style.opacity = ''; //restaura la opacidad del elemento, cuando el elemento se cambie lugar
    // event.target.style.opacity = '0.5'; //cuando el elemento se cambie lugar, se reducirá la opacidad para ver que efectivamente ha cambiado de sitio
    // event.target.style.width="50%"; 
    // event.target.style.backgroundColor = 'yellow'; 
    event.target.style.display="none";

    // INTENTO DE MOSTRAR IMAGEN, EN VEZ DE EL ENLACE
    // event.target.createElement('img');  //No funciona
    event.dataTransfer.clearData("Data");
}