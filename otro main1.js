
{/* 
    <div class="drop-container">
        <div class="drop-item"> </div> 
    </div> 
*/}

{/* 
    <div class="drag-container">
        <div class="drag-item"> <p class="drag" draggable="true"> 1 </p> </div> 
    </div> 
*/}
 


window.onload=actualizadorTiempo; //ejecuta antes de todo, por pantalla, una funcion determinada


let tiempo=151;

function actualizadorTiempo()
{
    document.getElementById('contador').innerHTML=tiempo; //mostramos el contador/cuenta atras
        
    if(tiempo==-1) //si el tiempo se acaba...
    {
        document.innerHTML="Se acabó el tiempo"; //mostramos el mensaje
        tiempoAcabado(); //y cargamos la funcion 
    }
    else //en caso de que el tiempo no se haya acabado aún...
    {
        tiempo--; //va disminuyendo...
        setTimeout("actualizadorTiempo()", 2000); //contador matematico (1000 equivale a 10 segundos)
    }
}


function juegoIniciado() //funcion que se iniciará al pulsar el boton empezar (Aceptar el reto) en Hmtl
{
    document.getElementById("pantalla-inicio").style.display="none"; //ocultamos la pantalla de inicio, aplicando/modificando la propiedad "display" a "none" desde el style (css) 
    document.getElementById("pantalla-juego").style.display="block"; //cargamos la pantalla de juego, aplicando/modificando la propiedad "display" a "block" desde el style (css)
    tiempo=151; //reiniciamos el contador, para que, en caso de que se vaya reduciendo el tiempo, antes de iniciar el juego, vuelva a 151
    actualizadorTiempo();
}

function tiempoAcabado() //funcion que se iniciará al acabarse el tiempo
{
    document.getElementById("pantalla-juego").style.display="none";
    document.getElementById("pantalla-inicio").style.display="block";
}




const dragItems=document.querySelectorAll(".pokemon-img");
const dropBoxes=document.querySelectorAll(".ubicacion-arrastrar");

dragItems.forEach((item)=>
{
	item.addEventListener("dragstart", dragStart);
});

dropBoxes.forEach((box)=>
{
	box.addEventListener("dragover", dragOver);
	box.addEventListener("drop", dropEvent);
	box.addEventListener("dragleave", dragLeave);
});

function dragStart(event)
{
    console.log("dragstart-arrastrando...");
	event.dataTransfer.setData("text", event.target.innerText); //text/plain

	setTimeout((event)=>
	{
		this.className="invisible";
	}, 0);
}

function dragOver(event)
{
    console.log("dragover-manteniendo...");
	event.preventDefault();
	
	this.className+=" enter";
}

function dropEvent(event)
{
    console.log("dragdrop-soltado");
	event.preventDefault();
	this.className="ubicacion-arrastrar";
	const element=document.createElement('text'); //img
	element.className="drag";
	element.innerText=event.dataTransfer.getData('text');
	
	this.appendChild(element);
}

function dragLeave(event)
{
    console.log("dragleave");
	event.preventDefault();
}