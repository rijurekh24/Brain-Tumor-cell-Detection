import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import { Logout } from "@mui/icons-material";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/auth");
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "transparent",
        boxShadow: 0,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
            }}
          >
            Brain Vision{" "}
            <span
              style={{
                color: "rgb(141, 45, 59)",
                borderRadius: "50%",
                fontSize: "40px",
              }}
            >
              .
            </span>
          </Typography>

          <Box>
            <Button
              color="inherit"
              component={RouterLink}
              to="/"
              sx={{
                color: "white",
                fontWeight: "bold",
                textTransform: "capitalize",
                fontSize: "16px",
                mx: 1,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/upload"
              sx={{
                color: "white",
                fontWeight: "bold",
                textTransform: "capitalize",
                fontSize: "16px",
                mx: 1,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              Upload Scan
            </Button>
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<Logout />}
              sx={{
                color: "white",
                fontWeight: "bold",
                textTransform: "capitalize",
                fontSize: "16px",
                mx: 1,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
