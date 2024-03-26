const nomes = [
	"Almastine",
	"Aquiline",
	"Askai",
	"Calavera",
	"Carter",
	"Clive",
	"Desmond",
	"Draconine",
	"Drake", 
	"Duke",
	"Gus", 
	"Harrow", 
	"Hilal", 
	"Jasmine",
	"Joel", 
	"Kamakura", 
	"Kazayan", 
	"Korr",
	"Lucas",
	"Mandrak",
	"Noctezuma", 
	"Pandagran", 
	"Pantherine",
	"Quetzal",
	"Sam",
	"Sentogan",
	"Stalfhaust",
	"Taylor",
	"Thorpah", 
	"Tormentah",
	"Tunned",
	"Volkan",
	"X-Odus",
	"XU-Kr4ng",
	"Yoshida",	
];

const mapas = [
	"BT Arena",
	"Hong Kong",
	"Exame Chunnin",
	"Mishima Dojo",
	"Metro City",
	"Star Arena",
	"Suna Gakure",
	"Vale do Fim",
	"Yakushima",
];

let indice     = 0;
let indice2    = nomes.length - 1;
let indiceMapa = 0;

const audio = new Audio();
audio.src   = "src/som/selecao.wav";

const audioF  = new Audio();
audioF.src    = "src/som/fundo.mp3";
audioF.volume = 0.2;
audioF.loop   = true;

const audioS = new Audio();
audioS.src   = "src/som/selecionado.wav";

let tranca  = false;
let tranca2 = false;

function escolher(nomes, indice, indice2, tranca2, tranca) {
	var escolhido  = nomes[indice];
	var escolhido2 = nomes[indice2];
	var imgs       = document.getElementsByClassName('personagem');

	for (var i = 0; i < imgs.length; i++) {
		imgs[i].style.opacity = 0.5;
		document.getElementById(nomes[i]).classList.remove('selecaoEscolhido');
		document.getElementById(nomes[i]).classList.remove('selecaoEscolhido2');
	}

	imgs[indice].style.opacity  = 1;
	imgs[indice2].style.opacity = 1;

	document.getElementById(escolhido).classList.add('selecaoEscolhido');
	document.getElementById(escolhido2).classList.add('selecaoEscolhido2');

	document.getElementsByClassName('nomeEscolhido')[0].innerHTML  = tranca  ? "" : escolhido;
	document.getElementsByClassName('nomeEscolhido2')[0].innerHTML = tranca2 ? "" : escolhido2;
	document.getElementsByClassName('nomeEscolhidoContorno')[0].innerHTML  = tranca  ? "Escolhido" : escolhido;
	document.getElementsByClassName('nomeEscolhidoContorno2')[0].innerHTML = tranca2 ? "Escolhido" : escolhido2;

	document.getElementsByClassName('imgEscolhido')[0].src  = `src/img/personagens/${escolhido}.png`;
	document.getElementsByClassName('imgEscolhido2')[0].src = `src/img/personagens/${escolhido2}.png`;

	audio.currentTime = 0;
	audio.play();
}


function criarDivs(selecao, nomes, mapas) {
	nomes.forEach(nome => {
		var div = document.createElement("div");
		div.id  = nome;
		var img = document.createElement("img");
		img.src = `src/img/personagens/${nome}.png`;
		img.alt = nome; 

		div.classList.add("personagem");

		div.appendChild(img);
		selecao.appendChild(div);
	});
}

document.addEventListener('keydown', function(event) {
	if (!(tranca && tranca2)) {
		document.getElementsByClassName("telaInicial")[0].style.display = "none";
		if (!tranca) {
			switch (event.key) {
				case "ArrowLeft":
					indice2 - 1 < 0 ? indice2 = nomes.length - 1 : indice2--;
					break;
			
				case "ArrowRight":
					indice2 + 1 > nomes.length - 1 ? indice2 = 0 : indice2++;
					break;
			
				case "ArrowUp":
					indice2 - 5 < 0 ? indice2 = (nomes.length - 5) + indice2 : indice2 -= 5;
					break;
			
				case "ArrowDown":
					indice2 + 5 > nomes.length - 1 ? indice2 = ((indice2 + 5) - nomes.length) : indice2 += 5;
					break;
			}
		}

		if (!tranca2) {
			switch (event.key) {
				case "a":
				case "A":
					indice - 1 < 0 ? indice = nomes.length - 1 : indice--;
					break;
			
				case "d":
				case "D":
					indice + 1 > nomes.length - 1 ? indice = 0 : indice++;
					break;
			
				case "w":
				case "W":
					indice - 5 < 0 ? indice = (nomes.length - 5) + indice : indice -= 5;
					break;
			
				case "s":
				case "S":
					indice + 5 > nomes.length - 1 ? indice = ((indice + 5) - nomes.length) : indice += 5;
					break;
			}
		}

		audioF.play();
		escolher(nomes, indice, indice2, tranca, tranca2);

		if (event.key == " ") {
			tranca2 = tranca2 ? false : true;
			document.getElementsByClassName('escolhido')[0].style.backgroundColor = tranca2 ? "#6356f735"   : "transparent";
			document.getElementsByClassName('nomeEscolhidoContorno')[0].innerHTML = tranca2 ? "Escolhido" : nomes[indice];
			document.getElementsByClassName('nomeEscolhido')[0].innerHTML         = tranca2 ? "" : nomes[indice];
			audioS.play();
		}

		if (event.key == "Enter") {
			tranca = tranca ? false : true;
			document.getElementsByClassName('escolhido2')[0].style.backgroundColor = tranca ? "#c115154c"   : "transparent";
			document.getElementsByClassName('nomeEscolhidoContorno2')[0].innerHTML = tranca ? "Escolhido" : nomes[indice2];
			document.getElementsByClassName('nomeEscolhido2')[0].innerHTML         = tranca ? "" : nomes[indice2];
			audioS.play();
		}
		
		if (tranca && tranca2) {
			document.getElementsByClassName('selecao')[0].classList.add('descer');
			document.getElementsByClassName('telaMapa')[0].classList.add('descer2');
			document.getElementsByClassName('imgEscolhido')[0].classList.add('esquerda');
			document.getElementsByClassName('imgEscolhido2')[0].classList.add('direita');
		}

	}
	else {
		switch(event.key) {
			case "a":
			case "A":
			case "ArrowLeft":
				indiceMapa - 1 < 0 ? indiceMapa = mapas.length - 1 : indiceMapa--;
				audio.currentTime = 0;
				audio.play();
				this.documentElement.getElementsByClassName('Bm1')[0].style.backgroundColor = "yellow";
				setTimeout (() => {
					this.documentElement.getElementsByClassName('Bm1')[0].style.backgroundColor = "white";
				}, 600);
				break;
			
			case "d":
			case "D":
			case "ArrowRight":
				indiceMapa + 1 > mapas.length - 1 ? indiceMapa = 0 : indiceMapa++;
				audio.currentTime = 0;
				audio.play();
				this.documentElement.getElementsByClassName('Bm2')[0].style.backgroundColor = "yellow";
				setTimeout (() => {
					this.documentElement.getElementsByClassName('Bm2')[0].style.backgroundColor = "white";
				}, 600);
				break;
		}
		audioF.play();
		document.getElementsByClassName('nomeMapa')[0].innerHTML = mapas[indiceMapa];
		document.getElementsByClassName('imgMapa')[0].src = `src/img/mapas/${mapas[indiceMapa]}.jpg`;
	}
})

document.addEventListener("DOMContentLoaded", function() {
	const selecao = document.querySelector(".selecao");
	criarDivs(selecao, nomes);
});

