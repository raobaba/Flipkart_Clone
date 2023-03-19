import React from 'react'
import { AppBar, Toolbar, Typography, Box, styled } from "@mui/material";
import Search from './Search';
import CustomButton from './CustomButton';
import { Link } from "react-router-dom";
const StyledHeader = styled(AppBar)`
    background:#2874f2;
    height: 55px;
`
const Component = styled(Link)`
    margin-left: 12%;
    line-height: 0%;
    text-decoration: none;
    color: inherit;
`
const SubHeading = styled(Typography)`
    font-size: 10px;
    font-style: italic;
`
const PlusImage = styled('img')({
    width: 10,
    height: 10,
    marginLeft: 4
})
const CustomButtonWrapper = styled(Box)`
     margin: 0 5% 0 auto;
`
export default function Header() {
    const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
    const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';
    return (
        <StyledHeader>
            <Toolbar style={{ minHeight: 55 }}>
                <Component to='/'>
                    <img src={logoURL} alt="flipLogo" style={{ width: 75 }} />
                    <Box style={{ display: 'flex' }}>
                        <SubHeading>Explore&nbsp;
                            <Box component="span" style={{ color: '#b7450c' }}>
                                Plus
                            </Box>
                        </SubHeading>
                        <PlusImage src={subURL} />
                    </Box>
                </Component>
                <Search />
                <CustomButtonWrapper>
                    <CustomButton />
                </CustomButtonWrapper>
            </Toolbar>
        </StyledHeader>
    )
}
