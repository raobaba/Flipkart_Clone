import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../Redux/actions.js';
import { Box } from "@mui/material";
export default function DetailsView() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { loading, product } = useSelector(state => state.getProductDetails)
    useEffect(() => {
        if(product && id !==product.id)
        dispatch(getProductDetails(id));
    }, [dispatch, id, loading, product])
    return (
        <Box>
       
        </Box>
    )
}
