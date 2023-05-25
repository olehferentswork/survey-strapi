import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import axios from "axios";
import '../styles/index.css'

function createData(
  email: string,
  question: string,
  answer: string,
) {
  return { email, question, answer };
}

interface Rows {
  email: string;
  question: string;
  answer: string;
}

function Admin() {
  const [rows, setRows] = useState<Rows[]>([])
  const [question, setQuestion] = useState<string>('');
  const [firstAnswer, setFirstAnswer] = useState<string>('');
  const [secondAnswer, setSecondAnswer] = useState<string>('');
  const [thirdAnswer, setThirdAnswer] = useState<string>('');
  const getResults = async () => {
    const results = await axios.get(`${import.meta.env.VITE_API_URL}/api/results`)
    const i = results.data.data.map((item: {id: number, attributes: {[key: string]: string}}) => (
      createData(item.attributes.email, item.attributes.surveyQuestion, item.attributes.surveyResponse)
    ))
    setRows(i)
  }

  const handleQuestion = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/surveys`, {
      "data": {question: question, a: firstAnswer, b: secondAnswer, c: thirdAnswer}
    })
    setQuestion('')
    setFirstAnswer('')
    setSecondAnswer('')
    setThirdAnswer('')
  }

    useEffect(() => {
      getResults()
  },[])
  return (
    <div className="container">
      <h3>Create new question</h3>
      <TextField id="outlined-basic" label="Question" variant="outlined" value={question} onChange={(e) => setQuestion(e.target.value)} />
      <TextField id="outlined-basic" label="Answer 1" variant="outlined" value={firstAnswer} onChange={(e) => setFirstAnswer(e.target.value)} />
      <TextField id="outlined-basic" label="Answer 2" variant="outlined" value={secondAnswer} onChange={(e) => setSecondAnswer(e.target.value)} />
      <TextField id="outlined-basic" label="Answer 3" variant="outlined" value={thirdAnswer} onChange={(e) => setThirdAnswer(e.target.value)} />
      <Button variant="contained" onClick={handleQuestion}>Create</Button>

      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Email/name</TableCell>
              <TableCell align="right">Question</TableCell>
              <TableCell align="right">Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.email}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.email}
                </TableCell>
                <TableCell align="right">{row.question}</TableCell>
                <TableCell align="right">{row.answer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Admin;