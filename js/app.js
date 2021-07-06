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
},
{
  id: 3,
  text: "You have fleed from the skeleTon, what do now?",
  options:[
    {
    text: 'Leave',
    nextText: 10
    },
    {
      text: "Go back",
      nextText: 13
    },
    {
      text: "Explore more",
      nextText: 4
    }
  ]
},
{
  id: 4,
  text: "You find a room with a chest, what do?",
  options:[
    {
    text: 'nothing',
    setState: {magicWand: false},
    nextText: 6
    },
    {
      text: 'Stare at it',
      setState: {magicWand: false},
      nextText: 6
    },
    {
      text: 'Open chest',
      setState: {magicWand: true},
      nextText: 5
    },
    {
      text: 'Break the chest',
      setState: {magicWand: false},
      nextText: 6
    }
  ]
},
{
  id: 5,
  text: "You found a magic wand, will you pilfer it?",
  options:[
    {
    text: 'yes',
    setState: {magicWand: true},
    nextText: 6
    },
    {
    text: 'Stealing is bad',
    setState: {magicWand: false},
    nextText: 6
    },
    {
      text: 'no',
      setState: {magicWand: false},
      nextText: 6
    },
  ]
},
{
  id: 6,
  text: "You hear someone eneter the room",
  options:[
    {
    text: 'Contine',
    nextText: 7
    }
  ]
},
{
  id: 7,
  text: "Its the skeleTon, and he has a bone to pick with you! What do?",
  options:[
    {
    text: 'nothig',
    nextText: 70
    },
    {
      text: 'Offer magic wand',
      requiredState: (currentState) => currentState.magicWand,
      setState: {magicWand: true},
      nextText: 70
    },
    {
      text: 'Equip magic wand',
      requiredState: (currentState) => currentState.magicWand,
      setState: {magicWand: true},
      nextText: 8
    },
    {
      text: 'Accept death',
      nextText: 70
    }
  ]
},
{
  id: 70,
  text: "You have become die.",
  options:[
    {
    text: 'Contine',
    nextText: 13
    }
  ]
},
{
  id: 8,
  text: "Will you fight or become die?",
  options:[
    {
    text: 'Fight!',
    nextText: 9
    },
    {
      text: 'hesitate',
      nextText: 81
    },
    {
      text: 'Become die',
      nextText: 70
    }
  ]
},
{
  id: 9,
  text: "Congrations! you have defeated the skeleTon!",
  options:[
    {
    text: 'Contine',
    nextText: 15
    }
  ]
},
{
  id: 15,
  text: "Before you can celebrate your victory you hear several people enter the house.",
  options:[
    {
    text: 'Contine',
    nextText: 16
    }
  ]
},
{
  id: 16,
  text: "It's the police",
  options:[
    {
    text: 'Contine',
    nextText: 17
    }
  ]
},
{
  id: 17,
  text: "You have assualted the skeleTon in its own home. you are quickly arrested.",
  options:[
    {
    text: 'accept fate',
    nextText: 18
    }
  ]
},
{
  id: 18,
  text: "Return to Chicago",
  options:[
    {
    text: 'restart',
    nextText: -1
    }
  ]
},
{
  id: 81,
  text: "The skeleton also has a magic wand!",
  options:[
    {
    text: 'Contine',
    nextText: 82
    }
  ]
},
{
  id: 82,
  text: "You have entered a stalemate",
  options:[
    {
    text: 'Game over',
    nextText: -1
    }
  ]
},
]
startGame()