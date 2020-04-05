let gameStarted = false
const autoSelectedTile = {
    row: 0,
    col: 0
}
let score = 0

const startGame = () => {
    document.getElementById('game-overlay').classList.add('open')
    selectTile(6, 6)
}

const endGame = () => {
  const modalContent = `
    <div class="modal-content">Your score is ${score}</div>
  `
  document.getElementById('game-overlay').classList.remove('open')
  showModal('Game over', modalContent)
}

const selectTile = (row, col) => {
    autoSelectedTile.row = Math.floor(Math.random() * row)
    autoSelectedTile.col = Math.floor(Math.random() * col)
    console.log("Selected Tile : ")
    console.log(autoSelectedTile)
}

const generateCircles = (row, col, type) => {
    if (gameStarted) {
      return
    }
    gameStarted = true
    const tileBox = document.getElementById('game')
    tileBox.innerHTML = ''
    for (let rowIndex = 0; rowIndex < row; rowIndex++) {
      let tileRow = ''
      for (let colIndex = 0; colIndex < col; colIndex++) {
        let emptyClass = ''
        tileRow += `<div class="tile ${emptyClass}" id="index_${rowIndex}_${colIndex}" onClick="hitTile(${rowIndex}, ${colIndex})"></div>`
      }
      tileBox.innerHTML += `<div class="tile-row">${tileRow}</div>`
    }
  }

  const blinkTile = (type, id) => {
      let classVar = ''
      if (type === 'hit') {
        classVar = 'green'
      } else {
        classVar = 'red'
      }
      document.getElementById(id).classList.add(`blink-${classVar}`)
      setTimeout(() => {
        document.getElementById(id).classList.remove(`blink-${classVar}`)
      }, 200)
  }

  const hitTile = (row, col) => {
      if (autoSelectedTile.row === row && autoSelectedTile.col === col) {
        score += 1
        selectTile(6, 6)
        blinkTile('hit', `index_${row}_${col}`)
      } else {
          score -= 1
          blinkTile('miss', `index_${row}_${col}`)
      }
      document.getElementById('score').innerText = score
  }

  const showModal = (title, msg) => {
    let header = ''
    let content = ''
    if (title) {
      header = `<div class="modal-header">${title}</div>`
    }
    if (msg) {
      content = msg
    }
    document.getElementById('alert-box').innerHTML =  `<span class="close-modal" onClick="hideModal()">X</span>${header}${content}`
    document.getElementById('alert-box').classList.remove('hide')
    document.getElementById('overlay').classList.remove('hide')
  }

  const hideModal = () => {
    document.getElementById('alert-box').classList.add('hide')
    document.getElementById('overlay').classList.add('hide')
    score = 0
    document.getElementById('score').innerText = ''
  }

  generateCircles(6, 6)