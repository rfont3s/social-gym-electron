import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../test/utils';
import { Input } from './Input';

describe('Input', () => {
  it('renders input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Input placeholder='Enter text' />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders with correct type', () => {
    const { container } = render(<Input type='password' />);
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('renders with text type by default', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('applies disabled state', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies error styles when error prop is true', () => {
    render(<Input error />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-500', 'focus:ring-red-500');
  });

  it('applies normal styles when error prop is false', () => {
    render(<Input error={false} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-gray-300', 'focus:ring-primary-500');
  });

  it('applies custom className', () => {
    render(<Input className='custom-class' />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('handles onChange event', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('applies disabled opacity when disabled', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toHaveClass(
      'opacity-60',
      'cursor-not-allowed'
    );
  });

  it('passes through additional props', () => {
    render(<Input data-testid='custom-input' maxLength={10} />);
    const input = screen.getByTestId('custom-input');
    expect(input).toHaveAttribute('maxLength', '10');
  });
});
