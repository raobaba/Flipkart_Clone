import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import ProductDetails from './ProductDetails.jsx';
import { getProductDetails } from '../../Redux/actions.js';
import { Box, styled, Grid } from "@mui/material";
import ActionItem from './ActionItem';
const Component = styled(Box)`
    background: #f2f2f2;
    margin-top: 55px;
`
const Container = styled(Grid)`
     background: #ffffff;
     display: flex;
`
const RightContainer = styled(Grid)`
    margin-top: 50px;
`
export default function DetailsView() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { loading, product } = useSelector(state => state.getProductDetails)
    useEffect(() => {
        if (product && id !== product.id)
            dispatch(getProductDetails(id));
    }, [dispatch, id, loading, product])
    console.log(product);
    return (
        <Component>
            {
                product && Object.keys(product).length &&
                <Container container>
                    <Grid item lg={4} md={4} sm={8} xs={12}>
                        <ActionItem product={product} />
                    </Grid>
                    <RightContainer item lg={8} md={8} sm={8} xs={12}>
                        <ProductDetails product={product} />
                    </RightContainer>
                </Container>
            }
        </Component>
    )
}
