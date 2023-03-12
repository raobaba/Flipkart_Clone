import React, { useState } from 'react'
import { Box, Typography, Menu, MenuItem, styled } from '@mui/material';
import { PowerSettingsNew } from '@mui/icons-material';
const Component = styled(Menu)`
    margin-top: 5px;
`;

const Logout = styled(Typography)`
    font-size: 14px;
    margin-left: 20px;
`;
export default function Profile({ account, setAccount }) {
    const [open, setOpen] = useState(false);

    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const logout = () => {
        setAccount('');
    }
    return (
        <>
            <Box>
                <Box onClick={handleClick}><Typography style={{ marginTop: 2,cursor:'pointer' }}>{account}</Typography></Box>
                <Component
                    anchorEl={open}
                    open={Boolean(open)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => { handleClose(); logout(); }}>
                        <PowerSettingsNew fontSize='small' color='primary' />
                        <Logout>Logout</Logout>
                    </MenuItem>
                </Component>
            </Box>
        </>
    )
}
