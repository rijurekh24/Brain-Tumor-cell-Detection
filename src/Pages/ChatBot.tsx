import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  CircularProgress,
  Paper,
  Divider,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import axios from "axios";

const ChatBot = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://deploynewchatbot.onrender.com/ask",
        {
          query: input,
        }
      );

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: res.data.response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Something went wrong. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        bottom: 80,
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
        {messages.length === 0 && !loading && (
          <Typography variant="body2" color="textSecondary" align="center">
            Start a conversation with the bot!
          </Typography>
        )}

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

            <Box
              sx={{
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: msg.from === "user" ? "#d1e7dd" : "#e3f2fd",
                maxWidth: "75%",
              }}
            >
              <Typography variant="body2">{msg.text}</Typography>
            </Box>

            {msg.from === "user" && (
              <Avatar sx={{ bgcolor: "#a5d6a7", ml: 1, width: 30, height: 30 }}>
                <PersonIcon fontSize="small" />
              </Avatar>
            )}
          </Box>
        ))}

        {/* Typing animation */}
        {loading && (
          <Box display="flex" alignItems="center" mb={1}>
            <Avatar sx={{ bgcolor: "#90caf9", mr: 1, width: 30, height: 30 }}>
              <SmartToyIcon fontSize="small" />
            </Avatar>
            <Box
              sx={{
                background: "#e3f2fd",
                px: 2,
                py: 1,
                borderRadius: 2,
                display: "inline-flex",
              }}
            >
              <Box className="typing">
                <span></span>
                <span></span>
                <span></span>
              </Box>
            </Box>
          </Box>
        )}

        <div ref={bottomRef} />
      </Box>

      {/* Input Area */}
      <Divider />
      <Box
        sx={{
          width: "100%",
          bgcolor: "#f5f5f5",
          // px: 1,
          // py: 1.5,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          InputProps={{
            sx: {
              borderRadius: 0,
              outline: "none",
              bgcolor: "rgb(66, 36, 41)",
              color: "#fff",
              pr: 2,
              pl: 1,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:focus .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            },
            endAdornment: (
              <IconButton
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                edge="end"
                sx={{
                  color: "#fff",
                  "&:hover": { color: "rgb(100, 8, 22)" },
                }}
              >
                <SendIcon />
              </IconButton>
            ),
          }}
        />
      </Box>

      {/* Typing animation CSS */}
      <style>
        {`
          .typing {
            display: flex;
            gap: 4px;
          }
          .typing span {
            width: 6px;
            height: 6px;
            background-color: #555;
            border-radius: 50%;
            animation: blink 1.2s infinite ease-in-out both;
          }
          .typing span:nth-of-type(2) {
            animation-delay: 0.2s;
          }
          .typing span:nth-of-type(3) {
            animation-delay: 0.4s;
          }
          @keyframes blink {
            0%, 80%, 100% {
              opacity: 0;
            }
            40% {
              opacity: 1;
            }
          }
        `}
      </style>
    </Paper>
  );
};

export default ChatBot;
