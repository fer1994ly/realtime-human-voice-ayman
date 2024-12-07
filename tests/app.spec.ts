import { test, expect } from '@playwright/test';

test('debug token generation and app functionality', async ({ page }) => {
  // Enable request interception
  await page.route('**/api/auth/token', async route => {
    const response = await route.fetch();
    const json = await response.json();
    console.log('Token API Response:', json);
    route.continue();
  });

  // Enable console logging
  page.on('console', msg => {
    console.log(`Browser Console [${msg.type()}]:`, msg.text());
  });

  // Navigate to the app
  console.log('Navigating to app...');
  await page.goto('https://realtime-human-voice-ayman-1x9pd5jaq-fer1994lys-projects.vercel.app');
  
  // Wait for initial load
  await page.waitForLoadState('networkidle');
  
  // Check for error messages
  const errorElement = await page.$('text="Error:"');
  if (errorElement) {
    const errorText = await errorElement.textContent();
    console.log('Found error:', errorText);
  }

  // Check network requests
  const tokenRequest = await page.waitForResponse(response => 
    response.url().includes('/api/auth/token')
  );
  const tokenData = await tokenRequest.json();
  console.log('Token request response:', tokenData);

  // Take a screenshot
  await page.screenshot({ path: 'debug-screenshot.png', fullPage: true });

  // Basic assertions
  expect(page.url()).toBe('https://realtime-human-voice-ayman-1x9pd5jaq-fer1994lys-projects.vercel.app/');
  
  // Check if critical UI elements are present
  const chatComponent = await page.$('.grow.flex.flex-col');
  expect(chatComponent).toBeTruthy();
}); 