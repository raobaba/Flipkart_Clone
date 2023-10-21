import React from "react";
import { Box, Typography, styled, Button } from "@mui/material";
import addEllipsis from "../../utils/Common-Utils.js";
import { useDispatch } from "react-redux";
import ButtonGroup from "./ButtonGroup.jsx";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../Redux/actions.js";
const Component = styled(Box)`
  border-top: 1px solid #f0f0f0;
  display: flex;
  background-color: #fff;
`;
const LeftComponent = styled(Box)`
  margin: 20px;
  display: flex;
  flex-direction: column;
`;
const SmallText = styled(Typography)`
  color: #878787;
  font-size: 14px;
  margin-top: 10px;
`;
const RemoveButton = styled(Button)`
  margin-top: 20px;
  font-size: 16px;
  color: #000;
  font-weight: 600;
`;
export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const fassured =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";

  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const increaseItemQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const decreaseItemQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <Component>
      <LeftComponent>
        <img src={item.url} alt="product" style={{ height: 110, width: 110 }} />
        <ButtonGroup
          item={item}
          increaseItemQuantity={() => increaseItemQuantity(item.id)}
          decreaseItemQuantity={() => decreaseItemQuantity(item.id)}
        />
      </LeftComponent>
      <Box style={{ margin: 20 }}>
        <Typography>{addEllipsis(item.title.longTitle)}</Typography>
        <SmallText>
          Seller:RetainNet
          <Box component="span">
            <img
              src={fassured}
              alt="fassured"
              style={{ width: 50, marginLeft: 10 }}
            />
          </Box>
        </SmallText>
        <Typography style={{ margin: "20px 0" }}>
          <Box component="span" style={{ fontWeight: 600, fontSize: 18 }}>
            ₹{item.price.cost}
          </Box>
          &nbsp;&nbsp;&nbsp;
          <Box component="span" style={{ color: "#878787" }}>
            <strike>₹{item.price.mrp}</strike>
          </Box>
          &nbsp;&nbsp;&nbsp;
          <Box component="span" style={{ color: "#388E3C" }}>
            {item.price.discount}
          </Box>
        </Typography>
        <RemoveButton onClick={() => removeItemFromCart(item.id)}>
          Remove
        </RemoveButton>
      </Box>
    </Component>
  );
}
