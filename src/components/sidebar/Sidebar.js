import {
  Drawer,
  List,
  Box,
  styled,
  ListItem,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { UseCategories } from "../../redux";
import { SidebarHeader } from "./SidebarHeader";

const StyledListItem = styled(ListItem)(() => ({
  padding: "5px 0px 3px 15px",
  margin: "0px",
  fontSize: "40px",
  color: "black",
  fontWeight: "800",
}));
const StyledListItemText = styled(ListItemText)(() => ({
  borderBottom: "2px solid blue",
}));

export const Sidebar = () => {
  const sideBarItems = UseCategories();

  return (
    <Drawer
      variant="permanent"
      // sx={{
      //     display:{xs:"block"},
      //     "& .MuiDrawer-paper":{
      //         width:"255px",
      //         height:"100%"
      //     }
      // }}
      open={true}
    >
      <SidebarHeader />

      <List>
        {sideBarItems.map((sidebarItem) => {
          console.log("sidebarItem", sidebarItem);
          const { _id, name } = sidebarItem;
          console.log("name", name);
          return (
            <React.Fragment key={_id}>
              <Link to={`/products/categories/${name}?page=1&sort=name,asc`}>
                <Box sx={{ width: "flex" }}>
                  <StyledListItem>
                    <StyledListItemText primary={name}></StyledListItemText>
                  </StyledListItem>
                </Box>
              </Link>
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};
