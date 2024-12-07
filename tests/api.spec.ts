import { test, expect } from '@playwright/test';

test('test token generation API directly', async ({ request }) => {
  const response = await request.get('https://realtime-human-voice-ayman-1x9pd5jaq-fer1994lys-projects.vercel.app/api/auth/token');
  
  console.log('API Response Status:', response.status());
  const responseBody = await response.json();
  console.log('API Response Body:', responseBody);

  // Test response structure
  expect(response.ok()).toBeTruthy();
  expect(responseBody).toHaveProperty('accessToken');
}); 