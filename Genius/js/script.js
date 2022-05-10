var fase, best=1;
var colorOrder = [];
var selectOrder = [];
var interval;
var score;
var player;
var c;

// Componentes
const geniusCircle = document.getElementsByClassName('genius')[0];
const color = Array.from(document.querySelectorAll('.genius div'));
const check = document.getElementById('check');
const bestHTML = document.getElementById('best-fase');
const faseHTML = document.getElementById('fase');

// 'Acende' a cor
const light = e => {
    return new Promise((res, rej) => {
        e.classList.add('light');
        setTimeout(() => {
            e.classList.remove('light');
            setTimeout(() => {
                res();
            }, 500);
        }, 500);
    });
};

const erro = () => {
    return new Promise((res, rej) => {
        geniusCircle.classList.add('erro');
        setTimeout(() => {
            geniusCircle.classList.remove('erro');
            setTimeout(() => {
                res();
            }, 500);
        }, 500);
    });
};

// Gera a sequência e acende as cores
async function round() {
    if(!player){
        faseHTML.innerHTML = fase;
        bestHTML.innerHTML = best;

        disableClick();
        for(let i=0 ; i<fase ; i++){
            let e = Math.floor(Math.random()*4);
            colorOrder.push(e);
            await light(color[e]);
        }
    }
    
}

// Configura o round
function game() {
    player = false;
    colorOrder = [];
    setTimeout( async() => {
        await round().then(() => {
            c=0;
            player = true;
            enableClick();
        });
    }, 2000);
}

// Reinicia o jogo
function reset(_fase=1) {
    score = 0;
    fase = _fase;
    game();
}

// Evento de click do jogador
function play(e) {
    if(player) {
        light(e);
        if(color.indexOf(e) == colorOrder[c]){
            c++;
            if(c == fase){
                fase++;
                best = Math.max(best, fase);
                game();
            }
        }else{
            player = false;
            c=0;
            disableClick();
            erro();
            check.checked ? reset() : reset(fase);
        }
    }
}

function enableClick() {
    color[0].classList.add('clickable');
    color[1].classList.add('clickable');
    color[2].classList.add('clickable');
    color[3].classList.add('clickable');
}

function disableClick() {
    color[0].classList.remove('clickable');
    color[1].classList.remove('clickable');
    color[2].classList.remove('clickable');
    color[3].classList.remove('clickable');
}

color[0].addEventListener('click', () => play(color[0]));
color[1].addEventListener('click', () => play(color[1]));
color[2].addEventListener('click', () => play(color[2]));
color[3].addEventListener('click', () => play(color[3]));

faseHTML.innerHTML = '-';
bestHTML.innerHTML = '-';
document.getElementById('play').addEventListener('click', () => reset());