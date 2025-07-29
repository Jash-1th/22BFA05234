import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Stack, 
  InputAdornment,
  Tooltip
} from '@mui/material';
import { Link as LinkIcon, Schedule as ScheduleIcon } from '@mui/icons-material';
import { isValidUrl } from '../utils/validation';

export default function UrlForm({ onShorten, disabled }) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [shortcode, setShortcode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidUrl(originalUrl)) return;
    
    onShorten({
      originalUrl,
      validity: validity ? parseInt(validity) : null,
      shortcode: shortcode || null
    });
    
    setOriginalUrl('');
    setValidity('');
    setShortcode('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={2} alignItems="flex-end">
        <TextField
          label="Long URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
          fullWidth
          disabled={disabled}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LinkIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <Tooltip title="Leave blank for random">
          <TextField
            label="Custom code"
            value={shortcode}
            onChange={(e) => setShortcode(e.target.value)}
            disabled={disabled}
            sx={{ width: 180 }}
          />
        </Tooltip>

        <Tooltip title="Default: 30 minutes">
          <TextField
            label="Valid for (mins)"
            type="number"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            disabled={disabled}
            sx={{ width: 150 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ScheduleIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Tooltip>

        <Button 
          variant="contained" 
          type="submit"
          disabled={disabled}
          sx={{ height: 56, px: 3 }}
        >
          Shorten
        </Button>
      </Stack>
    </form>
  );
}