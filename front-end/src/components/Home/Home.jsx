import React, { PureComponent}  from 'react'
import { useState, useEffect } from 'react'
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
    // answer state
    const [state, setState] = useState({selectedOptions: { Question: 0, Answer: 0 }})

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
                <Test onOptionSelect={(selected, questionNumber) => setState({ ...state, selectedOptions: { Question: questionNumber, Answer: selected}})}>
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
            {state.selectedOptions.Answer === 0 && (
                <>
                <h1>{state.selectedOptions.Question}</h1>
                </>
            )}
            
            
            <div className="TranscriptSection">
                <h1>Timestamp</h1>
            </div>     
        </div>
    )
}

export default Home