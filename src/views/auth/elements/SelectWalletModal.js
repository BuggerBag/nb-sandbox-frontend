import React, { useState } from 'react'
import { Box, Typography, Modal, CardActions, Backdrop, Card, CardContent } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import WalletFace from '../../../assets/images/Wallet-Face.png'
import Button from '../../../components/elements/Button'

import PerfectScrollbar from 'react-perfect-scrollbar'

import WalletDetails from '../sections/WalletDetails'
import NewWallet from './NewWallet'

// TODO: Read address and cipher data (keystore file) from local storage.
const data = []

export default function SelectWalletModal(props) {
    const [selectWallet, showSelectWallet] = useState(true)
    const [, showImportWallet] = useState(false)
    const { onClose, open } = props

    const handleNewWallet = () => {
        showSelectWallet(false)
    }


    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Box className='modal-box'>
                    {
                        selectWallet ? (
                            <Card>
                                <Box sx={{ mt: 2, p: 2, borderBottom: "1px solid #CBE5EE"}}>
                                    <Typography id='modal-modal-title' variant='p' sx={{ pl: 2 }}>
                                        WALLETS <span style={{ float: 'right', cursor: "pointer" }}><HighlightOffIcon onClick={onClose} /></span>
                                    </Typography>
                                </Box>
                                
                                <CardContent sx={{}}>
<<<<<<< HEAD
                                        <PerfectScrollbar style={{ height: 300 }}>
=======
                                    {/* <Box> */}
                                        <Scrollbar style={{ height: 3 }}>
>>>>>>> 42e4675a6ac087403df58228776f0367f8eb0608
                                            {data.map((d, index) => (
                                                <WalletDetails key={index} address={d.address} image={d.image} />
                                            ))}
                                        </PerfectScrollbar>
                                </CardContent>
                                <CardActions sx={{p: 2}}>
                                    <Button sx={{ width: '100%' }} onClick={handleNewWallet} className='button button-primary button-wide-mobile' wide>CONNECT NEW WALLET</Button>
                                </CardActions>
                            </Card>
                        ) : (
                            <NewWallet onClose={onClose} open={open} />
                        )
                    }
                    
                    {/* {selectWallet ? handleSelectWalletModal() : <CreateWalletModal />} */}
                </Box>
            </Modal>
        </div>
    )
}
