import { BrowserRouter, Routes, Route } from "react-router-dom";
import './css/reset.css';
import UserContext from "./contexts/UserContext";
import { useState } from "react";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";


function App() {

  const [token, setToken] = useState("");
  const contextValue = { token, setToken };


  return (
    <UserContext.Provider value={ contextValue } >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/cadastro" element={<SignUp />} />
          {/* <Route path="/home" element={<Home />} />
          <Route path="/entrada" element={<NewCredit />} />
          <Route path="/saida" element={<NewDebit />} /> */}
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
