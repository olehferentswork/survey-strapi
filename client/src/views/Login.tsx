import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../styles/index.css'

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('')
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/local`, {
      identifier: email, password: password
    })
      .then(() => {
        navigate('/admin')
      })
      .catch(() => setError('Wrong email or password'))
  }

  return (
    <div className="container">
      <TextField  required id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField required id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" size="large" onClick={handleSubmit}>Log in</Button>
      <p className="error">{error}</p>
    </div>
  );
}

export default Login;