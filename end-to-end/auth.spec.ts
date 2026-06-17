import test, { expect } from '@playwright/test';

test.describe('Auth Pages', () => {
    test('login page renders correctly', async ({ page }) => {
        await page.goto('/login');

        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
        await expect(page.locator('text=Sign in with email or a social provider.')).toBeVisible();

        const emailInput = page.locator('input[name="email"]');
        await expect(emailInput).toBeVisible();
        await expect(emailInput).toHaveAttribute('type', 'email');
        await expect(emailInput).toHaveAttribute('required', '');

        const passwordInput = page.locator('input[name="password"]');
        await expect(passwordInput).toBeVisible();
        await expect(passwordInput).toHaveAttribute('type', 'password');
        await expect(passwordInput).toHaveAttribute('required', '');
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
        const link_locator = page.getByText("Don't have an account?").first();
        await expect(link_locator.getByRole('link', { name: 'Register' })).toHaveAttribute('href', '/register');

    });

    test('register page renders correctly', async ({ page }) => {
        await page.goto('/register');

        await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();

        await expect(page.locator('input[name="name"]')).toHaveAttribute('type', 'text');
        await expect(page.locator('input[name="name"]')).toHaveAttribute('required', '');

        await expect(page.locator('input[name="email"]')).toHaveAttribute('type', 'email');
        await expect(page.locator('input[name="email"]')).toHaveAttribute('required', '');

        await expect(page.locator('input[name="password"]')).toHaveAttribute('type', 'password');
        await expect(page.locator('input[name="password"]')).toHaveAttribute('required', '');
        await expect(page.getByRole('button', { name: 'Create account' })).toBeVisible();
        const link_locator = page.getByText('Already have an account?').first();
        await expect(link_locator.getByRole('link', { name: 'Login' })).toHaveAttribute('href', '/login');

    });

    test('login page has navigation to register page', async ({ page }) => {
        await page.goto('/login');
        const registerLink = page.getByRole('link', { name: 'Register' }).first();
        await expect(registerLink).toBeVisible();
        await registerLink.click();
        await page.waitForURL('**/register');
        await expect(page).toHaveURL(/\/register/);
    });

    test('register page has navigation to login page', async ({ page }) => {
        await page.goto('/register');
        const loginLink = page.getByRole('link', { name: 'Login' }).first();
        await expect(loginLink).toBeVisible();
        await loginLink.click();
        await page.waitForURL('**/login');
        await expect(page).toHaveURL(/\/login/);
    });
    test.skip("dashboard accessible when logged in", async ({ page }) => {
        await page.goto("/login");

        await page.fill('[name=email]', 'admin@example.com');
        await page.fill('[name=password]', '123456');

        await Promise.all([
            page.waitForURL('**/dashboard'),
            page.click('button[type=submit]'),
        ]);
        page.on('console', msg => {
            console.log(msg.text());
        });
        await expect(page).toHaveURL(/\/dashboard/);

    });
    test('dashboard redirects to login when unauthenticated', async ({ page }) => {
        await page.goto('/dashboard');
        await expect(page).toHaveURL(/\/login$/);
    });

});
