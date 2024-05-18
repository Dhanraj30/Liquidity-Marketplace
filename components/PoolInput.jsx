import React, {useState,useEffect} from "react";
/*
import {Input} from "./index";
//import { TokenValidatorProvider } from "@uniswap/smart-order-router";

const PoolInput = ({
  notifyError,
  notifySuccess,
  LOAD_TOKEN,
  GET_POOL_ADDRESS,
  setPoolAddress, 
}) => {
  
  const [token_1, setToken_1] = useState();
  const [token_2, setToken_2] = useState();
  const [fee, setFee] = useState();
  //Display Token
  const [token_A, setToken_A] = useState();
  const [token_B, setToken_B] = useState();

  useEffect(() => {
    const loadToken = async () => {
      const token = await LOAD_TOKEN(token_A);
      if (token == undefined) {
        console.log("kindly past the token address");

      } else {
        setToken_1(token);
      }
    };
     loadToken();
  }, [token_A]);
  useEffect(() => {
    const loadToken = async () => {
      const token = await LOAD_TOKEN(token_B);
      if (token == undefined) {
        console.log("kindly past the token address");

      } else {
        setToken_2(token);
      }
    };
    loadToken();
  }, [token_B]);

  const CALLING_POOL_Add = async () => {
    if (!token_1 || !token_2 || !fee){
      return notifyError("Provide all details");
    } else {
      const pool = await GET_POOL_ADDRESS(token_1,token_2,fee);
      setPoolAddress(pool[0]);
    }
  };
  return (
  <>
    {
      token_1 ? (
      <Input value={`${token_1?.name} (${token_1?.symbol}) Bal: ${token_1?.balance.slice(0,8)}`} 
      />
    ) : (
      <Input placeholder={"Token A"} handleClick=
      {(e) => setToken_A(e.target.value)}
      />
    )}
    {
      token_2 ? (
      <Input value={`${token_2?.name} (${token_2?.symbol}) Bal: ${token_2?.balance.slice(0,8)}`} 
      />
    ) : (
      <Input placeholder={"Token B"} handleClick=
      {(e) => setToken_B(e.target.value)}
      />

    )}
     <Input placeholder={"Fee"} handleClick=
      {(e) => setFee(e.target.value)}
      />
      <button onClick={() => CALLING_POOL_Add()}
      className="btn btn--large btn--green-light
      btn--with-icon btn--icon-right full-width"
      >
        Check Pool
        <svg className="woox-icon icon-arrow-right">
          <use xlinkHref="#icon-arrow-right"></use>
        </svg>
      </button>
  </>
  );
};

export default PoolInput;
*/



import { Input } from "./index";

const PoolInput = ({
  notifyError,
  notifySuccess,
  LOAD_TOKEN,
  GET_POOL_ADDRESS,
  setPoolAddress,
}) => {
  const [token_1, setToken_1] = useState(null); // Provide initial value
  const [token_2, setToken_2] = useState(null); // Provide initial value
  const [fee, setFee] = useState(null); // Provide initial value

  const [token_A, setToken_A] = useState();
  const [token_B, setToken_B] = useState();
  useEffect(() => {
    const fetchToken = async () => {
      if (!token_A) return; // Return if token_A is empty
      try {
        const token = await LOAD_TOKEN(token_A);
        if (!token) {
          console.log("Please provide a valid token address");
        } else {
          setToken_1(token);
        }
      } catch (error) {
        console.error("Error loading token:", error);
        notifyError("Error loading token details");
      }
    };
    fetchToken();
  }, [token_A]);
  

  useEffect(() => {
    const fetchToken = async () => {
      if (!token_B) return; // Return if token_B is empty
      const token = await LOAD_TOKEN(token_B);
      if (!token) {
        console.log("Please provide a valid token address");
      } else {
        setToken_2(token);
      }
    };
    fetchToken();
  }, [token_B]);

  const CALLING_POOL_Add = async () => {
    if (!token_1 || !token_2 || !fee) {
      return notifyError("Please provide all details");
    } else {
      const pool = await GET_POOL_ADDRESS(token_1, token_2, fee);
      setPoolAddress(pool[0]);
    }
  };

  return (
    <>
      {token_1 ? (
        <Input
          value={`${token_1.name} (${token_1.symbol}) Bal: ${token_1.balance.slice(0, 8)}`}
        />
      ) : (
        <Input
          placeholder={"Token A"}
          onChange={(e) => setToken_A(e.target.value)} // Change to onChange
        />
      )}
      {token_2 ? (
        <Input
          value={`${token_2.name} (${token_2.symbol}) Bal: ${token_2.balance.slice(0, 8)}`}
        />
      ) : (
        <Input
          placeholder={"Token B"}
          onChange={(e) => setToken_B(e.target.value)} // Change to onChange
        />
      )}
      <Input
        placeholder={"Fee"}
        onChange={(e) => setFee(e.target.value)} // Change to onChange
      />
      <button
        onClick={CALLING_POOL_Add}
        className="btn btn--large btn--green-light btn--with-icon btn--icon-right full-width"
      >
        Check Pool
        <svg className="woox-icon icon-arrow-right">
          <use xlinkHref="#icon-arrow-right"></use>
        </svg>
      </button>
    </>
  );
};

export default PoolInput;

