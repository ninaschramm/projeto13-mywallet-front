import { BrowserRouter, Routes, Route } from "react-router-dom";
import './css/reset.css';
import UserContext from "./contexts/UserContext";
import { useState } from "react";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import NewCredit from "./components/NewCredit";
import NewDebit from "./components/NewDebit";


function App() {

  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const contextValue = { token, setToken, name, setName };


  return (
    <UserContext.Provider value={ contextValue } >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/entrada" element={<NewCredit />} />
          <Route path="/saida" element={<NewDebit />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
