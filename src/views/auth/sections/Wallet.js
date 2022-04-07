import React, { useEffect, useState } from 'react';
import { Card, CardContent, Box, Typography, Stack, Divider, Grid } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from '../../../components/elements/Image';
import WalletFace from '../../../assets/images/Wallet-Face.png'
import SelectWalletModal from '../elements/SelectWalletModal'
import { getTokenBalance } from '../../../hooks/useContract';
import { getProvider } from '../../../utils/provider';
import { commify, insertDecimalSeparator } from '../../../utils/format';

const cardStyle = {
    boxShadow: 0, 
    borderRadius: 0,
}

const Wallet = () => {
    // handle modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // handle user account
    const [account, setAccount] = useState('0x');
    // handle user balance
    const [balance, setBalance] = useState('0.0000')

    useEffect(() => {
        const { provider, signer, account_ } = getProvider();
        provider.listAccounts().then(accounts => {
            setAccount(accounts[0])
        });
        
        getTokenBalance()
            .then((userBalance) => {
                setBalance(commify(insertDecimalSeparator(userBalance.toString(), 4)));
            })
    }, [])

    // const { onClick } = props
    return (
        <Card sx={cardStyle}>
            { open ? (
                <SelectWalletModal open={handleOpen} onClose={handleClose} />
            ) : null }
            <CardContent>
                <Grid container spacing={2} sx={{mb: -1}}>
                    <Grid item xs={12} sm={7} md={7}>
                        <Stack direction="row" spacing={2}>
                            <Image className="wallet-image" src={WalletFace} style={{marginTop: "10px"}} width="50" />
                            <Box>
                                <Typography variant="p" color="text.secondary" sx={{ fontSize: 12 }}>
                                    WALLET
                                </Typography>
                                <div className='text'>
                                    <h6 className="wallet-address" style={{cursor: "pointer"}} onClick={handleOpen} variant="h6">
                                        {account ? account : "Connect wallet"} <span style={{position: "absolute", marginTop: "0px",marginLeft: "10px"}}><KeyboardArrowDownIcon /></span>
                                    </h6>
                                </div>

                                
                            </Box>
                        </Stack>   
                    </Grid>
                    <Grid item xs={12} sm={5} md={5}>
                        <Divider orientation="vertical" variant="middle" flexItem color="#000" /> 
                        <Typography variant="p" color="text.secondary" sx={{ fontSize: 10 }}>
                            BALANCE
                        </Typography>
                        <Typography className="card-text" variant="h6">
                            {balance} NOK
                        </Typography>
                    </Grid>
                </Grid>            
            </CardContent>
        </Card>
    )
}

export default Wallet