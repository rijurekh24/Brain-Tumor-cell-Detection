import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  Divider,
  Avatar,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const ChatBot = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<
    "init" | "askCity" | "done" | "noResponse"
  >("init");
  const [city, setCity] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Initial bot message
    setMessages([
      { from: "bot", text: "Want nearby locations of Neurosurgeons?" },
    ]);
  }, []);

  const handleYes = () => {
    setMessages((prev) => [...prev, { from: "user", text: "Yes" }]);
    setMessages((prev) => [
      ...prev,
      { from: "bot", text: "Please enter your city." },
    ]);
    setStage("askCity");
  };

  const handleNo = () => {
    setMessages((prev) => [
      ...prev,
      { from: "user", text: "No" },
      { from: "bot", text: "Okay, let me know if you change your mind." },
    ]);
    setStage("noResponse");
  };

  const handleCitySubmit = () => {
    if (!city.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: city }]);
    const link = `https://www.practo.com/search/doctors?results_type=doctor&q=%5B%7B%22word%22%3A%22neurosurgeon%22%2C%22autocompleted%22%3Atrue%2C%22category%22%3A%22subspeciality%22%7D%5D&city=${encodeURIComponent(
      city
    )}`;
    setMessages((prev) => [
      ...prev,
      {
        from: "bot",
        text: `Here is a link to nearby neurosurgeons: `,
      },
      {
        from: "bot",
        text: `<a href="${link}" target="_blank" rel="noopener noreferrer">Go to see nearby Neurosurgeons </a>`,
      },
    ]);
    setStage("done");
  };

  const restartChat = () => {
    setCity("");
    setStage("init");
    setMessages([{ from: "bot", text: "Want nearby locations?" }]);
  };

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 360,
        height: 480,
        zIndex: 1500,
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "rgb(66, 36, 41)",
          color: "#fff",
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Ask Me Anything
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Chat Area */}
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          bgcolor: "#fafafa",
          overflowY: "auto",
        }}
      >
        {messages.map((msg, i) => (
          <Box
            key={i}
            display="flex"
            justifyContent={msg.from === "user" ? "flex-end" : "flex-start"}
            mb={1}
            alignItems="flex-end"
          >
            {msg.from === "bot" && (
              <Avatar sx={{ bgcolor: "#90caf9", mr: 1, width: 30, height: 30 }}>
                <SmartToyIcon fontSize="small" />
              </Avatar>
            )}
            {msg.text.includes("<a") ? (
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: msg.from === "user" ? "#d1e7dd" : "#e3f2fd",
                  maxWidth: "75%",
                  wordBreak: "break-word",
                }}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ) : (
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: msg.from === "user" ? "#d1e7dd" : "#e3f2fd",
                  maxWidth: "75%",
                  wordBreak: "break-word",
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
              </Box>
            )}

            {msg.from === "user" && (
              <Avatar sx={{ bgcolor: "#a5d6a7", ml: 1, width: 30, height: 30 }}>
                <PersonIcon fontSize="small" />
              </Avatar>
            )}
          </Box>
        ))}

        {/* Buttons */}
        {stage === "init" && (
          <Box display="flex" justifyContent="center" gap={2} mt={1}>
            <Button onClick={handleYes} variant="contained" size="small">
              Yes
            </Button>
            <Button onClick={handleNo} variant="outlined" size="small">
              No
            </Button>
          </Box>
        )}

        {stage === "askCity" && (
          <Box display="flex" gap={1} mt={1} px={1}>
            <TextField
              variant="outlined"
              placeholder="Enter your city (e.g., Kolkata, Delhi)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              InputProps={{
                sx: {
                  borderRadius: "25px",
                  bgcolor: "#fff",
                  p: 0,
                  boxShadow: 1,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(66, 36, 41)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(100, 8, 22)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(100, 8, 22)",
                    borderWidth: 2,
                  },
                },
              }}
            />

            <Button onClick={handleCitySubmit} variant="contained">
              Submit
            </Button>
          </Box>
        )}

        {stage === "noResponse" && (
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              onClick={restartChat}
              variant="contained"
              color="primary"
              size="small"
            >
              Start Chat Again
            </Button>
          </Box>
        )}

        <div ref={bottomRef} />
      </Box>

      <Divider />
    </Paper>
  );
};

export default ChatBot;
