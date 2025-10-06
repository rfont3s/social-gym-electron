import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../test/utils';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: 'Click me' })
    ).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies disabled attribute when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders with primary variant by default', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary-500');
  });

  it('renders with secondary variant when specified', () => {
    render(<Button variant='secondary'>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gray-100');
  });

  it('renders with outline variant when specified', () => {
    render(<Button variant='outline'>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'bg-transparent',
      'text-primary-500',
      'border-primary-500'
    );
  });

  it('renders with ghost variant when specified', () => {
    render(<Button variant='ghost'>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-transparent', 'text-gray-700');
  });

  it('applies custom className', () => {
    render(<Button className='custom-class'>Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('sets button type correctly', () => {
    render(<Button type='submit'>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('has button type by default', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('applies opacity when disabled', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'opacity-60',
      'cursor-not-allowed'
    );
  });
});
