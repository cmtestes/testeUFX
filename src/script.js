var nomes = [
	"Aquiline",
	"Calavera",
	"Carter",
	"Desmond",
	"Drake", 
	"Gus", 
	"Harrow", 
	"Hilal", 
	"Joel", 
	"Kamakura", 
	"Kazayan", 
	"Korr",
	"Mandrak",
	"Noctezuma", 
	"Pandagran", 
	"Pantherine",
	"Quetzal",
	"Sentogan",
	"Stalfhaust",
	"Thorpah", 
	"Tormentah", 
	"Volkan",
	"X-Odus",
	"XU-Kr4ng"
];
let indice     = 0;
let indice2    = nomes.length - 1;
const audio    = new Audio();
audio.src      = "src/som/selecao.wav";
audio.preload  = 'auto';
audio.volume   = 1
const audioF   = new Audio();
audioF.src     = "src/som/fundo.mp3";
audioF.volume  = 0.2;
audioF.loop    = true;
let tranca     = false;
let tranca2    = false;

function escolher(nomes, indice, indice2, tranca, tranca2) {
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

	document.getElementsByClassName('imgEscolhido')[0].src  = `src/img/${escolhido}.png`;
	document.getElementsByClassName('imgEscolhido2')[0].src = `src/img/${escolhido2}.png`;

	audio.play();
}


function criarDivs(selecao, nomes) {
	nomes.forEach(nome => {
		var div = document.createElement("div");
		div.id  = nome;
		var img = document.createElement("img");
		img.src = `src/img/${nome}.png`;
		img.alt = nome; 

		div.classList.add("personagem");

		div.appendChild(img);
		selecao.appendChild(div);
	});
}

document.addEventListener('keydown', function(event) {
	if (!tranca) {
		switch (event.key) {
			case "ArrowLeft":
				indice - 1 < 0 ? indice = nomes.length - 1 : indice--;
				break;
		
			case "ArrowRight":
				indice + 1 > nomes.length - 1 ? indice = 0 : indice++;
				break;
		
			case "ArrowUp":
				indice - 4 < 0 ? indice = (nomes.length - 4) + indice : indice -= 4;
				break;
		
			case "ArrowDown":
				indice + 4 > nomes.length - 1 ? indice = ((indice + 4) - nomes.length) : indice += 4;
				break;
		}
	}

	if (!tranca2) {
		switch (event.key) {
			case "a":
			case "A":
				indice2 - 1 < 0 ? indice2 = nomes.length - 1 : indice2--;
				break;
		
			case "d":
			case "D":
				indice2 + 1 > nomes.length - 1 ? indice2 = 0 : indice2++;
				break;
		
			case "w":
			case "W":
				indice2 - 4 < 0 ? indice2 = (nomes.length - 4) + indice2 : indice2 -= 4;
				break;
		
			case "s":
			case "S":
				indice2 + 4 > nomes.length - 1 ? indice2 = ((indice2 + 4) - nomes.length) : indice2 += 4;
				break;
		}
	}

	audioF.play();
	escolher(nomes, indice, indice2, tranca, tranca2);

	if (event.key == "Enter") {
		tranca = tranca ? false : true;
		document.getElementsByClassName('escolhido')[0].style.backgroundColor = tranca ? "#6456f7"   : "transparent";
		document.getElementsByClassName('nomeEscolhidoContorno')[0].innerHTML = tranca ? "Escolhido" : nomes[indice];
		document.getElementsByClassName('nomeEscolhido')[0].innerHTML         = tranca ? "" : nomes[indice];
	}

	if (event.key == " ") {
		tranca2 = tranca2 ? false : true;
		document.getElementsByClassName('escolhido2')[0].style.backgroundColor = tranca2 ? "#c1151570"   : "transparent";
		document.getElementsByClassName('nomeEscolhidoContorno2')[0].innerHTML = tranca2 ? "Escolhido" : nomes[indice2];
		document.getElementsByClassName('nomeEscolhido2')[0].innerHTML         = tranca2 ? "" : nomes[indice2];
	}
	
	if (tranca && tranca2) {
		setInterval(() => {
			document.getElementsByClassName('selecao')[0].classList.add('descer');
			document.getElementsByClassName('opcoes')[0].classList.add('descer');
			document.getElementsByClassName('escolhido')[0].classList.add('descer');
			document.getElementsByClassName('escolhido2')[0].classList.add('descer');
		}, 2000);
		
	}
});	

document.addEventListener("DOMContentLoaded", function() {
	const selecao = document.querySelector(".selecao");
	criarDivs(selecao, nomes);
});

