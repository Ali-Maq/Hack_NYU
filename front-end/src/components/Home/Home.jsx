import React, { PureComponent, useEffect }  from 'react'
import { useState } from 'react'
import './Home.css'
import Iframe from 'react-iframe'
import { Test, QuestionGroup, Question, Option } from 'react-multiple-choice'
import { signInWithGoogle } from '../../firebase'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Home = () => {
    const [videoValid, setVideoValid] = useState(false)
    // video URL - empty originally 
    const [YTURL, setYTURL] = useState("")
    // YT title - only shows after user submits URL
    const [vidTitle, setVidTitle] = useState("")
    const data = {
        "finish_reason": "stop",
        "index": 0,
        "logprobs": null,
        "text": "\n\nQ1: What is the name of the speaker in the text?\nA. John Green \nB. King Tut \nC. Horus \nD. Assyrian King\n\nAnswer: A. John Green \nExplanation: John Green is the speaker in the text. He is introducing the topic of Ancient Egypt. \n\nQ2: What is the most influential of the river valley civilizations?\nA. Assyria \nB. Egypt \nC. Persia \nD. India\n\nAnswer: B. Egypt \nExplanation: Ancient Egypt is the most influential of the river valley civilizations. \n\nQ3: What is the Eye of Horus?\nA. A pyramid \nB. An ancient wonder \nC. A symbol of judgement \nD. A river valley\n\nAnswer: C. A symbol of judgement \nExplanation: The Eye of Horus is a symbol of judgement that John Green can feel. \n\nQ4: When did Ancient Egyptian civilization last?\nA. 3000 BCE - 332 BCE \nB. 2000 BCE - 1000 BCE\nC. 4000 BCE - 2000 BCE \nD. 1000 BCE - 500 BCE\n\nAnswer: A. 3000 BCE - 332 BCE \nExplanation: Ancient Egyptian civilization lasted from 3000 BCE to 332 BCE. \n\nQ5: What is one of the Seven Ancient Wonders of the World?\nA. The Eye of Horus \nB. The Great Wall of China \nC. The Pyramids \nD. The Hanging Gardens of Babylon\n\nAnswer: C. The Pyramids \nExplanation: The Pyramids are one of the Seven Ancient Wonders of the World."
    }
    

    const questions = []
    const answers = []
    const correctAnswers = []

    // extract the questions and answers from the JSON input
    for (let i = 1; i <= 5; i++) {
        const question = data.text.split(`\n\nQ${i}: `)[1].split('\nA. ')[0]
        const answerOptions = data.text.split(`\n\nQ${i}: `)[1].split('\nA. ')[1].split('\n')
        const correctAnswer = answerOptions.filter(option => option.startsWith('Answer:'))[0].split('Answer: ')[1]

        questions.push(question)
        answers.push(answerOptions)
        correctAnswers.push(correctAnswer)
    }

    function generateQuestion() {
        const randomIndex = Math.floor(Math.random() * questions.length)
        const question = questions[randomIndex]
        const options = answers[randomIndex]
        const correctAnswer = correctAnswers[randomIndex]

    // display the question and its possible answers in a multiple-choice format
    // for example, you could display them in an HTML form
    }

    
    // answer state
    const [state, setState] = useState({selectedOptions: {}})
    // data for question set
    const [correntAnswers, setCorrectAnswers] = useState()

    

    // YT video 

    // fetch video
    const handleSubmit = (e) => {
    // set vidTitle to fetched title
        e.preventDefault()
        // call to google API to get video contents
        // set video title
        setVidTitle("Video Title")
        setVideoValid(true)
    }

    const handleQuizSubmit = () => {

    }

    return (
    <div className="container">
        <button class="login-with-google-btn" onClick={signInWithGoogle}>
            Sign in with Google
        </button>
        {/* 1) Search Bar/Title */}
        <div className="SearchBarTitleSection">
            {/* If video has not been fetched, show URL bar */}
            {videoValid === false &&(
                <>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className='headings' htmlFor="title">Video ID: </label>                                    
                            <input
                                type="text"
                                className="form-control"
                                id="YTURL"
                                placeholder="Paste your Video ID here"
                                value={YTURL}
                                onChange={e => setYTURL(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Get Video</button>
                    </form>
                </>
            )}
            {/* If video has been fetched, show video title and button to paste new video */}
            {videoValid === true && (
                <>
                    <div className="card-body">
                        <h5 className="card-title">{vidTitle}</h5>
                        <button type="submit" onClick={() => setVideoValid(false)} className="btn btn-primary">Get Video</button>
                    </div>
                </>
            )}
        </div>

        {/* 2) Quiz */}
        <form onSubmit={handleQuizSubmit}>
            
            

            <Test onOptionSelect={selected => setState({ ...state, selectedOptions: selected})}>
                <QuestionGroup questionNumber={1}>
                    <Question>What's your favorite food?</Question>
                    <Option value="0">Mac n Cheese</Option>
                    <Option value="1">Steak</Option>
                    <Option value="2">Sushi</Option>
                    <Option value="3">Pad Thai</Option>
                </QuestionGroup>
                <QuestionGroup questionNumber={2}>
                    <Question>What's your favorite food?</Question>
                    <Option value="0">Mac n Cheese</Option>
                    <Option value="1">Steak</Option>
                    <Option value="2">Sushi</Option>
                    <Option value="3">Pad Thai</Option>
                </QuestionGroup>
                <QuestionGroup questionNumber={3}>
                    <Question>What's your favorite food?</Question>
                    <Option value="0">Mac n Cheese</Option>
                    <Option value="1">Steak</Option>
                    <Option value="2">Sushi</Option>
                    <Option value="3">Pad Thai</Option>
                </QuestionGroup>
                <QuestionGroup questionNumber={4}>
                    <Question>What's your favorite food?</Question>
                    <Option value="0">Mac n Cheese</Option>
                    <Option value="1">Steak</Option>
                    <Option value="2">Sushi</Option>
                    <Option value="3">Pad Thai</Option>
                </QuestionGroup>
            </Test>
        </form>

        {/* 3) Video Player */}
        {YTURL && (
            <div className="VideoPlayerSection">
                {/* VIDEO GOES HERE ONCE FETCHED */}
                <Iframe url={`https://www.youtube.com/embed/${YTURL}`}
                    width="640px"
                    height="320px"
                    id=""
                    className=""
                    display="block"
                    position="relative"/>
            </div>
        )}

        {/* 4) Transcript */}
        <div className="TranscriptSection">
            <h1>Transcript</h1>
        </div>

        {/* 5) Display User Performance in Timestamp */}
        {state.selectedOptions[0] &&(
            <h1>{state.selectedOptions[0]}</h1>
        )}
        
        <div className="TranscriptSection">
            <h1>Timestamp</h1>
        </div>     
    </div>
  )
}

export default Home