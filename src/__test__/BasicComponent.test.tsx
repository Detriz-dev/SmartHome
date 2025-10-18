import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import { BasicComponent } from '../components/BasicComponent';

describe('BasicComponent', () => {
    const defaultProps = {
        titleprops: 'Test Counter'
    };

    beforeEach(() => {
        render(<BasicComponent {...defaultProps} />);
    });

    describe('Initial Rendering', () => {
        test('renders with title prop', () => {
            const title = screen.getByText('Test Counter');
            expect(title).toBeInTheDocument();
            expect(title.tagName).toBe('H3');
        });

        test('renders initial counter value of 1', () => {
            const counterValue = screen.getByText('1');
            expect(counterValue).toBeInTheDocument();
        });

        test('renders all buttons with correct text', () => {
            const addButton = screen.getByRole('button', { name: /add/i });
            const removeButton = screen.getByRole('button', { name: /remove/i });
            const restartButton = screen.getByRole('button', { name: /restart/i });

            expect(addButton).toBeInTheDocument();
            expect(removeButton).toBeInTheDocument();
            expect(restartButton).toBeInTheDocument();
        });
    });

    describe('Counter Increment', () => {
        test('increments counter when ADD button is clicked', () => {
            const addButton = screen.getByRole('button', { name: /add/i });

            fireEvent.click(addButton);
            expect(screen.getByText('2')).toBeInTheDocument();
            expect(screen.queryByText('1')).not.toBeInTheDocument();

            fireEvent.click(addButton);
            expect(screen.getByText('3')).toBeInTheDocument();
        });

        test('can increment multiple times', () => {
            const addButton = screen.getByRole('button', { name: /add/i });

            for (let i = 0; i < 5; i++) {
                fireEvent.click(addButton);
            }

            expect(screen.getByText('6')).toBeInTheDocument();
        });
    });

    describe('Counter Decrement', () => {
        test('decrements counter when REMOVE button is clicked', () => {
            const removeButton = screen.getByRole('button', { name: /remove/i });

            fireEvent.click(removeButton);
            expect(screen.getByText('0')).toBeInTheDocument();
            expect(screen.queryByText('1')).not.toBeInTheDocument();
        });

        test('does not decrement below 0', () => {
            const removeButton = screen.getByRole('button', { name: /remove/i });

            fireEvent.click(removeButton);
            expect(screen.getByText('0')).toBeInTheDocument();

            fireEvent.click(removeButton);
            fireEvent.click(removeButton);
            fireEvent.click(removeButton);
            expect(screen.getByText('0')).toBeInTheDocument();
        });

        test('decrements from higher values correctly', () => {
            const addButton = screen.getByRole('button', { name: /add/i });
            const removeButton = screen.getByRole('button', { name: /remove/i });

            for (let i = 0; i < 4; i++) {
                fireEvent.click(addButton);
            }
            expect(screen.getByText('5')).toBeInTheDocument();

            fireEvent.click(removeButton);
            expect(screen.getByText('4')).toBeInTheDocument();

            fireEvent.click(removeButton);
            expect(screen.getByText('3')).toBeInTheDocument();
        });
    });

    describe('Counter Reset', () => {
        test('resets counter to 0 when RESTART button is clicked', () => {
            const addButton = screen.getByRole('button', { name: /add/i });
            const restartButton = screen.getByRole('button', { name: /restart/i });

            fireEvent.click(addButton);
            fireEvent.click(addButton);
            expect(screen.getByText('3')).toBeInTheDocument();

            fireEvent.click(restartButton);
            expect(screen.getByText('0')).toBeInTheDocument();
        });

        test('reset works from any value', () => {
            const addButton = screen.getByRole('button', { name: /add/i });
            const restartButton = screen.getByRole('button', { name: /restart/i });

            for (let i = 0; i < 10; i++) {
                fireEvent.click(addButton);
            }
            expect(screen.getByText('11')).toBeInTheDocument();

            fireEvent.click(restartButton);
            expect(screen.getByText('0')).toBeInTheDocument();
        });

        test('reset works when counter is already 0', () => {
            const removeButton = screen.getByRole('button', { name: /remove/i });
            const restartButton = screen.getByRole('button', { name: /restart/i });

            fireEvent.click(removeButton);
            expect(screen.getByText('0')).toBeInTheDocument();

            fireEvent.click(restartButton);
            expect(screen.getByText('0')).toBeInTheDocument();
        });
    });

    describe('Integration Tests', () => {
        test('handles multiple operations correctly', () => {
            const addButton = screen.getByRole('button', { name: /add/i });
            const removeButton = screen.getByRole('button', { name: /remove/i });
            const restartButton = screen.getByRole('button', { name: /restart/i });

            fireEvent.click(addButton);    // 1 -> 2
            fireEvent.click(addButton);    // 2 -> 3
            fireEvent.click(removeButton); // 3 -> 2
            fireEvent.click(addButton);    // 2 -> 3
            fireEvent.click(restartButton);// 3 -> 0
            fireEvent.click(addButton);    // 0 -> 1

            expect(screen.getByText('1')).toBeInTheDocument();
        });

        test('buttons remain functional after multiple uses', () => {
            const addButton = screen.getByRole('button', { name: /add/i });
            const removeButton = screen.getByRole('button', { name: /remove/i });
            const restartButton = screen.getByRole('button', { name: /restart/i });

            for (let i = 0; i < 20; i++) {
                fireEvent.click(addButton);
            }
            expect(screen.getByText('21')).toBeInTheDocument();

            fireEvent.click(restartButton);
            expect(screen.getByText('0')).toBeInTheDocument();

            fireEvent.click(addButton);
            expect(screen.getByText('1')).toBeInTheDocument();

            fireEvent.click(removeButton);
            expect(screen.getByText('0')).toBeInTheDocument();
        });
    });

    describe('Props Variations', () => {
        afterEach(() => {
            cleanup(); // Clean up after each test in this describe block
        });

        test('renders with different title props', () => {
            cleanup(); // Clean up the default render from beforeEach
            const { rerender } = render(<BasicComponent titleprops="Custom Title" />);
            expect(screen.getByText('Custom Title')).toBeInTheDocument();

            rerender(<BasicComponent titleprops="Another Title" />);
            expect(screen.getByText('Another Title')).toBeInTheDocument();
        });

        test('renders with empty title', () => {
            cleanup(); // Clean up the default render from beforeEach
            const { container } = render(<BasicComponent titleprops="" />);
            const heading = container.querySelector('h3');
            expect(heading).toBeInTheDocument();
            expect(heading).toHaveTextContent('');
        });

        test('renders with special characters in title', () => {
            cleanup(); // Clean up the default render from beforeEach
            render(<BasicComponent titleprops="Test & Counter <> 123" />);
            expect(screen.getByText('Test & Counter <> 123')).toBeInTheDocument();
        });
    });

    describe('Accessibility', () => {
        test('all buttons are keyboard accessible', () => {
            const buttons = screen.getAllByRole('button');

            buttons.forEach(button => {
                expect(button).toBeEnabled();
                expect(button).toBeVisible();
            });
        });

        test('counter value is readable', () => {
            const counterDisplay = screen.getByText('1');
            expect(counterDisplay).toBeVisible();
        });
    });
});