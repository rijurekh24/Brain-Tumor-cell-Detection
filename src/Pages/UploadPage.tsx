import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  CircularProgress, 
  Card, 
  CardMedia, 
  CardContent 
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

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
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
    setResults('No tumor detected. Please consult with your healthcare provider for a professional diagnosis.');
  };

  return (
    <Box 
      sx={{
        minHeight: '100vh',
        // background: 'linear-gradient(90deg, #000 0%, #6a11cb 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
      }}
    >
      <Container maxWidth="md" sx={{ background: 'transparent',
            boxShadow: 'inset 0px 10px 40px rgba(0, 0, 0, 0.3)', borderRadius: 3,  p: 4  ,textAlign: 'center',}}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#fff' }}>
          Upload Brain Scan
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4, color: '#fff' }}>
          Upload your brain MRI scan for analysis. Our AI-powered system will provide a detailed assessment.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="scan-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="scan-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUpload />}
              fullWidth
              sx={{
                bgcolor: '#fff',
                color: '#4A1C23',
                fontWeight: 'bold',
                py: 1.5,
                width: '60%',
              }}
            >
              Upload your brain MRI scan
            </Button>
          </label>
          {previewUrl && (
            <Card sx={{ mt: 4, borderRadius: 2 }}>
              <CardMedia
                component="img"
                image={previewUrl}
                alt="Preview"
                sx={{ maxHeight: 400, objectFit: 'contain' }}
              />
              <CardContent>
                <Typography variant="subtitle1" align="center" sx={{ color: 'text.secondary' }}>
                  Preview of your uploaded scan
                </Typography>
              </CardContent>
            </Card>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!selectedFile || isAnalyzing}
            sx={{
              mt: 4,
              bgcolor: 'rgb(44, 6, 89)',
              py: 1.5,
              fontWeight: 'bold',
              width: '60%',
            }}
          >
            {isAnalyzing ? <CircularProgress size={24} /> : 'Analyze Scan'}
          </Button>
        </Box>
        {results && (
          <Box mt={4} p={3} borderRadius={2} sx={{ bgcolor: 'rgba(0, 230, 118, 0.1)', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#00c853' }}>
              Analysis Results
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{results}</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default UploadPage;
