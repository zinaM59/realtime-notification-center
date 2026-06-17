import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SocialLoginButtons from '../SocialLoginButtons';
import { signIn } from 'next-auth/react';

vi.mock('next-auth/react', () => ({
    signIn: vi.fn(),
}));

describe('Google login', () => {
    it('calls google sign in', async () => {
        render(<SocialLoginButtons />);

        await userEvent.click(
            screen.getByRole('button', {
                name: /google/i,
            })
        );

        expect(signIn).toHaveBeenCalledWith(
            'google',
            expect.objectContaining({
                callbackUrl: '/dashboard',
            })
        );
    });
    it('calls github provider', async () => {
        render(<SocialLoginButtons />);

        await userEvent.click(
            screen.getByRole('button', {
                name: /github/i,

            })
        );

        expect(signIn).toHaveBeenCalledWith('github',
            expect.objectContaining({
                callbackUrl: '/dashboard',
            }));
    });
});