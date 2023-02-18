import React from 'react'
import { useState } from 'react'
import './Home.css'
import Iframe from 'react-iframe'
import { Test, QuestionGroup, Question, Option } from 'react-multiple-choice'

const Home = () => {
    // video URL - empty originally 
    const [YTURL, setYTURL] = useState("")
    // YT title - only shows after user submits URL
    const [vidTitle, setVidTitle] = useState("")
    // YT video ID - only shows after user submits URL
    const [vidID, setVidID] = useState("")
    const [state, setState] = useState({
        selectedOptions: {}
    });
    // YT video 

    // fetch video
    const handleSubmit = (e) => {
    // set vidTitle to fetched title
        e.preventDefault()
        // call to google API to get video contents
        // set video title
        setVidTitle("Video Title")
    }

    return (
    <div className="container">
        
        {/* 1) Search Bar/Title */}
        <div className="SearchBarTitleSection">
            {/* If video has not been fetched, show URL bar */}
            {!vidTitle &&(
                <>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className='headings' htmlFor="title">URL:</label>                                    
                            <input
                                type="text"
                                className="form-control"
                                id="YTURL"
                                placeholder="Paste your Video URL here"
                                value={YTURL}
                                onChange={e => setYTURL(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Get Video</button>
                    </form>
                </>
            )}
            {/* If video has been fetched, show video title and button to paste new video */}
            {vidTitle && (
                <>
                    <div className="card-body">
                        <h5 className="card-title">{vidTitle}</h5>
                        <button type="submit" onClick={() => setVidTitle("")} className="btn btn-primary">Get Video</button>
                    </div>
                </>
            )}
        </div>

        {/* 2) Quiz */}
        <Test onOptionSelect={e => setState({...state, selectedOptions: e.target.value})}>
            <QuestionGroup questionNumber={0}>
                <Question>What's your favorite food?</Question>
                <Option value="0">Mac n Cheese</Option>
                <Option value="1">Steak</Option>
                <Option value="2">Sushi</Option>
                <Option value="3">Pad Thai</Option>
            </QuestionGroup>
        </Test>

        {/* 3) Video Player */}
        <div className="VideoPlayerSection">
            {/* VIDEO GOES HERE ONCE FETCHED */}
            <Iframe url="https://www.sdrive.app/embed/1ptBQD"
                width="640px"
                height="320px"
                id=""
                className=""
                display="block"
                position="relative"/>
        </div>

        {/* 4) Transcript */}
        <div className="TranscriptSection">
            <h1>Transcript</h1>
        </div>

        {/* 5) Display User Performance in Timestamp */}
        <div className="TranscriptSection">
            <h1>Timestamp</h1>
        </div>

        

    </div>
  )
}

export default Home