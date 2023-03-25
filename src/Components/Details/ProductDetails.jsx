import React from 'react'
import { Box, Typography, styled, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { LocalOffer as Badge } from '@mui/icons-material';
const SmallText = styled(Box)`
    font-size: 14px;
    vertical-align: baseline;
    & > p{
        font-size: 14px;
        margin-top: 10px;
    }
`
const StyleBadge = styled(Badge)`
     margin-right: 10px;
     color: #00CC00;
     font-size: 15px;
`
export default function ProductDetails({ product }) {
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'
    const date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000));
    return (
        <>
            <Typography>{product.title.longTitle}</Typography>
            <Typography style={{ marginTop: 5, color: '#787878', fontSize: 14 }}>
                8 Ratings and 1 Reviews
                <Box component='span' >
                    <img src={fassured} alt="" style={{ marginLeft: 20, width: 77 }} />
                </Box>
            </Typography>
            <Typography>
                <Box component='span' style={{ fontSize: 28 }}>₹{product.price.cost}</Box>&nbsp;&nbsp;&nbsp;
                <Box component='span' style={{ color: '#878787' }}><strike>₹{product.price.mrp}</strike></Box>&nbsp;&nbsp;&nbsp;
                <Box component='span' style={{ color: '#388E3C' }}>{product.price.discount}</Box>
            </Typography>
            <Typography>Available Offers</Typography>
            <SmallText>
                <Typography><StyleBadge />Get Extra 20% off upto ₹50 on 1 Item(s) T&C</Typography>
                <Typography><StyleBadge />Get Extra 14% (price inclusive of discount) G&C</Typography>
                <Typography><StyleBadge />Sign up for Flipkart and Get Flipkart Gift Cart worth ₹100 Know More...</Typography>
                <Typography><StyleBadge />Buy 3 Item save 5%;Buy 4 and more save 10% T&C</Typography>
                <Typography><StyleBadge />5% Cashback on Flipkart Axis bank Card T&C</Typography>
                <Typography><StyleBadge />No Cost EMI on Bajaj Primary EMI Card on Cart value above ₹2999 T&C</Typography>
            </SmallText>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell style={{ color: '#878787' }}>Delivery</TableCell>
                        <TableCell style={{ fontWeight: 600 }}>Delivery by {date.toDateString()} ₹40</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ color: '#878787' }}>Warranty</TableCell>
                        <TableCell>No Warranty</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ color: '#878787' }}>Seller</TableCell>
                        <TableCell>
                            <span style={{ color: '#2874f0' }}>SuperComNet</span>
                            <Typography>GST invoice available</Typography>
                            <Typography>View more sellers starting from ₹329</Typography>
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </>
    )
}
