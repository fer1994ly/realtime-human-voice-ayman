import { test, expect } from '@playwright/test';

test('debug Vercel deployment and API functionality', async ({ page, request }) => {
  // 1. Test the token endpoint
  console.log('Testing token endpoint...');
  const tokenResponse = await request.get('/api/auth/token');
  console.log('Token API Status:', tokenResponse.status());
  const tokenData = await tokenResponse.json();
  console.log('Token API Response:', tokenData);

  // Enable detailed console logging
  page.on('console', msg => {
    console.log(`Browser Console [${msg.type()}]:`, msg.text());
  });

  // Enable network logging
  page.on('response', async response => {
    const url = response.url();
    if (url.includes('/api/')) {
      console.log(`Network Response [${response.status()}]:`, url);
      try {
        const data = await response.json();
        console.log('Response data:', data);
      } catch (e) {
        console.log('Could not parse response as JSON');
      }
    }
  });

  // Navigate to the app
  console.log('Navigating to app...');
  await page.goto('/');
  
  // Wait for initial load
  await page.waitForLoadState('networkidle');
  
  // Take a screenshot
  await page.screenshot({ path: 'debug-vercel.png', fullPage: true });

  // Check for error messages
  const errorElement = await page.$('text="Error:"');
  if (errorElement) {
    const errorText = await errorElement.textContent();
    console.log('Found error:', errorText);
  }

  // Check environment variables (without exposing values)
  const envCheck = {
    hasApiKey: !!process.env.HUME_API_KEY,
    hasSecretKey: !!process.env.HUME_SECRET_KEY,
    hasConfigId: !!process.env.NEXT_PUBLIC_HUME_CONFIG_ID,
  };
  console.log('Environment variables check:', envCheck);

  // Test the start call button
  const startCallButton = await page.$('button:has-text("Start Call")');
  expect(startCallButton).toBeTruthy();
  
  if (startCallButton) {
    console.log('Found Start Call button');
    // Click the button and observe behavior
    await startCallButton.click();
    
    // Wait for potential error messages or connection status
    await page.waitForTimeout(2000);
    
    // Check connection status
    const connectingText = await page.$('text="Connecting..."');
    if (connectingText) {
      console.log('Connection in progress...');
    }
    
    // Check for error messages after click
    const postClickError = await page.$('text="Error:"');
    if (postClickError) {
      const errorText = await postClickError.textContent();
      console.log('Post-click error:', errorText);
    }
  }

  // Take final screenshot
  await page.screenshot({ path: 'debug-vercel-final.png', fullPage: true });
}); 