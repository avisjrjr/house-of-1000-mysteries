const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('adventure')
const backgroundMusic = new Audio('audio/1066AD.mp3')
const image = document.getElementById("journey")

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textDex) {
  const textNode = textNodes.find(textNode => textNode.id === textDex)
  textElement.innerText = textNode.text
  image.src= textNode.image
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
    image: "./bonezone/entry.jpg",
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
    image: "./bonezone/entry.jpg",
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
    image: "./bonezone/encounter.jpg",
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
          text: 'Beat its boney ass',
          nextText: 13
          }
    ]
  },
  {
  id: 11,
  text: "You hang out with the skeleTon, he's actually pretty cool!",
  image: "./bonezone/chill.jpg",
  options:[
    {
    text: 'Continue',
    nextText: 12
    }
  ]
},
{
  id: 12,
  text: "Until betrayl.",
  image: "./bonezone/betray.jpg",
  options:[
    {
    text: 'Continue',
    nextText: 133
    }
  ]
},
{
  id: 133,
  text: "Never trust a skeleTon. You lose.",
  image: "./bonezone/betray2.jpg",
  options:[
    {
    text: 'Restart',
    nextText: -1
    }
  ]
},
{
  id: 13,
  text: "You lose, become skeleton",
  image: "./bonezone/betray2.jpg",
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
  image: "./bonezone/return.jpg",
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
  image: "./bonezone/chest1.jpg",
  options:[
    {
    text: 'Nothing',
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
  image: "./bonezone/openchest.jpg",
  text: "You found a magic wand, will you pilfer it?",
  options:[
    {
    text: 'Yes',
    setState: {magicWand: true},
    nextText: 6
    },
    {
    text: 'Stealing is bad',
    setState: {magicWand: false},
    nextText: 6
    },
    {
      text: 'No',
      setState: {magicWand: false},
      nextText: 6
    },
  ]
},
{
  id: 6,
  image: "./bonezone/openchest.jpg",
  text: "You hear someone enter the room",
  options:[
    {
    text: 'Continue',
    nextText: 7
    }
  ]
},
{
  id: 7,
  image: "./bonezone/encounter.jpg",
  text: "Its the skeleTon, and he has a bone to pick with you! What do?",
  options:[
    {
    text: 'Nothing',
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
      nextText: 88
    },
    {
      text: 'Accept death',
      nextText: 70
    }
  ]
},
{
  id: 88,
  image: "./bonezone/equip.jpg",
  text: "You have equiped the magic wand.",
  options:[
    {
    text: 'Continue',
    setState: {magicWand: true},
    nextText: 8
    },
  ]
},
{ 
  id: 70,
  image: "./bonezone/become.jpg",
  text: "You have become die.",
  options:[
    {
    text: 'Continue',
    nextText: 13
    }
  ]
},
{
  id: 8,
  image: "./bonezone/prefight.jpg",
  text: "Will you fight or become die?",
  options:[
    {
    text: 'Fight!',
    nextText: 9
    },
    {
      text: 'Hesitate',
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
  image: "./bonezone/winrar.jpg",
  text: "Congrations! You have defeated the skeleTon!",
  options:[
    {
    text: 'Continue',
    nextText: 15
    }
  ]
},
{
  id: 15,
  image: "./bonezone/winrar.jpg",
  text: "Before you can celebrate your victory you hear several people enter the house.",
  options:[
    {
    text: 'Continue',
    nextText: 16
    }
  ]
},
{
  id: 16,
  image: "./bonezone/police1.jpg",
  text: "It's the police.",
  options:[
    {
    text: 'Continue',
    nextText: 17
    }
  ]
},
{
  id: 17,
  image: "./bonezone/police.jpg",
  text: "You have assualted the skeleTon in its own home. you are quickly arrested.",
  options:[
    {
    text: 'Accept fate',
    nextText: 18
    }
  ]
},
{
  id: 18,
  image: "./bonezone/chicago.jpg",
  text: "Return to Chicago.",
  options:[
    {
    text: 'Restart',
    nextText: -1
    }
  ]
},
{
  id: 81,
  image: "./bonezone/stalemate.jpg",
  text: "The skeleton also has a magic wand!",
  options:[
    {
    text: 'Continue',
    nextText: 82
    }
  ]
},
{
  id: 82,
  image: "./bonezone/stalemate.jpg",
  text: "You have entered a stalemate.",
  options:[
    {
    text: 'Game over',
    nextText: -1
    }
  ]
},
]
startGame()