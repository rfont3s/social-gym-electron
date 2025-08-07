import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: { onClick: () => console.log('Button clicked!') },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button Primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button Secondary',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button Outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Button Ghost',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Button Disabled',
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12L5 7h10l-5 5z" />
        </svg>
        Button com Ícone
      </>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="flex gap-4">
        <Button variant="primary" disabled>
          Primary Disabled
        </Button>
        <Button variant="secondary" disabled>
          Secondary Disabled
        </Button>
        <Button variant="outline" disabled>
          Outline Disabled
        </Button>
        <Button variant="ghost" disabled>
          Ghost Disabled
        </Button>
      </div>
    </div>
  ),
};
