import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from '@/app/login/page';
import userEvent from '@testing-library/user-event';
import { signIn } from '@/auth';

vi.mock('@/auth', () => ({ signIn: vi.fn() }));

vi.mock('@/app/components/SocialLoginButtons', () => ({
    default: () => <div>Social sign in</div>,
}));
// vi.mock('next/link', () => ({
//     default: ({ children, href }: { children: React.ReactNode; href: string }) => (
//         <a href={href}>{children}</a>
//     ),
// }));


describe('Login page', () => {
    it('renders login fields and social login placeholder', async () => {
        render(<LoginPage />);

        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
        expect(screen.getByText(/Social sign in/i)).toBeInTheDocument();
        await userEvent.type(
            screen.getByLabelText(/email/i),
            'admin@example.com'
        );
        await userEvent.type(
            screen.getByLabelText(/password/i),
            '123456'
        );
        await userEvent.click(
            screen.getByRole('button', { name: /login/i })
        );
        expect(signIn).toHaveBeenCalled();
    });
});

