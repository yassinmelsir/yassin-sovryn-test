import React, { useCallback, useState, useEffect } from 'react';

export default function Web3Data(props) {

const { web3Context } = props;

const { networkId, networkName, accounts, providerName, lib  } = web3Context;

const [balance, setBalance] = useState(0);

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


return (
<div>
<h3> {props.title} </h3>
	<div>
    Network: {networkId ? `${networkId} – ${networkName}` : 'No connection'}
	</div>
	<div>
	
	</div>
	<div>
	Provider: {providerName}
	</div>

	{accounts && accounts.length ? (
	<div>
		Your address: {accounts && accounts.length ? accounts[0] : 'Unknown'}
	<p>rEth Balance: {balance}</p>
	<p>Weenus Token Balance: </p>
	</div>
	) : !!networkId && providerName !== 'infura' ? (
	<div>
	<button onClick={requestAccess}>Request Access</button>
	</div>
	) : (
	<div></div>
	)}
</div>
);
}