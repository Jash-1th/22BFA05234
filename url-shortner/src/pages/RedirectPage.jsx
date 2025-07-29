import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function RedirectPage() {
  const { shortCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUrls = JSON.parse(localStorage.getItem('shortenedUrls')) || [];
    const urlData = storedUrls.find(url => url.shortCode === shortCode);

    if (!urlData) {
      navigate('/?error=notfound');
      return;
    }

    if (new Date() > new Date(urlData.expiry)) {
      navigate('/?error=expired');
      return;
    }

   
    const updatedUrls = storedUrls.map(url => {
      if (url.shortCode === shortCode) {
        return {
          ...url,
          clicks: url.clicks + 1,
          clickData: [
            ...url.clickData,
            { timestamp: new Date().toISOString(), location: 'Unknown' }
          ]
        };
      }
      return url;
    });

    localStorage.setItem('shortenedUrls', JSON.stringify(updatedUrls));
    window.location.href = urlData.originalUrl;
  }, [shortCode, navigate]);

  return null;
}