import React, { useState } from "react";
import { AppBar, Badge, Box, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import SearchBar from "./SerchBar";
import { UserIcon } from "./UserIcon";
import { FcShop } from "react-icons/fc"
import { useCartItems } from "../../redux";
import { CartDrawer } from "./CartDrawer";
import { FcHome } from "react-icons/fc";


const StyledToolBar = styled(Toolbar)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));
const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    width: "20px",
    height: "21px",
    color: "#fff",
    backgroundColor: "red",
    top: "2px",
    right: "-3px",
  },
}));
const StyledHomeLink = styled(Link)(() => ({
  textDecoration: "none",
  color: "black",
  fontSize: "20px",
  fontSize: "30px",
  display: "flex",
}));

export const Header = () => {
  const cartItem = useCartItems();
  const cartItemsQuantity = cartItem.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <Box>
      <AppBar className="styleappbar">
        <StyledToolBar>
          <StyledHomeLink to="/">
            <FcHome color="blue" />
            HOME
          </StyledHomeLink>

          <StyledHomeLink to="/" style={{ display: "flex", }}>
            PRODUCT
          </StyledHomeLink>

          <StyledHomeLink to="/">
            PRICE
          </StyledHomeLink>

          <SearchBar />
          <Box style={{ display: "flex" }}>
            <Button onClick={() => setIsCartOpen(true)}>
              <StyledBadge badgeContent={cartItemsQuantity}>
                <FcShop size={35} />
              </StyledBadge>
            </Button>
            <UserIcon />
          </Box>
          <StyledHomeLink to="/" style={{ display: "flex", }}>
            CONTACT
          </StyledHomeLink>

          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => {
              setIsCartOpen(false);
            }}
          />
        </StyledToolBar>
        
      </AppBar>
    </Box>
  );
};