import React, { useState } from "react";
import { Avatar, IconButton, Menu, MenuItem, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { logoutUser, useUserInfo } from "../../redux";
import { getUserInitials, isUserAdmin } from "../../application";
import { useDispatch } from "react-redux";
export const UserIcon = () => {
  const [anchor, setAnchor] = useState(null);
  const handleClose = () => {
    setAnchor(null);
  };
  const userInfo = useUserInfo();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box>
      <IconButton
        onClick={(e) => {
          setAnchor(e.currentTarget);
        }}
      >
        <Avatar sx={{ width: 56, height: 56 }}>
          {getUserInitials(userInfo?.firstName, userInfo?.lastName)}
        </Avatar >
      </IconButton>
      <Box>
        <Menu
          anchorEl={anchor}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transFormorigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchor)}
          onClose={handleClose} > {!!userInfo && (
            <MenuItem>
              <Button onClick={() => dispatch(logoutUser())}>logout</Button>
              <Button>profile</Button>
            </MenuItem>
          )}
          {isUserAdmin(userInfo) && (
            <MenuItem>
              <Button onClick={() => { navigate("/products/new"); }} > {" "}
                add product
              </Button>
              <Button onClick={() => { navigate("/products/new"); }} > {" "}
                Account
              </Button>
              <Button onClick={() => { navigate("/products/new"); }} > {" "}
                Dashboard
              </Button>
            </MenuItem>       
          )}
          {!userInfo && (
            <MenuItem>
              <Button onClick={() => { navigate("/login"); }}>
                Login
              </Button>
              <Button
                onClick={() => { navigate("/register");}}>
                register
              </Button>
            </MenuItem>
          )}
        </Menu>
      </Box>
    </Box>
  );
};