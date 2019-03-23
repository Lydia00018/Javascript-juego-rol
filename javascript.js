class Heroe{
    constructor(id, familia, nombre, foto, experiencia, puntosDeVida){
        this._id=id;
        this._familia=familia;
        this._nombre = nombre;
        this._foto=foto;
        this._experiencia = experiencia;
        this._puntosDeVida = puntosDeVida;
    }

    get identificador() {
        return this._id;
    }

    atacar(personaje){
        var vidaRandom=Math.floor((Math.random() * 10));
        var nuevaVidaPersonaje=personaje._puntosDeVida - vidaRandom;
        personaje._puntosDeVida = nuevaVidaPersonaje;
        this.actualizarVida(personaje);
            if (nuevaVidaPersonaje>0) {
                return  personaje._puntosDeVida = nuevaVidaPersonaje;
            }
            else{
                this.efectoFallecido(personaje);
                return "0";

            }
    }

    efectoFallecido(personaje){
        var cajaPersonaje=document.querySelector("#elemDiv"+personaje.identificador);
        cajaPersonaje.style.backgroundColor="#8A5759";
        cajaPersonaje.style.color="white";
        cajaPersonaje.style.opacity="0.5";
    }

    actualizarVida(personaje){
        var progreso=document.querySelector("#progress"+personaje.identificador);
        progreso.setAttribute("value", personaje._puntosDeVida);
    }

    set puntosDeVida(value) {
    if (typeof value == "number") {
        this._puntosDeVida = value;
    }
    }
    set experiencia(value) {
        if (typeof value == "number") {
            this._experiencia = value;
        }
    }
}


class Guerrero extends Heroe{
	constructor(id, familia, nombre, foto, experiencia, puntosDeVida, armas){
		super(id, familia, nombre, foto, experiencia, puntosDeVida);
		this._armas=armas;
		}
		pelear(){
			return "Ataque fuego";
        }
}


class Mago extends Heroe{
	constructor(id, familia, nombre, foto, experiencia, puntosDeVida, hechizos){
		super(id, familia, nombre, foto, experiencia, puntosDeVida);
		this._hechizos=hechizos;
	}
	lanzarHechizos(){
			return "Hechizo de viento";
		}
}

class Ladron extends Heroe{
	constructor(id, familia, nombre, foto, experiencia, puntosDeVida, sigilo){
		super(id, familia, nombre, foto, experiencia, puntosDeVida);
		this._sigilo=sigilo;
	}
	robar(){
			return "Robar reliquias";
	}
	set sigilo(value) {
        console.log(typeof value);
        if (typeof value == "number") {
            this._sigilo = value;
        }
    }
}
var ladron1=new Ladron(1,"Ladrones","Luci", "img/player5.png",10, 30, 20);
var heroe1=new Heroe(2,"Héroes","Bean", "img/player6.png",7, 20);
var guerrero1=new Guerrero(3,"Elfos","Elfo", "img/player7.png",4, 15, "katana");
var mago1=new Mago(4,"Magos","Sorcerio", "img/player8.png", 3, 20, "cetro");

var personajes=[];
personajes.push(ladron1);
personajes.push(heroe1);
personajes.push(guerrero1);
personajes.push(mago1);

//Personajes pintados con el template
var template=document.querySelector(".estructura-personajes");
var newDiv = template.content.querySelector(".caja");
var lista = document.querySelector(".lista-personajes");
for (var i = 0; i < personajes.length; i++) {
    var a=newDiv.cloneNode(true);
    a.id = "elemDiv" + personajes[i].identificador;
    a.querySelector("#tipo-personaje").innerHTML=personajes[i]._familia;
    a.querySelector("#nombre").innerHTML += " " +personajes[i]._nombre;
    a.querySelector("#foto-personaje").src=personajes[i]._foto;
    a.querySelector("#puntos-exp").innerHTML+= " " +personajes[i]._experiencia;
    a.querySelector("#puntos-vida").innerHTML+= " " +personajes[i]._puntosDeVida;
    a.querySelector("#hechizos").innerHTML+= " " +personajes[i]._hechizos;
    a.querySelector("#armas").innerHTML+= " " +personajes[i]._armas;
    a.querySelector("#sigilo").innerHTML+= " " +personajes[i]._sigilo;
    a.querySelector("#lista-matar-personajes").id=a.querySelector("#lista-matar-personajes").id+"-"+personajes[i].identificador;
        var progreso =a.querySelector("progress");
        progreso.id="progress"+personajes[i].identificador;
        progreso.setAttribute("value", personajes[i]._puntosDeVida);
        progreso.setAttribute("max", personajes[i]._puntosDeVida);
    var btn=a.querySelector(".ataque");
    btn.id=personajes[i].identificador;
    btn.addEventListener("click", pelea);
    lista.appendChild(a);
}

function pelea(event){
    var idBtn = event.target.id;

    var select=document.querySelector("#lista-matar-personajes-"+idBtn);
    var atacante = personajes[i];
    for (var i = 0; i < personajes.length; i++) {
        if(idBtn==personajes[i].identificador){
            atacante = personajes[i];
        }

    }

    var idSelect=document.querySelector("#lista-matar-personajes-"+idBtn).value;
    for (var i = 0; i < personajes.length; i++) {
        if(idSelect==personajes[i].identificador){
            var atacado = personajes[i];
            var contrincante=document.querySelector("#elemDiv" + atacado.identificador);
            contrincante.querySelector("#nuevaVida").innerHTML=atacante.atacar(atacado);
            contrincante.style.opacity="1";
        }
    }
}


