import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import axios from "axios";

const UploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResults(null);
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
    } catch (error) {
      console.error("Error during prediction:", error);
      setResults("An error occurred while processing the image.");
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
        <Container
          maxWidth="md"
          sx={{
            mt: 3,
            background: "transparent",
            borderRadius: 3,
            p: 2,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#eee" }}
          >
            Upload Brain Scan
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 4, color: "#ddd", fontSize: "16px" }}
          >
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
                  bgcolor: "transparent",
                  color: "#fff",
                  fontWeight: "bold",
                  p: 4,
                  width: "100%",
                  height: 300,
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0px 4px 12px rgba(45, 23, 23, 0.39)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                {previewUrl ? (
                  <Card
                    sx={{ borderRadius: 2, maxWidth: "100%", maxHeight: 250 }}
                  >
                    <CardMedia
                      component="img"
                      image={previewUrl}
                      alt="Preview"
                      sx={{
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 2,
                        border: "2px dotted #000",
                      }}
                    />
                  </Card>
                ) : (
                  <>
                    <CloudUpload sx={{ fontSize: 50, mb: 2 }} />
                    <Typography variant="h6">
                      Click or Drag to Upload MRI Scan
                    </Typography>
                  </>
                )}
              </Box>
            </label>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!selectedFile || isAnalyzing}
              sx={{
                mt: 4,
                bgcolor: "rgb(87, 28, 35)",
                py: 1.5,
                fontWeight: "bold",
                width: "60%",
                borderRadius: 3,
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
            <Box
              mt={4}
              p={3}
              borderRadius={2}
              sx={{ bgcolor: "rgba(0, 230, 118, 0.1)", textAlign: "center" }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: "#00c853" }}>
                Analysis Results
              </Typography>
              <Typography sx={{ color: "#fff" }} fontSize={"2rem"}>
                {results["tumor type"]}
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
      <Box sx={{ width: "100%", textAlign: "center" }}>
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
          <Card
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
            <CardMedia
              component="img"
              image="https://i.ibb.co/vsvDxrJ/3.jpg"
              alt="Demo Scan 1"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Brain Scan Example 1
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              maxWidth: 315,
              mb: 4,
              border: "2px solid #555",
              transition: "transform 0.3s ease, filter 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 3,
              },
            }}
          >
            <CardMedia
              component="img"
              image="https://i.ibb.co/8DfVn1p/2.jpg"
              alt="Demo Scan 2"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Brain Scan Example 2
              </Typography>
            </CardContent>
          </Card>

          {/* Demo Image 3 */}
          <Card
            sx={{
              maxWidth: 300,
              mb: 4,
              border: "2px solid #666",
              transition: "transform 0.3s ease, filter 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 3,
              },
            }}
          >
            <CardMedia
              component="img"
              image="https://i.ibb.co/vsvDxrJ/3.jpg"
              alt="Demo Scan 3"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Brain Scan Example 3
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default UploadPage;
