import { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Grid, 
  Alert,
  Box,
  Chip
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';
import { v4 as uuidv4 } from 'uuid';

export default function ShortenerPage() {
  const [urls, setUrls] = useState([]);
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    const savedUrls = JSON.parse(localStorage.getItem('shortenedUrls')) || [];
    setUrls(savedUrls);
  }, []);

  const handleShorten = (urlData) => {
    const shortCode = urlData.shortcode || uuidv4().substring(0, 8);
    const expiryMinutes = urlData.validity || 30; // Default 30 minutes
    
    const newUrl = {
      ...urlData,
      shortCode,
      shortUrl: `${window.location.origin}/${shortCode}`,
      createdAt: new Date().toISOString(),
      expiry: new Date(Date.now() + expiryMinutes * 60000).toISOString(),
      clicks: 0,
      clickData: []
    };
    
    const updatedUrls = [...urls, newUrl];
    setUrls(updatedUrls);
    localStorage.setItem('shortenedUrls', JSON.stringify(updatedUrls));
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 500 }}>
        URL Shortener
      </Typography>

      {error === 'expired' && (
        <Alert severity="error" sx={{ mb: 3 }}>
          That link has expired and is no longer available
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Create New Short Link</Typography>
        <Grid container spacing={3}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Grid item xs={12} key={index}>
              <UrlForm 
                onShorten={handleShorten} 
                disabled={urls.length >= 5} 
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {urls.length > 0 && (
        <Paper elevation={2} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ mr: 2 }}>Your Links</Typography>
            <Chip label={`${urls.length}/5 created`} color="primary" size="small" />
          </Box>
          <UrlList urls={urls} />
        </Paper>
      )}
    </Box>
  );
}