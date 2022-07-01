import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import UserContext from "../contexts/UserContext";

export default function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const {token, setToken} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    function signInUser(event){ 
        event.preventDefault();
        setLoading(true)
        setIsDisabled(true)

        const user = {
            email: `${email}`,
            password: `${password}`
        }

        const promise = axios.post("http://localhost:5009/signin", user)
        promise.then(response => login(response))
        promise.catch(err => treatError(err))
    }

    function login(response) {
        console.log(response)
        setToken(response.data.token)
        navigate('/hoje')
    }

    function treatError(err) {
        alert(`${err.response.data}`)
        setIsDisabled(false)
        setLoading(false)
    }

    return (
        <Container>           
            <h1>My Wallet</h1>
            <Form>
                <form action="#" onSubmit={signInUser}>            
                    <input required disabled={isDisabled} type="email" id="emailInput" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />              
                    <input required disabled={isDisabled} type="password" id="passInput" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button disabled={isDisabled} type="submit">
                        { loading ? 
                        <div className="loader">
                        <ThreeDots
                        color="#FFFFFF" />
                        </div> :
                        "Entrar" }
                        </button>
                </form>
            </Form>
            <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
        </Container>
    )
 }

const Container = styled.div` 
display: flex;
flex-direction: column;   
background: #8C11BE;
align-items: center;
justify-content: center;
width: 100%;
height: 100vh;
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 18px;
color: #FFFFFF;

    h1 {
        font-family: 'Saira Stencil One';
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        line-height: 50px;
    }    

    a, a:visited {
        text-decoration: none;
        color: #FFFFFF;
    }
`

const Form = styled.div` 

    margin: 30px 0 25px;

    form {
        display: flex;
        flex-direction: column;
        gap: 13px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #000000;

        input {

            box-sizing: border-box;
            padding: 0 10px;
            width: 326px;
            height: 58px;
            background: #FFFFFF;
            border: 0px;
            border-radius: 5px;
            font-size: 20px;
            line-height: 23px;
            color: #000000;

            ::placeholder {

                color: #000000;
            }
            }

        
        button {
            width: 326px;
            height: 46px;
            background: #A328D6;
            border-radius: 5px;
            border: 0px;            
            font-size: 20px;
            line-height: 23px;
            display: flex;
            align-items: center;
            justify-content: center;
            align-self: center;
            color: #FFFFFF;
        }

        button:hover:enabled {
            filter: brightness(115%);
            cursor: pointer;
            }

    }
`
