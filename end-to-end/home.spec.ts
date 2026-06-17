import test, { expect } from "@playwright/test";
const baseURL = process.env.BASE_URL || "http://localhost:3000";

test.describe('Home Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display correct page title and heading', async ({ page }) => {
        // Check page title
        await expect(page).toHaveTitle(/Real-time Notification Center/);

        // Check main heading
        await expect(page.getByRole('heading', { name: 'Smart Task & Notification Platform' })).toBeVisible();
    });

    test('should display hero section content', async ({ page }) => {
        // Check badge text
        await expect(page.locator('text=SSR • PWA • Real-time Notifications')).toBeVisible();

        // Check subtitle
        await expect(page.locator('text=Manage tasks, receive real-time updates, and keep working even offline.')).toBeVisible();
    });

    test('should display login and register buttons for unauthenticated users', async ({ page }) => {
        // Check login button in main content (not header)
        const main = page.locator('main');
        const loginButton = main.getByRole('link', { name: /^Login$/ }).first();
        await expect(loginButton).toBeVisible();
        await expect(loginButton).toHaveAttribute('href', '/login');

        // Check register button in main content
        const registerButton = main.getByRole('link', { name: /^Register$/ });
        await expect(registerButton).toBeVisible();
        await expect(registerButton).toHaveAttribute('href', /register/);
    });

    test('should navigate to login page when clicking login button', async ({ page }) => {
        const main = page.locator('main');
        const loginButton = main.getByRole('link', { name: /^Login$/ }).first();
        await loginButton.click();

        // Wait for navigation and check URL
        await page.waitForURL('**/login');
        await expect(page).toHaveURL(/\/login/);
    });

    test('should navigate to register page when clicking register button', async ({ page }) => {
        const main = page.locator('main');
        const registerButton = main.getByRole('link', { name: /^Register$/ });
        await registerButton.click();

        // Wait for navigation and check URL
        await page.waitForURL('**/register');
        await expect(page).toHaveURL(/\/register/);
    });

    test('should display three feature cards', async ({ page }) => {
        // Check for feature cards
        const cards = page.locator('[class*="rounded-2xl"][class*="border-slate-800"][class*="bg-slate-900"]');
        await expect(cards).toHaveCount(3);
    });

    test('should display Real-time notifications feature card', async ({ page }) => {
        // Check for the notifications card using h2 heading role
        const notificationCard = page.getByRole('heading', { name: 'Real-time notifications' });
        await expect(notificationCard).toBeVisible();

        // Check card description
        const description = page.locator('text=Get live in-app updates and push notifications when important events happen.').first();
        await expect(description).toBeVisible();

        // Check emoji
        const emoji = page.locator('text=🔔').first();
        await expect(emoji).toBeVisible();
    });

    test('should display Offline support (PWA) feature card', async ({ page }) => {
        // Check for the offline support card using h2 heading role
        const offlineCard = page.getByRole('heading', { name: 'Offline support (PWA)' });
        await expect(offlineCard).toBeVisible();

        // Check card description
        const description = page.locator('text=Install the app and continue using core functionality even with limited connectivity.').first();
        await expect(description).toBeVisible();

        // Check emoji
        const emoji = page.locator('text=📱').first();
        await expect(emoji).toBeVisible();
    });

    test('should display Task management feature card', async ({ page }) => {
        // Check for the task management card using h2 heading role
        const taskCard = page.getByRole('heading', { name: 'Task management' });
        await expect(taskCard).toBeVisible();

        // Check card description
        const description = page.locator('text=Organize tasks, track status, and keep your workflow clear and simple.').first();
        await expect(description).toBeVisible();

        // Check emoji
        const emoji = page.locator('text=✅').first();
        await expect(emoji).toBeVisible();
    });

    test('should have correct background color and styling', async ({ page }) => {
        // Check main section has dark background
        const mainSection = page.locator('main');
        await expect(mainSection).toHaveClass(/bg-slate-950/);
    });

    test('should be responsive on mobile viewport', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });

        // Elements should still be visible
        await expect(page.getByRole('heading', { name: 'Smart Task & Notification Platform' })).toBeVisible();

        const main = page.locator('main');
        await expect(main.getByRole('link', { name: /^Login$/ }).first()).toBeVisible();
        await expect(main.getByRole('link', { name: /^Register$/ })).toBeVisible();

        // Feature cards should stack vertically
        const cards = page.locator('[class*="rounded-2xl"][class*="border-slate-800"][class*="bg-slate-900"]');
        await expect(cards).toHaveCount(3);
        await expect(cards.first()).toBeVisible();
    });

    test('should be responsive on tablet viewport', async ({ page }) => {
        // Set tablet viewport
        await page.setViewportSize({ width: 768, height: 1024 });

        // Elements should still be visible
        await expect(page.getByRole('heading', { name: 'Smart Task & Notification Platform' })).toBeVisible();

        // Feature cards should be in 2-column grid on tablet
        const cards = page.locator('[class*="rounded-2xl"][class*="border-slate-800"][class*="bg-slate-900"]');
        await expect(cards).toHaveCount(3);
    });

    test('should be responsive on desktop viewport', async ({ page }) => {
        // Set desktop viewport
        await page.setViewportSize({ width: 1920, height: 1080 });

        // Elements should all be visible
        await expect(page.getByRole('heading', { name: 'Smart Task & Notification Platform' })).toBeVisible();

        // Feature cards should be in 3-column grid on desktop
        const cards = page.locator('[class*="rounded-2xl"][class*="border-slate-800"][class*="bg-slate-900"]');
        await expect(cards).toHaveCount(3);
    });

    test('should have accessible heading structure', async ({ page }) => {
        // Check heading hierarchy
        const h1 = page.locator('h1');
        await expect(h1).toBeVisible();

        // Check feature card headings (h2)
        const h2Elements = page.locator('h2');
        await expect(h2Elements).toHaveCount(3);
    });
});
