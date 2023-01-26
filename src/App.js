import "./App.css";
import { Header } from "./components/header";
import Footer from "./components/Footer/Footer";
import { RoutesComponent } from "./Routes";
import { styled, Box } from "@mui/material";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCart, fetchHomePageProducts, useUserInfo } from "./redux";
import { Sidebar } from "./components/sidebar/Sidebar";


const StyledContentContainer = styled(Box)(() => ({
  padding: "20px",
  marginLeft: "255px",
  marginTop: "70px",
  minHeight: "100vh",
}));
function App() {
  const userInfo = useUserInfo();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHomePageProducts());
    if (userInfo) {
      dispatch(fetchCart(userInfo._id));
    }
  }, []);
  return (
    <Box>
      <Sidebar />
      <Header />
      <StyledContentContainer className="contnrs">
        <RoutesComponent />
        <div className="h-screen"></div>
        <Footer />
      </StyledContentContainer>
      
    </Box>
    

  );
}

export default App;
