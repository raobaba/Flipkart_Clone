import React, { useState } from 'react'
import { Dialog, Box, TextField, Typography, Button, styled } from "@mui/material";
const Component = styled(Box)`
    height: 70vh;
    width: 90vh;
`
const Image = styled(Box)`
    background: #2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
    width: 30%;
    height: 83%;
    padding: 45px 35px;
    & > p, & > h5 {
        color: #FFFFFF;
        font-weight: 600
    }
`
const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 25px 25px;
    flex: 1;
    &>div,& button,& p{
       margin-top: 20px;
    }

`
const LoginButton = styled(Button)`
    text-transform: none;
    background-color: #FB641B;
    color: #fff;
    height: 60px;
    border-radius: 2px; 
`
const RequestOTP = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const CreateAccount = styled(Typography)`
    margin: auto 0 5px 0;
    text-align: center;
    color: #2874f0;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer
`
const accountInialValue = {
    login: {
        view: 'login',
        heading: 'Login',
        subHeading: 'Get access to your Orders, Wishlist and Recommendations'
    },
    signup: {
        view: 'signup',
        heading: "Looks like you're new here",
        subHeading: 'Signup to get started'
    }
}
export default function LoginDialog({ open, setOpen }) {
    const [account, toggleAccount] = useState(accountInialValue.login);
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }}>
            <Component>
                <Box style={{ display: "flex", height: "100%" }}>
                    <Image>
                        <Typography variant="h5">{account.heading}</Typography>
                        <Typography style={{marginTop: 20}}>{account.subHeading}</Typography>
                    </Image>
                    {
                        account.view === "loing" ?
                            <Wrapper>
                                <TextField variant='standard' label="Enter Email/Mobile number" />
                                <TextField variant='standard' label="Enter Password" />
                                <Text>By continuing,you agree to Flipkart's Terms of use and Privacy Policy</Text>
                                <LoginButton>Login</LoginButton>
                                <Text style={{textAlign:'center'}}>OR</Text>
                                <RequestOTP>Request OTP</RequestOTP>
                                <CreateAccount>New to Flipkart? Create an account</CreateAccount>
                            </Wrapper> :
                            <Wrapper>
                                <TextField variant="standard" label='Enter Firstname' />
                                <TextField variant="standard" label='Enter Lastname' />
                                <TextField variant="standard" label='Enter Username' />
                                <TextField variant="standard" label='Enter Email' />
                                <TextField variant="standard" label='Enter Password' />
                                <TextField variant="standard" label='Enter Phone' />
                                <LoginButton>Continue</LoginButton>
                            </Wrapper>
                    }
                </Box>
            </Component>
        </Dialog>
    )
}
