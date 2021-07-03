const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('adventure')
const backgroundMusic = new Audio('audio/1066AD.mp3')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textDex) {
  const textNode = textNodes.find(textNode => textNode.id === textDex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('action')
      button.addEventListener('click', () => selectOption(option))
      backgroundMusic.play()
      backgroundMusic.volume = 0.5
      backgroundMusic.loop = true
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You have entered the House of 1000 Mysteries. What will you do?',
    options: [
      {
        text: 'Stay',
        nextText: 2
      },
      {
        text: 'Leave',
        nextText: 20
      }
    ]
  },
  {
    id: 20,
    text: 'You win I guess?',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 2,
    text: 'The code works!',
    options: [
      {
      text: 'Restart for now',
      nextText: -1
      }
    ]
  },
]

startGame()