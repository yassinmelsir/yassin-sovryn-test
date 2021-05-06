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
  const [inputOne, setInputOne] = useState('')
  const [inputTwo, setInputTwo] = useState('')
  const [transactionAddress, setTransactionAddress] = useState('')
  const [transactionReceipt, setTransactionReceipt] = useState('')
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

  function changeHandlerOne (event) {
    setInputOne(event.target.value)
  }

  function changeHandlerTwo (event) {
    setInputTwo(event.target.value)
  }

  function sendToken () {
    (inputTwo.length > 0 && inputOne.length > 0) ? 
      weenusContract.methods.transfer(inputTwo, inputOne).send({from: accounts[0]}) 
        .on('transactionHash', function(hash){
          setTransactionAddress(hash)
        })
        .on('confirmation', function(confirmationNumber, receipt){
            console.log(confirmationNumber, receipt)
        })
        .on('error', function(error, receipt) {
            console.log(error, receipt)
        })
    : 
      console.log('input transaction address/amount')
  }

  const getTransaction = useCallback(async () => {
    let transaction = transactionAddress.length > 0 ? await web3.eth.getTransaction(transactionAddress) : 'unkown'
    setTransactionReceipt(transaction)
  })

  useEffect(()=>{
    getTransaction();
  }, [transactionAddress])

  console.log(transactionReceipt)
  return (
  <div className="App bg-black text-white w-screen h-screen ">
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
          <div className='grid grid-flow-row gap-2 place-items-center'>
            <div>
              <form>
                <div className='grid grid-flow-col gap-2 w-full text-black'>
                    <div className='grid grid-flow-row gap-2 text-white place-items-start'>
                      <p>rEth Balance:</p>
                      <p>Weenus Balance:</p>
                      <p >Transaction Size:</p>
                      <p >Receiving Address:</p>
                    </div>
                    <div className='grid grid-flow-row gap-2 place-items-end '>
                      <p className='text-white'>{balance}</p>
                      <p className='text-white'>{tokenBalance}</p>
                      <input type='text' className='w-20' placeholder={inputOne} onChange={changeHandlerOne} />
                      <input type='text' className='w-120' placeholder={inputTwo} onChange={changeHandlerTwo} />
                    </div>
                    
                    
                    
                </div>
              </form>
            </div>
            <button className='bg-white w-80 h-10 text-black' onClick={sendToken}>Send</button>
          </div>
        ) : (
          <></>
        )}
    </div>

  </div>
  );
}