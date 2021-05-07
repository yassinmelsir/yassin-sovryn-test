import React, { useCallback, useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';  
import { ReactSVG } from 'react-svg'
import logo from './sovryn.svg'
import { IoMdExit } from "react-icons/io";
import {SiReactos} from "react-icons/si";

const tokenAddress = "0x101848D5C5bBca18E6b4431eEdF6B95E9ADF82FA";
const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"drip","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]

const ExitButton = ({props}) => {
  const {setAccounts, walletAddress} = props
  
  function removeAccounts () {
    console.log('remove')
    setAccounts(null)
    console.log('remove accounts')
  }


  return(
    <div className='w-40 h-9 border rounded-lg border-black grid grid-flow-col place-items-center '>
      <div className=' w-8 h-full grid grid-cols-1 place-items-center rounded-l-lg bg-walletBg w-full'><p className='text-xs font-semibold'>{walletAddress}</p></div>
      
      <div className=' w-8 h-full grid grid-cols-1 place-items-center bg-walletBg w-full'><SiReactos color="red" className='w-5 h-5' /> </div>
      
      <div  className=' w-full h-full grid grid-cols-1 place-items-center rounded-r-lg bg-walletExit'>
        <button onClick={removeAccounts} className='w-6 h-6 grid grid-cols-1 place-items-center'><IoMdExit color='#d7a91f' className='bg-opacity-0 w-6 h-6' /></button>
      </div>
    </div>
  )
}

const Nav = ({props}) => {

  const { areAccounts, getAccounts, accounts, setAccounts } = props


  if (areAccounts) {var walletAddress = `${accounts[0].slice(0,4)}...${accounts[0].slice(accounts[0].length-5,accounts[0].length-1)}`}

  const buttonProps = { walletAddress, getAccounts, setAccounts }

  return(
    <div className='absolute top-0 grid grid-flow-col place-items-center w-screen h-14 bg-nav'>
      <div className='grid grid-cols-1 place-items-center absolute left-5'>
        <ReactSVG src={logo} />
      </div>
      
        
      <div className='grid grid-cols-1 place-items-center absolute right-5 '>
        { areAccounts ? (
            
            <ExitButton props={buttonProps} />
                      
          ) : (
            
            <button className='w-40 h-9 border rounded-lg text-engage border-engage ' onClick={getAccounts}>Engage Wallet</button>
          
          )}
      </div>
      
    
    </div>
  )
}

const Send = ({props}) => {
  const [selectedToken, setSelectedToken] = useState('WEENUS')
  const {balance, tokenBalance, value, address, valueInputHandler, addressInputHandler, areAccounts, sendToken} = props
  const containerClass = `relative grid grid-cols-1 place-items-center mt-40 border-opacity-20 rounded-xl border border-white ${ !areAccounts ? 'opacity-50' : 'opacity-100' }`

  function selectToken (token) {
    setSelectedToken(token)
  }
  return(
     <div style={{width: '400px', height: '500px'}} className={containerClass }>
      
          
              
                <p className='text-4xl opacity-95 font-bold'>SEND</p>
              
            
  

                  <p className='text-left text-base opacity-90'>Asset:</p>

                <div style={{width: '300px'}} className='h-9 border rounded-lg border-hueBlue grid grid-flow-col place-items-center '>

                  <button onClick={()=> selectToken('rETH')} style={{width: '150px'}} className= {`w-40 h-full grid grid-cols-1 place-items-center rounded-l-lg ${selectedToken === 'rETH' ? 'bg-selectedTokenMenu' : 'bg-unSelectedTokenMenu'}`}><p className=''>rETH</p></button>
                  
                  
                  <button onClick={()=> selectToken('WEENUS')} style={{width: '150px'}}  className={`w-40 h-full grid grid-cols-1 place-items-center rounded-r-lg ${selectedToken === 'WEENUS' ? 'bg-selectedTokenMenu' : 'bg-unSelectedTokenMenu'}`} ><p className=''>WEENUS</p></button>
                  
                </div>


                  <p className='text-left text-xs opacity-70'>Available Balance: {selectedToken === 'rETH' ? balance + ' rETH' : tokenBalance + ' WEENUS' }</p>


            
                

              

              <form className=''>
                <div className='grid grid-flow-row gap-2 w-full text-black'>
                <p className='text-left text-base text-white opacity-90'>Amount:</p>
                      <input type='text' style={{width: '300px'}} className='h-9 rounded-lg text-black bg-opacity-80 placeholder-black font-bold placeholder-opacity-70 placeholder-opacity-100 text-center' placeholder={ selectedToken === 'rETH' ? balance + ' rETH' : tokenBalance + ' WEENUS'} onChange={valueInputHandler} />
                      <p className='text-left  text-white  text-base opacity-90'>Send To:</p>
                      <input type='text' style={{width: '300px'}} className='h-9 rounded-lg placeholder-black placeholder-opacity-50 font-bold text-center text-black bg-opacity-80' placeholder={'Type or Paste Address'} onChange={addressInputHandler} />
                   
                    
                    
                    
                </div>
              </form>
           
            
            
            <button className='bg-buttonColor w-40 h-12 text-black text-xl font-bold rounded-lg' onClick={sendToken}>SUBMIT</button>
          
        
    </div>
  )
}

const Receipt = ({props}) => {
  const { address, value, transactionComplete, reset, areAccounts } = props
  return(
    <div>
      {areAccounts ? (
          <div className='grid grid-flow-row gap-2 place-items-center'>
            <p>Transactions</p>
            <div className='grid grid-flow-col gap-2 w-1/2 text-black place-items-center'>
              <div className='grid grid-flow-row gap-2 text-white place-items-start'>
                <p className='text-white'>Receiving Address:</p>
                <p className='text-white'>{address}</p>
              </div>
              <div className='grid grid-flow-row gap-2 text-white place-items-start'>
                <p className='text-white'>Transaction Value:</p>
                <p className='text-white'>{value}</p>
              </div>
              <div className='grid grid-flow-row gap-2 place-items-end '>
                <p className='text-white'>Transaction Status:</p>
                <p className='text-white'>{transactionComplete}</p>
              </div>                                            
            </div>
            <button className='bg-white w-80 h-10 text-black' onClick={reset}>Send another token</button>
          </div>
        ) : (
          <></>
        )}
    </div>
  )
}

const App = () => {
  const web3 = new Web3(Web3.givenProvider || "ws://localhost:5730");
  console.log(web3)
  const [accounts, setAccounts] = useState(null)
  const weenusContract = new web3.eth.Contract(abi, tokenAddress);
  const [balance, setBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState('null');
  const [value, setValue] = useState('')
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState(null)
  const [page, setPage] = useState('send')

  const getAccounts = useCallback(async () => {
    const accounts = await web3.eth.requestAccounts().then()
    setAccounts(accounts)
  }, [web3.eth]);


  const getBalance = useCallback(async () => {
    let balance = accounts && accounts.length > 0 ? await web3.eth.getBalance(accounts[0]) : 'Unknown';
    console.log('balance', balance)
    setBalance(balance/(Math.pow(10,18)))
  }, [accounts, web3.eth]);
      
  useEffect(() => {
    getBalance();
  }, [accounts, getBalance]);
  

  const getTokenBalance = useCallback(async () => {
    let tokenBalance = accounts && accounts.length > 0 ? await weenusContract.methods.balanceOf(accounts[0]).call().then(receipt=> {return receipt}) : 'unknown';
    setTokenBalance(tokenBalance);
  }, [accounts, weenusContract.methods])

  useEffect(()=>{
    getTokenBalance();
  }, [accounts, getTokenBalance])

  function valueInputHandler (event) {
    setValue(event.target.value)
  }

  function addressInputHandler (event) {
    setAddress(event.target.value)
  }

  function reset () {
    setPage('send')
    setStatus(null)
  }

  function sendToken () {
    (address.length > 0 && value.length > 0) ? 
      weenusContract.methods.transfer(address, value).send({from: accounts[0]}) 
        .on('transactionHash', function(hash){
          console.log(hash)
          setPage('receipt')
        })
        .on('confirmation', function(confirmationNumber, receipt){
          console.log(confirmationNumber, receipt)
          setStatus(receipt.status)
        })
        .on('error', function(error, receipt) {
            console.log(error, receipt)
        })
    : 
      console.log('input transaction address/amount')
  }

  const areAccounts = accounts && accounts.length
  const transactionComplete = address.length < 1 ? '' : status == null ? 'pending' : status ? 'successful' : 'failed'

  const props = {
    areAccounts, getAccounts, accounts, balance, 
    tokenBalance, value, address, valueInputHandler, addressInputHandler, 
    sendToken, value, transactionComplete, reset, setAccounts
  }

  return (
  <div className="App bg-mainbg text-white w-screen h-screen grid grid-cols-1 justify-items-center items-start">
    
    <Nav props={props} />
    <Send props={props} /> 
    { page === 'receipt' && <Receipt props={props}/>}

  </div>
  );
}
export default App;