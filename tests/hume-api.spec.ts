import { test, expect } from '@playwright/test';

test('debug Hume API integration', async ({ request }) => {
  // 1. Test token generation
  console.log('Testing Hume token generation...');
  const tokenResponse = await request.get('/api/auth/token');
  console.log('Token API Status:', tokenResponse.status());
  const tokenData = await tokenResponse.json();
  
  // Log API key presence (not the actual value)
  console.log('API Key present:', !!process.env.HUME_API_KEY);
  console.log('Secret Key present:', !!process.env.HUME_SECRET_KEY);
  console.log('Config ID present:', !!process.env.NEXT_PUBLIC_HUME_CONFIG_ID);
  
  // Test direct Hume API access
  const humeResponse = await request.post('https://api.hume.ai/v0/auth/token', {
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      api_key: process.env.HUME_API_KEY,
      secret_key: process.env.HUME_SECRET_KEY
    }
  });
  
  console.log('Direct Hume API Status:', humeResponse.status());
  const humeData = await humeResponse.json();
  console.log('Direct Hume API Response:', humeData);
  
  // Verify token structure
  expect(tokenResponse.ok()).toBeTruthy();
  if (tokenData.error) {
    console.error('Token generation error:', tokenData.error);
    console.error('Token generation error details:', tokenData.details);
  }
  
  // Test voice config
  if (process.env.NEXT_PUBLIC_HUME_CONFIG_ID) {
    const configResponse = await request.get(`https://api.hume.ai/v0/voice/configs/${process.env.NEXT_PUBLIC_HUME_CONFIG_ID}`, {
      headers: {
        'Authorization': `Bearer ${tokenData.accessToken}`
      }
    });
    console.log('Config API Status:', configResponse.status());
    const configData = await configResponse.json();
    console.log('Config API Response:', configData);
  }
}); 