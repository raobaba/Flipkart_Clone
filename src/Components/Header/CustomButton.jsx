import React,{useState} from 'react';
import { ShoppingCart } from '@mui/icons-material';
import { styled, Box, Button, Typography } from "@mui/material";
import LoginDialog from '../Login/LoginDialog.jsx';
const Wrapper = styled(Box)`
     display: flex;
     margin: 0 3% 0 auto;
     &>button,&>p,&>div{
        margin-right: 40px;
        font-size: 16px;
        align-items: center;
     }
`
const LogginButton = styled(Button)`
    color: #2874f0;
    background-color:#FFFFFF;
    text-transform: none;
    font-weight: 600;
    border-radius: 2;
    padding: '5px 40px';
    height: 32px;
    box-shadow: 'none';
`
const Container = styled(Box)`
     display:flex;

`
export default function CustomButton() {
    const [open,setOpen] = useState(false);
    const openDialog = ()=>{
        setOpen(true);
    }
    return (
        <Wrapper>
            
                <LogginButton variant='contained' onClick={()=>openDialog()}>Login</LogginButton>
            
           
            <Typography style={{ marginTop: 3, width: 135 }}>Become a Seller</Typography>
            <Typography style={{ marginTop: 3 }}>More</Typography>
            <Container>
                <ShoppingCart />
                <Typography>Cart</Typography>
            </Container>
            <LoginDialog open={open} setOpen={setOpen} />
        </Wrapper>

    )
}
