import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Countdown from "react-countdown";
import { Box, Typography, Button, Divider, styled } from '@mui/material';
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};
const Component = styled(Box)`
    margin-top: 10px;
    background: #ffffff;
`
const Deal = styled(Box)`
    padding: 15px 20px;
    display: flex;
`
const Timer = styled(Box)`
    color: #7f7f7f;
    margin-left: 10px;
    display: flex;
    align-items: center;
`
const ViewAllButton = styled(Button)`
    margin-left: auto;
    background-color: #2874f0;
    border-radius: 2px;
    font-size: 13px;
`
const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 5px
`
const DealText = styled(Typography)`
    font-size: 22px;
    font-weight: 600;
    line-height: 32px;
    margin-right: 25px;
`
const Image = styled('img')({
    width: 'auto',
    height: 150
})
export default function Slide({ products,title,timer }) {
    const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';
    const render = ({ hours, minutes, seconds }) => {
        return <Box variant="span">{hours}:{minutes}:{seconds}Left </Box>
    }
    return (
        <Component>
            <Deal>
                <DealText>{title}</DealText>
                {
                    timer && <Timer>
                    <img src={timerURL} style={{ width: 24 }} alt='time clock' />
                    <Countdown date={Date.now() + 5.04e+7} render={render} />
                </Timer>
                }
                <ViewAllButton variant='contained'>
                    View All
                </ViewAllButton>
            </Deal>
            <Divider />
            <Carousel swipeable={false}
                draggable={false}
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                centerMode={true}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {
                    products.map(ele =>
                        <Box textAlign={'center'} style={{ padding: '25px 15px' }}>
                            <Image src={ele.url} alt="products" />
                            <Text style={{ fontWeight: 600, color: '#212121' }}>{ele.title.shortTitle}</Text>
                            <Text style={{ color: 'green' }}>{ele.discount}</Text>
                            <Text style={{ color: '#212121', opacity: '.6' }}>{ele.tagline}</Text>
                        </Box>
                    )
                }
            </Carousel>
        </Component>
    )
}
