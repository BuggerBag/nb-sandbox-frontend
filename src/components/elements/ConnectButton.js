import React, { useState, useEffect } from 'react'
import Button from '../elements/Button'

import { connectWallet, getCurrentWalletConnected } from '../../utils/interact'
import { setGlobalState, useGlobalState } from '../../state'
import { getTokenBalance } from '../../hooks/useContract'
import { commify, insertDecimalSeparator } from '../../utils/format'


const ConnectButton = () => {
    const [account] = useGlobalState('account');
    const [status, setStatus] = useState('')

    const updateBalance = () => {
      getTokenBalance()
        .then((userBalance) => {
          if (userBalance.toString() == "0") {
            setGlobalState('balance', '0.0000');
          } else {
            setGlobalState('balance', commify(insertDecimalSeparator(userBalance.toString(), 4)));
          }
      })
    }

    useEffect(() => {      
        async function fetchWallet() {
          const {address, status} = await getCurrentWalletConnected();
          setGlobalState('account', address);
          updateBalance();
          setStatus(status); 
          addWalletListener();
        }
        fetchWallet();
      }, []);

      function addWalletListener() {
        if (window.ethereum) {
          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
              setGlobalState('account', accounts[0]);
              updateBalance();
              setStatus("👆🏽 Write a message in the text-field above.");
            } else {
              setGlobalState('account', '');
              setStatus("🦊 Connect to Metamask using the top right button.");
            }
          });
        } else {
          setStatus(
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          );
        }
      }

    const connectWalletPressed = async () => {
        const walletResponse = await connectWallet();
        setStatus(walletResponse.status);
        setGlobalState('account', walletResponse.address);
        updateBalance();
    };

    return <>
        <h6 className="wallet-address" style={{cursor: "pointer"}} onClick={connectWalletPressed}>
            {account.length > 0 ? (
                "Connected: " + 
                String(account).substring(0,10) +
                "..." +
                String(account).substring(38)
            ) : (
                <span>Connect Wallet</span>
            )
        }
        </h6>
    </>
}

export default ConnectButton