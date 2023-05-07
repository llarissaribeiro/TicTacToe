const boardRegions = document.querySelectorAll('#gameBoard span')

//criar um tabuleiro virtual e verificar o tabuleiro real
let vBoard = []
let turnPlayer = ''

//mostrar o jogador da vez
function updateTitle(){
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('turnPlayer').innerText = playerInput.value
}

function initializeGame(){
    vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
    turnPlayer = 'player1'
    document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>'
    updateTitle()
    //limpar o tabuleiro quando reiniciar o jogo
    boardRegions.forEach(function(element){
        element.classList.remove('win')
        element.style.backgroundColor = ''
        element.innerText = ''
        element.classList.add('cursorPointer')
        element.addEventListener('click', handleBoardClick)
    })
}

//verificar se existem 3 regiões iguais em sequência e mostrar as regiões
function getWinRegions(){
    const winRegions = []
    //se a posição [0][0] existe e for igual a posição [0][1] e [0][2], ele vai dar um push no array com as posições que o jogador usou para vencer e assim por diante
    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
        winRegions.push("0.0", "0.1", "0.2")
    if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
        winRegions.push("1.0", "1.1", "1.2")
    if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
        winRegions.push("2.0", "2.1", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
        winRegions.push("0.0", "1.0", "2.0")
    if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
        winRegions.push("0.1", "1.1", "2.1")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
        winRegions.push("0.2", "1.2", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
        winRegions.push("0.0", "1.1", "2.2")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
        winRegions.push("0.2", "1.1", "2.0")
    return winRegions
}

function disableRegion(element){
    element.classList.remove('cursorPointer')
    element.removeEventListener('click', handleBoardClick)
}

function handleWin(regions){
    regions.forEach(function(region){ 
        document.querySelector('[data-region = "' + region + '"]').classList.add('win') //primeiro seleciona o elemento da região e pega um atributo específico [data-region], a region é utilizada para selecionar o elemento e adicionar classe win para pintar de verde
    })
    const playerName = document.getElementById(turnPlayer).value //seleciona o nome do jogador da vez e exibe na tela que foi ele que ganhou
    document.querySelector('h2').innerHTML = playerName + ' venceu!'
}

function handleBoardClick(ev){
    const span = ev.currentTarget
    //obter a região que foi clicada
    const region = span.dataset.region //N.N
    //pegar só um número
    const rowColumnPair = region.split('.') //split = divide uma string, transformando em um array, nesse caso vai quebrar onde tem um ponto (N.N = ['N', 'N'])
    const row = rowColumnPair[0] //a linha vai estar na posição 0 [0,1]
    const column = rowColumnPair[1] //a coluna vai estar na posição 1 [0,1]
    if (turnPlayer === 'player1'){
        span.style.backgroundColor ='#dc685a'
        span.innerText = 'X'
        vBoard[row][column] = 'X'
    } else{
        span.style.backgroundColor ='#ecaf4f'
        span.innerText = 'O'
        vBoard[row][column] = 'O'
    }
    console.clear()
    console.table(vBoard)
    //tirar o evento que permite clicar no mesmo quadrado mais de uma vez
    disableRegion(span)
    
    //verificar se o jogador venceu
    const winRegions = getWinRegions()
    //primeiro verificar se o winRegions tem alguma coisa dentro
    if (winRegions.length > 0){ //se for maior que 0 significa tem que tem alguma coisa dentro e o jogador venceu
        handleWin(winRegions)
    } else if(vBoard.flat().includes('')){ //se ninguém venceu, verifica se ainda tem algum espaço vazio no tabuleiro, se tiver troca o jogador
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
        updateTitle()
    } else{ //se não tiver nenhum espaço vazio e ninguém venceu então empatou
        document.querySelector('h2').innerHTML = 'Empate!'
    }
}


document.getElementById('startGame').addEventListener('click', initializeGame)