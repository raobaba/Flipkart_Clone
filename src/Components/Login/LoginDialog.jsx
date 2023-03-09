import React, { useState } from 'react'
import { Dialog, DialogContent, Box, TextField, Typography, Button, styled } from "@mui/material";
import { authenticateSignup } from '../../Services/api.js';
const Component = styled(DialogContent)`
    height: 70vh;
    width: 90vh;
    padding: 0;
    padding-top: 0;
`;
const Image = styled(Box)`
    background: #2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
    width: 40%;
    height: 80.5%;
    padding: 45px 35px;
    & > p, & > h5 {
        color: #FFFFFF;
        font-weight: 600
    }
`;
const Wrapper = styled(Box)`
    padding: 1px 35px;
    display: flex;
    flex: 1;
    overflow: hidden;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 15px;
    }
`;
const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;
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
`;
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
const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
};
export default function LoginDialog({ open, setOpen }) {
    const [account, toggleAccount] = useState(accountInialValue.login);
    const [signup, setSignup] = useState(signupInitialValues);
    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInialValue.login);
    }
    const toggleSignup = () => {
        toggleAccount(accountInialValue.signup);
    }
    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }
    const signupUser = async () => {
        let response = await authenticateSignup(signup);
        if (!response) return;
        handleClose();
    }
    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }}>
            <Component>
                <Box style={{ display: "flex", height: "100%" }}>
                    <Image>
                        <Typography variant="h5">{account.heading}</Typography>
                        <Typography style={{ marginTop: 20 }}>{account.subHeading}</Typography>
                    </Image>
                    {
                        account.view === "login" ?
                            <Wrapper>
                                <TextField variant='standard' label="Enter Email/Mobile number" />
                                <TextField variant='standard' label="Enter Password" />
                                <Text>By continuing,you agree to Flipkart's Terms of use and Privacy Policy</Text>
                                <LoginButton>Login</LoginButton>
                                <Text style={{ textAlign: 'center' }}>OR</Text>
                                <RequestOTP>Request OTP</RequestOTP>
                                <CreateAccount onClick={() => toggleSignup()}>New to Flipkart? Create an account</CreateAccount>
                            </Wrapper> :
                            <Wrapper>
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='firstname' label='Enter Firstname' />
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='lastname' label='Enter Lastname' />
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='email' label='Enter Email' />
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='phone' label='Enter Phone' />
                                <LoginButton onClick={() => signupUser()} >Continue</LoginButton>
                            </Wrapper>
                    }
                </Box>
            </Component>
        </Dialog>
    )
}
