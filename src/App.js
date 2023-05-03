import { useState, useContext } from 'react'
import { TopicsContext } from './contexts/TopicsContext'

export const topicList = [
  {
    id: 1,
    topic: 'Hobbies',
    questions: [
      "What's your hobby?",
      'Do you have a lot of free time?',
      'What hobby would you like to try?',
    ],
  },
  {
    id: 2,
    topic: 'Sport',
    questions: [
      'What sports do you like?',
      'Do you play any sports?',
      'What sports do you think are dangerous?',
    ],
  },
  {
    id: 3,
    topic: 'Family',
    questions: [
      'Do you have a big family?',
      'Are you married?',
      "What's the ideal number of children to have?",
    ],
  },
  { id: 4, topic: 'Work', questions: ['Q1', 'Q1', 'Q3'] },
  { id: 5, topic: 'Food and drink', questions: ['Q1', 'Q2', 'Q3'] },
  { id: 6, topic: 'Travel', questions: ['Q1', 'Q2', 'Q3'] },
  { id: 7, topic: 'The future', questions: ['Q1', 'Q2', 'Q3'] },
  { id: 8, topic: 'Nature', questions: ['Q1', 'Q2', 'Q3'] },
  { id: 9, topic: 'Money', questions: ['Q1', 'Q2', 'Q3'] },
  { id: 10, topic: 'Childhood', questions: ['Q1', 'Q2', 'Q3'] },
  {
    id: 11,
    topic: 'Have you ever?',
    questions: [
      'Have you sver slept in a tent?',
      'Have you ever milked a cow?',
      'Have you ever broken a bone?',
      'Have you ever been on TV?',
      'Have you ever fainted?',
      'Have you ever ridden a horse?',
      'Have you ever been trapped in an elevator?',
      "Have you ever eaten frog's legs?",
      'Have you ever been in an earthquake?',
      'Have you ever fallen in love at first sight?',
      'Have you ever been sunburnt?',
      'Have you ever tried any extreme sports?',
      'Have you ever been to a fashion show?',
      'Have you ever sung in public?',
      'Have you ever been skiing?',
      'Have you ever been to Japan?',
      'Have you ever met a celebrity?',
      'Have you ever been seasick?',
      'Have you ever touched a snake?',
      'Have you ever had a pet?',
      'Have you ever experienced deja vu?',
    ],
  },
  { id: 12, topic: 'Pets', questions: ['Q1', 'Q2', 'Q3'] },
  { id: 13, topic: 'Education', questions: ['Q1', 'Q2', 'Q3'] },
]

function App() {
  const [screen, setScreen] = useState('topics')

  const [currQ, setCurrQ] = useState(0)
  const [currTopic, setCurrTopic] = useState('Hobbies')

  const nextQ = () => {
    setCurrQ(currQ + 1)
  }

  const ques = topicList.find((curr) => curr.topic === currTopic)
  const { questions } = ques

  const [randomNumber, setRandomNumber] = useState(0)

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * topicList.length)
    setRandomNumber(randomNumber)
    setCurrQ(0)
    setScreen('random')
  }

  return (
    <>
      <div className='navbar'>
        <nav>
          <h1>inlingua CTD</h1>
          <button className='nav-button' onClick={() => setScreen('topics')}>
            Topics
          </button>
          <button className='nav-button' onClick={generateRandomNumber}>
            Random Topic
          </button>
        </nav>
      </div>
      <div className='App'>
        <TopicsContext.Provider
          value={{
            screen,
            setScreen,
            currTopic,
            setCurrTopic,
            currQ,
            setCurrQ,
            questions,
            nextQ,
            generateRandomNumber,
            randomNumber,
            setRandomNumber,
          }}
        >
          {screen === 'topics' && <Topics />}
          {screen === 'questions' && <Questions />}
          {screen === 'random' && <Random />}
        </TopicsContext.Provider>
      </div>
    </>
  )
}

function Topics() {
  const { setScreen, setCurrTopic, setCurrQ } = useContext(TopicsContext)
  return (
    <div>
      <header>
        <h1>Conversation App</h1>
      </header>
      <div className='topic-list'>
        {topicList.map((topicList) => (
          <div
            className='card'
            onClick={() => {
              setCurrTopic(topicList.topic)
              setCurrQ(0)
              setScreen('questions')
            }}
          >
            {topicList.topic}
          </div>
        ))}
      </div>
    </div>
  )
}

function Questions() {
  const { setScreen, nextQ, currQ, currTopic, questions } =
    useContext(TopicsContext)
  return (
    <div className='q-box' onClick={nextQ}>
      <h2>{currTopic}</h2>
      <p>{questions[currQ]}</p>
      {currQ >= questions.length && (
        <button
          className='topics-button'
          onClick={() => {
            setScreen('topics')
          }}
        >
          Back to Topics
        </button>
      )}
    </div>
  )
}

function Random() {
  const {
    setScreen,
    nextQ,
    currQ,
    questions,

    randomNumber,
  } = useContext(TopicsContext)

  return (
    <div>
      <div className='q-box' onClick={nextQ}>
        <h2>{topicList[randomNumber].topic}</h2>
        <p>{topicList[randomNumber].questions[currQ]}</p>
        {currQ >= questions.length && (
          <button
            className='topics-button'
            onClick={() => {
              setScreen('topics')
            }}
          >
            Back to Topics
          </button>
        )}
      </div>
    </div>
  )
}

export default App
