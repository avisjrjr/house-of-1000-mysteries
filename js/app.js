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
        nextText: 10
      }
    ]
  },
  {
    id: 10,
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
    text: 'You encounter a skeleTon, what do?',
    options: [
      {
      text: 'Hang out with skeleTon',
      nextText: 11
      },
      {
          text: 'Flee',
          nextText: 3 
      },
      {
          text: 'Beat its bony ass',
          nextText: 13
          }
    ]
  },
  {
  id: 11,
  text: "You hang out with the skeleTon, he's actually pretty cool",
  options:[
    {
    text: 'Contine',
    nextText: 12
    }
  ]
},
{
  id: 12,
  text: "Betrayl",
  options:[
    {
    text: 'Contine',
    nextText: 13
    }
  ]
},
{
  id: 13,
  text: "You lose, become skeleton",
  options:[
    {
    text: 'Restart',
    nextText: -1
    }
  ]
}
]


startGame()