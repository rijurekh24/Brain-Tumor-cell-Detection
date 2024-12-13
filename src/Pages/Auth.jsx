import React, { useState } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import SignUp from "./SignUp";
import Signin from "./Signin";
import doctor from "../doctor.png";
const Auth = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Box
        sx={{
          flex: 1,
          background:
            "linear-gradient(to bottom right, rgb(106, 199, 241),rgba(25, 60, 173, 0.72))",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontFamily: "cursive",
            letterSpacing: "px",
          }}
        >
          Brain Tumor Detector
        </Typography>
        <Box
          component="img"
          src={doctor}
          sx={{
            width: "60%",
            borderRadius: "16px",
          }}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          backgroundColor: "#f4f4f4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "#eee",
            borderRadius: "25px",
            boxShadow: 3,
            paddingTop: 1,
            // p: 4,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              marginBottom: 3,
              "& .MuiTabs-indicator": {
                backgroundColor: "#FE5F78",
                color: "#192252",
              },
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: "bold",
                color: " #528CD2",
              },
            }}
          >
            <Tab label="Sign Up" />
            <Tab label="Sign In" />
          </Tabs>

          {tabValue === 0 ? (
            <SignUp switchToSignIn={() => setTabValue(1)} />
          ) : (
            <Signin switchToSignUp={() => setTabValue(0)} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;
