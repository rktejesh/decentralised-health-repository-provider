import React from 'react'
import {useState, useEffect} from 'react';
import Web3 from 'web3';

 function Register() {

    const [isConnected, setIsConnected] = useState(false);
    const [ethBalance, setEthBalance] = useState("");
    
    const detectCurrentProvider = () => {
      let provider;
      if (window.ethereum) {
        provider = window.ethereum;
      } else if (window.web3) {
        provider = window.web3.currentProvider;
      } else {
        console.log("Non-ethereum browser detected. You should install Metamask");
      }
      return provider;
    };
    
    const onConnect = async() => {
      try {
        const currentProvider = detectCurrentProvider();
        if(currentProvider) {
          await currentProvider.request({method: 'eth_requestAccounts'});
          const web3 = new Web3(currentProvider);
          const userAccount  =await web3.eth.getAccounts();
          const account = userAccount[0];
          let ethBalance = await web3.eth.getBalance(account);
          setEthBalance(ethBalance);
          setIsConnected(true);
        }
      } catch(err) {
        console.log(err);
      }
    }
    
    const onDisconnect = () => {
      setIsConnected(false);
    }
  return (
    <div className='sign-in-form'>
        Connect to Metamask
    </div>
  )
}

export default Register
