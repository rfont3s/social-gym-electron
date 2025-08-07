import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@components/Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Card Padrão</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Este é um exemplo de card padrão com conteúdo básico.
        </p>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Card Elevado</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Este é um exemplo de card elevado com sombra mais pronunciada.
        </p>
      </div>
    ),
  },
};

export const WithForm: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">Formulário de Login</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input 
              type="password" 
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
              placeholder="••••••••"
            />
          </div>
          <button className="w-full bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600">
            Entrar
          </button>
        </div>
      </div>
    ),
  },
};

export const StatCard: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Membros Ativos
            </p>
            <p className="text-3xl font-bold mt-1">1,234</p>
          </div>
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-6">
      <Card variant="default">
        <div className="p-4">
          <h3 className="font-semibold">Card Padrão</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Sem elevação
          </p>
        </div>
      </Card>
      <Card variant="elevated">
        <div className="p-4">
          <h3 className="font-semibold">Card Elevado</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Com sombra
          </p>
        </div>
      </Card>
    </div>
  ),
};
