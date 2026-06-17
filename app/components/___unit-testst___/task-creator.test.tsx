import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskCreator from '../tasks/TaskCreator';

const users = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
    },
    {
        id: '2',
        name: 'Jane Doe',
        email: 'jane@example.com',
    },
];

describe('TaskCreator', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders add task button initially', () => {
        render(<TaskCreator users={users} />);

        expect(
            screen.getByRole('button', {
                name: /\+ add task/i,
            })
        ).toBeInTheDocument();
    });

    it('opens the form when clicking add task', async () => {
        render(<TaskCreator users={users} />);

        await userEvent.click(
            screen.getByRole('button', {
                name: /\+ add task/i,
            })
        );

        expect(
            screen.getByPlaceholderText(/task title/i)
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText(/task description/i)
        ).toBeInTheDocument();

        expect(
            screen.getByRole('button', {
                name: /save task/i,
            })
        ).toBeInTheDocument();
    });

    it('updates form fields', async () => {
        render(<TaskCreator users={users} />);

        await userEvent.click(
            screen.getByRole('button', {
                name: /\+ add task/i,
            })
        );

        const titleInput = screen.getByPlaceholderText(/task title/i);
        const descriptionInput = screen.getByPlaceholderText(
            /task description/i
        );

        await userEvent.type(titleInput, 'New Task');
        await userEvent.type(descriptionInput, 'Task description');

        expect(titleInput).toHaveValue('New Task');
        expect(descriptionInput).toHaveValue('Task description');
    });

    it('creates task successfully', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
        }) as any;

        render(<TaskCreator users={users} />);

        await userEvent.click(
            screen.getByRole('button', {
                name: /\+ add task/i,
            })
        );

        await userEvent.type(
            screen.getByPlaceholderText(/task title/i),
            'Fix bug'
        );

        await userEvent.type(
            screen.getByPlaceholderText(/task description/i),
            'Fix login issue'
        );

        await userEvent.selectOptions(
            screen.getByRole('combobox'),
            '2'
        );

        const dateInput = screen.getByDisplayValue('');

        await userEvent.type(dateInput, '2026-05-25');

        await userEvent.click(
            screen.getByRole('button', {
                name: /save task/i,
            })
        );

        expect(global.fetch).toHaveBeenCalledWith(
            '/api/tasks',
            expect.objectContaining({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        );

        expect(
            screen.getByText(/task created/i)
        ).toBeInTheDocument();
    });

    it('shows error message when request fails', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
        }) as any;

        render(<TaskCreator users={users} />);

        await userEvent.click(
            screen.getByRole('button', {
                name: /\+ add task/i,
            })
        );

        await userEvent.click(
            screen.getByRole('button', {
                name: /save task/i,
            })
        );

        expect(
            screen.getByText(/could not create task/i)
        ).toBeInTheDocument();
    });

    it('closes form when cancel button clicked', async () => {
        render(<TaskCreator users={users} />);

        await userEvent.click(
            screen.getByRole('button', {
                name: /\+ add task/i,
            })
        );

        await userEvent.click(
            screen.getByRole('button', {
                name: /cancel/i,
            })
        );

        expect(
            screen.queryByPlaceholderText(/task title/i)
        ).not.toBeInTheDocument();
    });
});