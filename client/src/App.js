import React, { useCallback, useState, useEffect } from 'react';
import './App.css';
import { useWeb3 } from '@openzeppelin/network/react';
import Web3 from 'web3';

const infuraProjectId = 'a47dfbccb702458c84339d41f760756c';

const tokenAddress = "0x101848D5C5bBca18E6b4431eEdF6B95E9ADF82FA";

const walletAddress = "REPLACE_WITH_WALLET_ADDRESS";

const minABI = [
  // balanceOf
  {
    "constant":true,
    "inputs":[{"name":"_owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"name":"balance","type":"uint256"}],
    "type":"function"
  },
  // decimals
  {
    "constant":true,
    "inputs":[],
    "name":"decimals",
    "outputs":[{"name":"","type":"uint8"}],
    "type":"function"
  }
];

export default function App() {

  const web3Context = useWeb3(`wss://mainnet.infura.io/ws/v3/${infuraProjectId}`);

  const web3 = new Web3(`wss://mainnet.infura.io/ws/v3/${infuraProjectId}`);

  const { networkId, networkName, accounts, providerName, lib  } = web3Context;

  const [balance, setBalance] = useState(0);

  const contract = new web3.eth.contract(minABI).at(tokenAddress);
 

  const requestAuth = async web3Context => {
  try {
    await web3Context.requestAuth();
    } catch (e) {
    console.error(e);
    }
  };
    
  const requestAccess = useCallback(() => requestAuth(web3Context), []);


  const getBalance = useCallback(async () => {
    let balance = accounts && accounts.length > 0 ? lib.utils.fromWei(await lib.eth.getBalance(accounts[0]), 'ether') : 'Unknown';
    setBalance(balance);
  }, [accounts, lib.eth, lib.utils]);
      
  useEffect(() => {
  getBalance();
  }, [accounts, getBalance, networkId]);

  

  contract.balanceOf(walletAddress, (error, balance) => {
    // Get decimals
    contract.decimals((error, decimals) => {
      // calculate a balance
      balance = balance.div(10**decimals);
      console.log(balance.toString());
    });
  });



  return (
  <div className="App bg-black text-white w-screen h-screen">
    <div className='grid grid-flow-col place-items-center w-screen h-10'>
      <p className='text-base'>Sovryn</p>
      {accounts && accounts.length ? (
          
            <button onClick={requestAccess}>{accounts[0]}</button>
          
        ) : !!networkId && providerName !== 'infura' ? (
          
            <button onClick={requestAccess}>Connect Wallet</button>
          
        ) : (
          
            <button onClick={requestAccess}>{accounts[0]}</button>
        
        )}
    
    </div>
    
    <div>
      {accounts && accounts.length ? (
          <div>
            <p>rEth Balance: {balance}</p>
            <p>Weenus Token Balance: </p>
          </div>
        ) : (
          <></>
        )}
    </div>

  </div>
  );
}