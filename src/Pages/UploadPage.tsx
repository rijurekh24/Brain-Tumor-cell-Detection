import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import ChatIcon from "@mui/icons-material/Chat";
import axios from "axios";
import ChatBot from "./ChatBot";

const UploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const [chatOpen, setChatOpen] = useState(false);
  const [autoPrompt, setAutoPrompt] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResults(null);
      setAutoPrompt(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "https://bt.arnabchatterjee.site/upload-image/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResults(response.data);

      const tumorType = response.data["tumor type"];
      if (tumorType && tumorType !== "No Tumor") {
        setAutoPrompt(true);
      }
    } catch (error) {
      console.error("Error during prediction:", error);
      setResults({ "tumor type": "Error processing image" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
        }}
      >
        <Container maxWidth="md" sx={{ mt: 3, p: 2, textAlign: "center" }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#eee" }}
          >
            Upload Brain Scan
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "#ddd" }}>
            Upload your brain MRI scan for analysis. Our AI-powered system will
            provide a detailed assessment.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="scan-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="scan-upload">
              <Box
                sx={{
                  p: 4,
                  width: "100%",
                  height: 300,
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  bgcolor: "transparent",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.4)",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: "0px 6px 16px rgba(0,0,0,0.5)",
                  },
                }}
              >
                {previewUrl ? (
                  <Card sx={{ borderRadius: 2, maxHeight: 250 }}>
                    <CardMedia
                      component="img"
                      image={previewUrl}
                      alt="Preview"
                      sx={{
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 2,
                      }}
                    />
                  </Card>
                ) : (
                  <>
                    <CloudUpload sx={{ fontSize: 50, mb: 2, color: "#fff" }} />
                    <Typography variant="h6" sx={{ color: "#fff" }}>
                      Click or Drag to Upload MRI Scan
                    </Typography>
                  </>
                )}
              </Box>
            </label>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!selectedFile || isAnalyzing}
              sx={{
                mt: 4,
                py: 1.5,
                fontWeight: "bold",
                width: "60%",
                borderRadius: 3,
                bgcolor: "rgb(87, 28, 35)",
                color: "#fff",
              }}
            >
              {isAnalyzing ? (
                <CircularProgress size={24} sx={{ color: " #fff" }} />
              ) : (
                "Analyze Scan"
              )}
            </Button>
          </Box>

          {results && (
            <Box mt={4} p={3}>
              <Typography variant="h5" gutterBottom sx={{ color: "#00c853" }}>
                Analysis Results
              </Typography>
              <Typography sx={{ color: "#fff" }} fontSize={"2rem"}>
                {results["tumor type"]}
              </Typography>

              <Box
                mt={4}
                p={3}
                borderRadius={2}
                sx={{
                  bgcolor:
                    results["tumor type"] === "No Tumor"
                      ? "#388e3c"
                      : results["tumor type"] === "Glioma"
                      ? "#d32f2f"
                      : results["tumor type"] === "Meningioma"
                      ? "#f57c00"
                      : results["tumor type"] === "Pituitary"
                      ? "#ffa000"
                      : "#616161",
                  textAlign: "left",
                }}
              >
                {results["tumor type"] === "Glioma" && (
                  <>
                    <Typography color="#fff" fontWeight="bold">
                      Description: A tumor originating from glial cells.
                    </Typography>
                    <Typography color="#fff" fontWeight="bold">
                      Urgency: Immediate checkup required.
                    </Typography>
                    <Typography color="#fff" fontWeight="bold">
                      Danger Level: High.
                    </Typography>
                  </>
                )}
                {results["tumor type"] === "Meningioma" && (
                  <>
                    <Typography color="#fff" fontWeight="bold">
                      Description: Usually benign tumor from meninges.
                    </Typography>
                    <Typography color="#fff" fontWeight="bold">
                      Urgency: Moderate.
                    </Typography>
                    <Typography color="#fff" fontWeight="bold">
                      Danger Level: Low to Moderate.
                    </Typography>
                  </>
                )}
                {results["tumor type"] === "Pituitary" && (
                  <>
                    <Typography color="#fff" fontWeight="bold">
                      Description: Affects hormone production.
                    </Typography>
                    <Typography color="#fff" fontWeight="bold">
                      Urgency: Moderate.
                    </Typography>
                    <Typography color="#fff" fontWeight="bold">
                      Danger Level: Low to Moderate.
                    </Typography>
                  </>
                )}
                {results["tumor type"] === "No Tumor" && (
                  <>
                    <Typography color="#fff" fontWeight="bold">
                      Description: No abnormal growth detected.
                    </Typography>
                    <Typography color="#fff" fontWeight="bold">
                      Urgency: None.
                    </Typography>
                    <Typography color="#fff" fontWeight="bold">
                      Danger Level: None.
                    </Typography>
                  </>
                )}
              </Box>

              {autoPrompt && (
                <Box textAlign="center" mt={3}>
                  <Button
                    variant="outlined"
                    onClick={() => setChatOpen(true)}
                    sx={{ color: "#fff", borderColor: "#fff" }}
                  >
                    Want to know more about this tumor?
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Container>
      </Box>

      {/* Example Scans Section */}
      <Box sx={{ width: "100%", textAlign: "center", mb: 10 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#fff", mb: 4, letterSpacing: 3 }}
        >
          Example Brain Scans
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          {[
            {
              image: "https://i.ibb.co/vsvDxrJ/3.jpg",
              label: "Brain Scan Example 1",
            },
            {
              image: "https://i.ibb.co/8DfVn1p/2.jpg",
              label: "Brain Scan Example 2",
            },
            {
              image: "https://i.ibb.co/vsvDxrJ/3.jpg",
              label: "Brain Scan Example 3",
            },
          ].map((scan, i) => (
            <Card
              key={i}
              sx={{
                maxWidth: 300,
                mb: 4,
                border: "2px solid #444",
                transition: "transform 0.3s ease, filter 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 3,
                },
              }}
            >
              <CardMedia component="img" image={scan.image} alt={scan.label} />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {scan.label}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* ChatBot Component */}
      {chatOpen && <ChatBot onClose={() => setChatOpen(false)} />}

      {/* Floating Chat Icon */}
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1500,
        }}
      >
        {!chatOpen && (
          <IconButton
            size="large"
            onClick={() => setChatOpen(true)}
            sx={{
              bgcolor: " #fff",
              color: "rgb(121, 10, 27)",
              "&:hover": { bgcolor: "#eee" },
            }}
          >
            <ChatIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default UploadPage;
