import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/utils';
import { Card } from './Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies default variant classes', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('shadow-sm');
    expect(card).not.toHaveClass('shadow-lg');
  });

  it('applies elevated variant classes', () => {
    const { container } = render(<Card variant='elevated'>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('shadow-lg');
    expect(card).not.toHaveClass('shadow-sm');
  });

  it('applies base classes correctly', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass(
      'bg-white',
      'dark:bg-gray-800',
      'border',
      'border-gray-200',
      'dark:border-gray-700',
      'rounded-xl',
      'p-6'
    );
  });

  it('applies custom className', () => {
    const { container } = render(<Card className='custom-class'>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('custom-class');
  });

  it('renders as a div element', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.tagName).toBe('DIV');
  });
});
