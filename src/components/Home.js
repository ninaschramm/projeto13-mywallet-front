import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function Home() {

    const {token, name, setName} = useContext(UserContext);
    const [entryList, setEntryList] = useState([]);
    const [saldo, setSaldo] = useState(0);
    const [showList, setShowList] = useState(false);
    const [colorSaldo, setColorSaldo] = useState("");


    const headers = {
        Authorization: `Bearer ${token}`,
    }

    useEffect(() => {const promise = axios.get(`https://ninaschramm-mywallet.herokuapp.com/entries`, {headers});
    promise.then (response => handleList(response))
}, [])

function handleList(response) {
    setEntryList(response.data);
    setName(response.data[0].username);
    if (entryList.length != 0) {
        setShowList(true)
    }
    let s = 0.00;

    const positive = entryList.filter((v) => v.type == "credit");
    const negative = entryList.filter((v) => v.type == "debit");
    
    for (let elt of positive) {
        s += parseFloat(elt.value)
    }
    for (let elt of negative) {
        s -= parseFloat(elt.value)
    }

    setSaldo(s.toFixed(2))
}

function isPositive(value) {
    return value > 0;
}

function isNegative(value) {
    return value < 0;
}

return (
    <Container>
        <Title>
           Olá, {name}!     
           <Link to="/"> <ion-icon name="exit-outline"></ion-icon> </Link>
        </Title>
        <EntryList>
            { showList ? <>
            <div>
    {        entryList.map((entry, value) => <Entry> <Date key={value}>  {entry.date} </Date> 
            <Description key={value}>{entry.description}</Description>
            <Value key={value} color={`${entry.type}`}> {entry.value} </Value></Entry>)}</div>
            <Saldo><div>SALDO</div> <div><p color={`${colorSaldo}`}>{saldo}</p></div></Saldo></>
            :
            <NoList>Não há registros de<br></br> entrada ou saída</NoList> }
            
        </EntryList> 
        <Reqs>
            <Link to="/entrada"><NewEntry><ion-icon name="add-circle-outline"></ion-icon> <p>Nova <br></br>Entrada</p></NewEntry></Link>
            <Link to="/saida"><NewEntry><ion-icon name="remove-circle-outline"></ion-icon> <p>Nova <br></br>Saída</p></NewEntry></Link>   
        </Reqs> 
           
       
               
    </Container>
    
)

}

const handleColor = color => {
    switch (color) {
        case "credit":
         return "#03AC00";
        case "debit":
            return "#C70000";
        case "default":
            return "#000000";
    }
  };

const Container = styled.div` 
    display: flex;
    flex-direction: column;   
    gap: 10px;
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

const Title = styled.div`
    width: 326px;
    height: 31px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
    display: flex;
    justify-content: space-between;
`

const EntryList = styled.div `
    width: 326px;
    height: 446px;
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px 10px;

    div {
        gap: 10px;
    }
`

const NoList = styled.div `
    width: 300px;
    height: 446px;
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
`

const Entry = styled.div `
    height: 20px;
    display: flex;
    justify-content: space-evenly;
    margin: 2px 5px;
`

const Date = styled.div `
    width: 48px;
    height: 171px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #C6C6C6;
`

const Description = styled.div `
    width: 145px;
    height: 171px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
`

const Value = styled.div `
    width: 62px;
    height: 171px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: ${({ color }) => handleColor(color)};
    text-align: right;
`

const Saldo = styled.div`
    height: 20px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    display: flex;
    padding: 10px;
    color: #000000;
    bottom: 30px;
    justify-content: space-between;
`

const NewEntry = styled.div `
    width: 155px;
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;

    ion-icon {
        font-size: 20px;
    }
`

const Reqs = styled.div `
    display: flex;
    gap: 15px;
`