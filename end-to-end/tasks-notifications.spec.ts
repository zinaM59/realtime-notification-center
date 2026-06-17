import test, { expect } from '@playwright/test';

test.describe('Tasks and Notifications pages', () => {
    test('tasks page redirects unauthenticated user to login', async ({ page }) => {
        await page.goto('/tasks');
        await page.waitForURL('**/login');
        await expect(page).toHaveURL(/\/login/);
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    });

    test('notifications page redirects unauthenticated user to login', async ({ page }) => {
        await page.goto('/notifications');
        await page.waitForURL('**/login');
        await expect(page).toHaveURL(/\/login/);
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    });
});
