import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Typography, Box, Stack } from '@mui/material'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import axios from 'axios'
import Videos from './Videos'
import Loader from './Loader'
import {axiosGetReq} from '../functions/index';

const VideoDetail = () => {  
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  
  const questions = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];
  const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
  useEffect(() => {
    const fetchResults = async () => {
      const data = await axiosGetReq(`videos?part=snippet,statistics&id=${id}`);
      setVideoDetail(data.items[0]);

      const videosData = await axiosGetReq(
        `search?part=snippet&relatedToVideoId=${id}&type=video`
      );
      setVideos(videosData.items);
    };

    fetchResults();
  }, [id]);
  
  const axios = require("axios");

  const options = {
    method: 'GET',
    url: 'https://youtube-transcriptor.p.rapidapi.com/transcript',
    params: {video_id: `${id}`, lang: 'en'},
    headers: {
      'X-RapidAPI-Key': '307d29b2aemsh4b3069d80c4ee7dp185504jsna24a43b17c36',
      'X-RapidAPI-Host': 'youtube-transcriptor.p.rapidapi.com'
    }
  };
  
  const [transcription, setTranscription] = useState(null);
  let [string, setString] = useState("");

  useEffect(() => {
  const fetchTranscript = async () => {
    axios.request(options).then(function (response) {
      const transcript = response.data.map((item) => item.transcription);
      setTranscription(transcript);
      if (transcript[0]){
        let bruh = "";
        for(var i = 0; i < transcript[0].length/10; i++){
          bruh += " " + JSON.stringify(transcript[0][i].subtitle);
        }
        let final = bruh.replace(/['"]+/g, '');
        setString(final);
      }
    }).catch(function (error) {
      console.error(error);
    });
  }
  fetchTranscript();
}, []);

    let prompt = "\n" + string + "\n\n" + "Generate 2 Multiple Choice Questions with answers and explanation based on the above text;";
    const options2 = {
      method: 'POST',
      url: 'https://openai37.p.rapidapi.com/text-completion',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'c54168ad93msh0f6dab9e177ff08p1a16d4jsn47dab7da28be',
        'X-RapidAPI-Host': 'openai37.p.rapidapi.com'
      },
      data: JSON.stringify({ prompt , max_tokens: 300, temperature: 0.3, top_p: 1, frequency_penalty: 0, presence_penalty: 0, stop: ['\n', '###'] } )
    };

    let [mcq, setMcq] = useState([])

    useEffect(() => {
      const fetchMCQ = async () => {
        try{
            const res = await axios.request(options2)
            .then((response) => {
              setMcq(response.data);
              console.log(mcq)
            })
        }catch (error){
          console.error(error);
        }
      };
    fetchMCQ();
    }, []);

  if (!videos) <Loader />;

  return (
    <>
      {videoDetail && (
        <Stack direction={{ xs: 'column', md: 'row' }}>
          <Box flex={1}>
            <Box sx={{ width: '100%', position: 'sticky', top: '100px' }}>
              <ReactPlayer
                className='react-player'
                controls
                url={`https://www.youtube.com/watch?v=${id}`}
              />
              <Typography color='#fff' fontSize={18} fontWeight={500} p={1.5}>
                {videoDetail?.snippet?.title}
              </Typography>
              <Stack
                direction='row'
                justifyContent='space-between'
                gap='40px'
                sx={{ color: '#fff' }}
              >
                <Link to={`/channel/${videoDetail?.snippet?.channelId}`}>
                  <Typography
                    fontSize={{ md: 20, xs: 16 }}
                    fontWeight={600}
                    mx={{ md: 2, xs: 0 }}
                    color='#fff'
                  >
                    {videoDetail?.snippet?.channelTitle}
                    <CheckCircleIcon
                      sx={{ fontSize: '12px', color: 'gray', ml: '5px' }}
                    />
                  </Typography>
                </Link>
                <Stack direction='row' gap='20px' alignItems='center'>
                  <Typography
                    sx={{ opacity: 0.7, fontSize: { md: '16px', xs: '14px' } }}
                  >
                    {parseInt(
                      videoDetail?.statistics?.viewCount
                    ).toLocaleString('en-US')}{' '}
                    views
                  </Typography>

                  <Stack
                    direction='row'
                    alignItems='center'
                    gap='10px'
                    sx={{ opacity: 0.7, fontSize: { md: '16px', xs: '14px' } }}
                  >
                    <ThumbUpAltOutlinedIcon />
                    <span>
                      {parseInt(
                        videoDetail?.statistics?.likeCount
                      ).toLocaleString('en-US')}
                    </span>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Box>
          {console.log(string)}
          <div className='subtitles'>
            {string && (
              <>
                <h2 className='transcriptHeading'>Generated Transcript</h2>
                <p className='textSub'>{string}</p>
              </>
            )}
          </div>
        </Stack>
        
      )}
      {mcq && (
          <div className='questions'>
              <p>{mcq.data}</p>
          </div>       
      )}  
      
      
            {/* A JSX comment 

            {showScore ? (
              <div className='score-section'>
                You scored {score} out of {questions.length}
              </div>
            ) : (
              <>
                <div className='question-section'>
                  <div className='question-count'>
                    <span>Question {currentQuestion + 1}</span>/{questions.length}
                  </div>
                  <div className='question-text'>{questions[currentQuestion].questionText}</div>
                </div>
                <div className='answer-section'>
                  {questions[currentQuestion].answerOptions.map((answerOption) => (
                    <button class = "padding_buton" onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                  ))}
                </div>
              </>
            )}
            */}
    </>
  );
};

export default VideoDetail;
