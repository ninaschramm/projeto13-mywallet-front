import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import UserContext from "../contexts/UserContext";
import dayjs from "dayjs";

export default function NewDebit() {

    const {token, setToken, name} = useContext(UserContext);
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const date = `${dayjs().format('DD/MM')}`
    const [isDisabled, setIsDisabled] = useState(false);

    const headers = {
        Authorization: `Bearer ${token}`,
    }


    function postEntry(event) {
        event.preventDefault();
        setLoading(true)
        setIsDisabled(true)

        const entry = {
            value: `${value}`,
            description: `${description}`,
            type: "debit",
            date: `${date}`
        }

        const promise = axios.post("https://ninaschramm-mywallet.herokuapp.com/entries", entry, {headers})
        promise.then(response => navigate('/home'))
        promise.catch(err => treatError(err))
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
                <form action="#" onSubmit={postEntry}>            
                    <input required disabled={isDisabled} type="value" id="valueInput" placeholder='Valor' value={value} onChange={(e) => setValue(e.target.value)} />              
                    <input required disabled={isDisabled} type="description" id="descInput" placeholder='Descrição' value={description} onChange={(e) => setDescription(e.target.value)} />
                    <button disabled={isDisabled} type="submit">
                        { loading ? 
                        <div className="loader">
                        <ThreeDots
                        color="#FFFFFF" />
                        </div> :
                        "Salvar Saída" }
                        </button>
                </form>
            </Form>
            <Link to="/home">Cancelar</Link>
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
