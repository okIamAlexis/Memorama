
const TARJETAS_UNICAS = 10;
const juego = document.getElementById('memorama');

// Numero de tarjetas en el array
const data = new Array(TARJETAS_UNICAS).fill('').map((data, index) => index);
const cuadritos=  desrodenar([...data, ...data]);
console.log(cuadritos);

// Botones Iniciar y finalizaz
const btn = document.querySelector('.btn-start');
const btn_end = document.querySelector('.btn-end');

let parSeleccionado = [];

const suma = document.getElementById('suma');
const aciertos = document.getElementById('aciertos');
let intentos = 1;
let ac = 1;

function Suma(){
    suma.innerHTML = intentos++;
}

function Aciertos(){    
    aciertos.innerHTML = ac++;
}


function Mostrar(){
    juego.style.pointerEvents= 'visible'
    juego.style.opacity= "1";
    btn_end.disabled= false;
    btn_end.style.cursor = 'pointer';
    btn.disabled = true;
    btn.style.cursor = 'not-allowed';

}

function alerta(){

    let opcion = confirm("Deseas terminar el juego");
    if (opcion == true) {

        juego.style.animation = "fade-out 500ms forwards"

        setTimeout(function(){
            window.location.reload();
            console.log('Reinicio');
        }, 1000)

	}
}

function desrodenar(array){
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while(0 !== currentIndex){
        // Pick a remaining element ...
        randomIndex= Math.floor(Math.random() * currentIndex);
        currentIndex -=1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function deleteCard(tarjetaSelec, tarjetaAnterior){

   tarjetaSelec.addEventListener('transitionend', ()=>{
    tarjetaSelec.innerHTML="";
    tarjetaAnterior.innerHTML="";
    checkWin();
   });

}

function checkWin(){
   const tarjetas = document.getElementsByClassName('tarjeta-rellena');
    console.log('Cuantas tarjetas quedan: ', tarjetas.length);
    if(tarjetas.length === 0){
        window.location.reload();
        alert('GANASTE');
    }
}

function onClick(tarjetaId, imagenId){
    console.log('tarjetaId: ', tarjetaId);
    console.log('imagen: ', imagenId);
    const tarjetaSelec = document.getElementById(tarjetaId);

    if(tarjetaSelec.classList.contains('voltear')){
        return;
    };

    tarjetaSelec.classList.add('voltear');
    
    if(parSeleccionado.length === 0){
        parSeleccionado[0]= {imagenId, tarjetaId};
    }
    else if(parSeleccionado.length === 1){
        parSeleccionado[1] = {imagenId, tarjetaId};
        if(parSeleccionado[0].imagenId === parSeleccionado[1].imagenId){

            const tarjetaAnterior = document.getElementById(parSeleccionado[0].tarjetaId);
            
            Suma();
            Aciertos();
            deleteCard(tarjetaSelec, tarjetaAnterior);
            parSeleccionado = [];

        }else{
            console.log('INCORRECTO');
            Suma();
        }
        
    }
    else if(parSeleccionado.length === 2){

        const tarjeta1 = document.getElementById(parSeleccionado[0].tarjetaId);
        const tarjeta2 = document.getElementById(parSeleccionado[1].tarjetaId);

        tarjeta1.classList.remove('voltear');
        tarjeta2.classList.remove('voltear');
        
        parSeleccionado = [];
        parSeleccionado[0]= {imagenId, tarjetaId};

    };
    console.log('par seleccionado', parSeleccionado);

}

const html = cuadritos.map((imagen, index) => 
`
<div id="tarjeta-${index}" class="tarjeta wrapp" data-tilt onClick ="onClick('tarjeta-${index}', ${imagen})" disabled="">
    <div class="flipper tarjeta-rellena">
        <div class="frente">
        
        </div>
        <div class="atras">
        <div class"circulo-atras"></div>
        <img src="img/img${imagen + 1}.jpg" class="icon">
        </div>
    </div>
</div>
`
).join('');

juego.innerHTML = html;
juego.style.width = `${180 * Math.sqrt(TARJETAS_UNICAS*2)}PX`;
juego.style.height = `${19 * Math.sqrt(TARJETAS_UNICAS * 2)}px`;