import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	const expectedTitle = 'Jadwal Kereta Yogyakarta-Palur Sat-Set';

    // Fetch the text content of the h1 element
    const title = await page.textContent('h1');

    // Assert that the title text content matches the expected title
    await expect(title).toBe(expectedTitle);
});


