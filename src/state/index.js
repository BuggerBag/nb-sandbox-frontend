import { ethers } from 'ethers'
import { createGlobalState } from 'react-hooks-global-state'
import { getTokenBalance, getTokenSupply } from '../hooks/useContract'
import { commify, insertDecimalSeparator } from '../utils/format'
import { connectionInfo } from '../constants'

const { setGlobalState, useGlobalState } = createGlobalState({
    account: '',
    balance: '0.0000',
    totalSupply: '0.0000',
    wallets: [],
    provider: new ethers.providers.JsonRpcProvider(connectionInfo),
    signer: null
})

const updateBalance = (account, provider) => {
    getTokenBalance(account, provider)
        .then((userBalance) => {
            if (userBalance.toString() === '0') {
                setGlobalState('balance', '0.0000')
            } else {
                setGlobalState('balance', commify(insertDecimalSeparator(userBalance.toString(), 4)))
            }
        })
}

const updateTotalSupply = (provider) => {
    getTokenSupply(provider).then(s => {
        setGlobalState('totalSupply', commify(insertDecimalSeparator(s.toString(), 4)))
    })
}

export { setGlobalState, useGlobalState, updateBalance, updateTotalSupply }