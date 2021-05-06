import React, { useCallback, useState, useEffect } from 'react';
import './App.css';
import { useWeb3 } from '@openzeppelin/network/react';
import Web3 from 'web3';  

const infuraProjectId = 'a47dfbccb702458c84339d41f760756c';
const tokenAddress = "0x101848D5C5bBca18E6b4431eEdF6B95E9ADF82FA";
const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"drip","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]

export default function App() {

  const web3Context = useWeb3(`wss://mainnet.infura.io/ws/v3/${infuraProjectId}`);
  const web3 = new Web3(window.ethereum);
  const weenusContract = new web3.eth.Contract(abi, tokenAddress);
  const [balance, setBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState('null');
  const { networkId, networkName, accounts, providerName, lib  } = web3Context;

 
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
  

  const getTokenBalance = useCallback(async () => {
    let tokenBalance = accounts && accounts.length > 0 ? await weenusContract.methods.balanceOf(accounts[0]).call().then(receipt=> {return receipt}) : 'unknown';
    setTokenBalance(tokenBalance);
  }, [accounts])

  useEffect(()=>{
    getTokenBalance();
  }, [accounts, getTokenBalance])

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
            <p>Weenus Token Balance: {tokenBalance}</p>
          </div>
        ) : (
          <></>
        )}
    </div>

  </div>
  );
}