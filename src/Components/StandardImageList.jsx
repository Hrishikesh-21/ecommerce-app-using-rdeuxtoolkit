

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import AddIcon from '@mui/icons-material/Add';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemData } from '../data';
import { addToCart, getCartTotal } from '../Redux Store/slice';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


export default function StandardImageList() {
    debugger
    const buttonstyle = { maxWidth: "100px", display: "flex", maxHeight: "25px", justifyContent: 'center', marginTop: "8px", backgroundColor: 'darkturquoise',  borderRadius: "4px" };

    const { cart, totalQuantity, totalPrice } = useSelector(
        (state) => state.allCart
    );

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getCartTotal());
    }, [cart]);

    return (
        <>
            <ImageList sx={{ width: 1000, height: 850 }} cols={4}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                        />
                        <div style={{ display: "flex", justifyItems: "center", margin: '10px' }}>
                            <ImageListItemBar position="below" style={{ margin: '10px' }} />
                            <Stack spacing={2} direction="row">
                                <ImageListItemBar position="below" title={item.title} />
                                <button
                                    value={
                                        item.id
                                    }
                                    onClick={() => dispatch(addToCart(item))}
                                    variant="contained" size='small' style={buttonstyle}> Add To Cart </button>
                            </Stack>
                        </div>
                    </ImageListItem>
                ))}
            </ImageList>

        </>
    );
}
