const squares = Array.from(document.getElementsByTagName("th"));

// Variaveis auxiliares para a marcação da table
var sqr_marked  = [0x0, 0x0];
const win_mask  = [0x1C0, 0x38, 0x7, 0x124, 0x92, 0x49, 0x111, 0x54];
const allMarked = 0x1FF;

var player = 1;
var points = [0, 0];

// Letras do jogo da velha estilizadas
const text_O = '<p style="color: #38b6ff; text-shadow: 0 2px 2px #5271ff;">O</p>';
const text_X = '<p style="color: #ff2e2e; text-shadow: 0 2px 2px #db0404;">X</p>';

function markSquare(e){
    let i = squares.indexOf(e);
    if(sqr_marked[player] & 1<<i || sqr_marked[(player+1)%2] & 1<<i)
        return;
    sqr_marked[player] = sqr_marked[player] | 1<<i;

    e.innerHTML = player ? text_X : text_O;

    // Se houve empate
    if((sqr_marked[0] | sqr_marked[1]) == allMarked)
        document.getElementById("end").style.visibility = "visible";

    // Se teve ganhador
    if(checkWinner()){
        points[player]++;
        sqr_marked[0] = allMarked;
        sqr_marked[1] = allMarked;

        winChanges();
    }else{
        player = player ? 0 : 1; // Troca de Jogador
    }
}

function checkWinner() {
    for(j=0 ; j<8 ; ++j){
        if((sqr_marked[player] & win_mask[j]) == win_mask[j])
            return true;
    }
    return false;
}

function winChanges() {
    loadPoints();
    showButtons();
    document.querySelector(`#player${player ? 2 : 1} h4`).classList.add('quadro-animation');
}

function loadPoints() {
    document.querySelector('#player1 div span').innerHTML = points[0];
    document.querySelector('#player2 div span').innerHTML = points[1];
}

function playAgain() {
    hideButtons();
    squares.forEach((e) => {
        e.innerHTML = '';
    });
    document.querySelector(`#player${player ? 2 : 1} h4`).classList.remove('quadro-animation');
    sqr_marked = [0x0, 0x0];
}

function showButtons() {
    document.getElementById("end").style.visibility = "visible";
}

function hideButtons() {
    document.getElementById("end").style.visibility = "hidden";
}

function reset(){
    playAgain();
    player = 1;
    points = [0, 0];
    loadPoints();
}

squares.forEach((e) => {
    e.addEventListener('click', () => {
        markSquare(e);
    });
});

document.getElementById("play-again").addEventListener('click', playAgain);
document.getElementById("reset").addEventListener('click', reset);

reset();