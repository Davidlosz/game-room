
{/* 
	<table>
		<tr>
			<td> <img onclick=""> </td>
		</tr>
	</table>
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




function desordenar()
{
	do
	{
		piezas=piezas.sort(function(){return Math.random()-0.5});
	}
	while (contarPiezasEnOrden()>0);
}

function contarPiezasEnOrden()
{
	let total=0;
	for(let i=0; i<num_piezas; i++)
	{
		if(piezas[i]==i)
		{
			total++;
		}
	}
	return total;
}

function refrescarPuzzle()
{
	for(let casilla=0; casilla<num_piezas; casilla++)
	{
		//obtengo el numero de la imagen, que hay en el array, en la casilla "i"
		let imagen=piezas[casilla];
		//cargo la imagen en la casilla "i"
		document.getElementById("img-"+casilla).src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/i.png"; //_
	}
}

function desmarcarTodas()
{
	//elimina el borde de todas las casillas, aunque no lo tuviesen...
	for(let i=0; i<num_piezas; i++)
	{
		document.getElementById("img-"+i).style.border=null; //solid 2px white
	}
}

//cuando se hace click en una casilla...
function seleccionar(casilla)
{
	if(correcto==true)
	{
		return;
	}
	
	//contabilizo el click sobre una casilla
	num_click=num_click+1;
	
	//si es el primer click...
	if(num_click==1)
	{
		//memoriza la casilla en donde se ha hecho el primer click
		casilla_click_primero=casilla;
		desmarcarTodas();
		document.getElementById("img-"+casilla).style.border="solid 2px red";
	}
	
	if(num_click==2)
	{
		numero_movimientos=numero_movimientos+1;
		document.getElementById("numero-movimientos").innerHTML=numero_movimientos;
		
		let casilla_click_segundo=casilla;
		
		//intercambia los valores en las posiciones del array 
		let contenido=piezas[casilla_click_primero];
		//cambia el contenido de esa casilla
		piezas[casilla_click_primero]=piezas[casilla_click_segundo]; //o -
		//pongo, en la casilla del segundo click, el contenido que habia en la primera
		piezas[casilla_click_segundo]=contenido; //o -
		
		
		//quita el borde que estaba marcado
		desmarcarTodas();
		refrescarPuzzle();
		comprobarPiezasBienPuestas();
		//volvemos a poner el contador de click a 0
		num_click=0;
		//comprueba si el puzzle se ha hecho correctamente...
		correcto=comprobarPuzzleFinalizado();
		
		if(correcto==true)
		{
			//paro el contador de la cuenta atras
			clearInterval(interval);
			
			let temporizador=setInterval(function()
			{
				//evito que se repita, cada X tiempo...
				clearInterval(temporizador);
				//mensaje "pop-up"
				alert("Puzzle finalizado");
				
				//envia los datos resultantes de la partida a un documento "php" (todavia sin realizar), para registrarlos en la base de datos (bbdd)
				let tiempo_tardado=tiempo_max-contador;
				//window.location.href="registro-partida.php?resultado=1&tiempo="+tiempo-tardado;
			}, 200);
		}
	}
}

function comprobarPuzzleFinalizado()
{
	//recorre todo el array "piezas" y mira si, el contenido de cada casilla, se corresponde con su posicion...
	correcto=true;
	for(let i=0; i<num_piezas; i++)
	{
		if(piezas[i]!=i)
		{
			correcto=false;
		}
	}
	return correcto;
}

function comprobarPiezasBienPuestas()
{
	//recorre todo el array "piezas" y mira si, el contenido de cada casilla, se corresponde con su posicion...
	let piezas_bien_puestas=0;
	for(let i=0; i<num_piezas; i++)
	{
		if(piezas[i]==i)
		{
			piezas_bien_puestas=piezas_bien_puestas+1;
		}
	}
}

let ancho=document.getElementById('puzzle-ancho').value;
let alto=document.getElementById('puzzle-alto').value;
let num_piezas=ancho*alto;

let piezas=new Array;
for(i=0; i<num_piezas; i++)
{
	piezas[i]=i;
}

//para distinguir si es el primer o segundo click
let num_click=0;

let numero_movimientos=0;

//para saber en qué casilla se hizo el primer click
let casilla_click_primero;

//para saber si se ha terminado el juego
let correcto=false;

desordenar();
refrescarPuzzle();
desmarcarTodas();
comprobarPiezasBienPuestas();

let tiempo_max=151;
let contador=tiempo_max;

//control de la cuenta atras
let interval;

setTimeout(()=>
{
	document.querySelector(".meter .bar span").style.display="block";
	document.querySelector(".meter .bar span").classList.add("start");
	document.querySelector(".meter .num").innerHTML=contador;
	interval=setInterval(()=>
	{
		contador--;
		document.querySelector(".meter .num").innerHTML=contador;
		if(contador<=0)
		{
			clearInterval(interval);
			finalCuentaAtras();
			//bloqueo el puzzle, para que no se puedan mover más piezas...
			correcto=true;
			
			//envia los datos resultantes de la partida a un documento "php" (todavia sin realizar), para registrarlos en la base de datos (bbdd)
			//window.location.href="registro-partida.php?resultado=0&tiempo="+tiempo-max;
		}
	}, 1000);
}, 500);

function finalCuentaAtras()
{
	alert("Se acabó el tiempo");
}