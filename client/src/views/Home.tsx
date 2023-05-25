import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import axios from "axios";
import '../styles/index.css'
function Home() {
  const [email, setEmail] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [firstAnswer, setFirstAnswer] = useState<string>('');
  const [secondAnswer, setSecondAnswer] = useState<string>('');
  const [thirdAnswer, setThirdAnswer] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [allAnswered, setAllAnswered] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer((event.target as HTMLInputElement).value);
  };

  const handleSubmit = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/results`, {
      "data": {email: email, surveyQuestion: question, surveyResponse: userAnswer}
    })
  }

  const handleEmail = async () => {
    const results = await axios.get(`${import.meta.env.VITE_API_URL}/api/results`)
    const survey = await axios.get(`${import.meta.env.VITE_API_URL}/api/surveys`)
    const userResults = results.data.data.filter((result: {id: number, attributes: {[key: string]: string}}) =>
      result.attributes.email === email)
    const questions = survey.data.data.filter((item: {id: number, attributes: {[key: string]: string}}) =>
      !userResults.some((result: {id: number, attributes: {[key: string]: string}}) =>
        result.attributes.surveyQuestion === item.attributes.question))
    if (questions.length) {
      const randomSurvey = questions[Math.floor(Math.random() * questions.length)];
      setQuestion(randomSurvey.attributes.question)
      setFirstAnswer(randomSurvey.attributes.a)
      setSecondAnswer(randomSurvey.attributes.b)
      setThirdAnswer(randomSurvey.attributes.c)
      setShowQuestion(true)
    } else {
      setAllAnswered(true)
    }
  }

  return (
    <div className="container">
      {allAnswered ? (
        <p>Thank you! You already answered to all of the questions</p>
      ) : (
        <>
          {showQuestion ? (
            <>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">{question}</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  value={userAnswer}
                  onChange={handleChange}
                >
                  <FormControlLabel value="a" control={<Radio />} label={firstAnswer} />
                  <FormControlLabel value="b" control={<Radio />} label={secondAnswer} />
                  <FormControlLabel value="c" control={<Radio />} label={thirdAnswer} />
                </RadioGroup>
              </FormControl>
              <Button variant="contained" size="large" onClick={handleSubmit}>Submit answer</Button>
            </>
          ): (
            <>
              <TextField id="outlined-basic" label="Email/name" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Button variant="contained" size="large" onClick={handleEmail}>Submit email/name</Button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Home;