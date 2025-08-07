import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@components/Input';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Digite aqui...',
    value: '',
    onChange: (value: string) => console.log('Input value:', value),
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'seu@email.com',
    value: '',
    onChange: (value: string) => console.log('Email value:', value),
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '••••••••',
    value: '',
    onChange: (value: string) => console.log('Password value:', value),
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Input desabilitado',
    value: 'Valor fixo',
    disabled: true,
    onChange: (value: string) => console.log('Disabled input:', value),
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <div className="w-64">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Nome completo
        </label>
        <Input
          type="text"
          value={value}
          onChange={setValue}
          placeholder="Digite seu nome"
        />
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    return (
      <div className="w-80 space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Exemplo de Formulário</h3>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Email
          </label>
          <Input
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="seu@email.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Senha
          </label>
          <Input
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
          />
        </div>
        
        <button 
          className="w-full bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600 transition-colors"
          onClick={() => console.log('Form submitted:', { email, password })}
        >
          Entrar
        </button>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => {
    const [values, setValues] = useState({
      normal: '',
      disabled: 'Valor desabilitado',
      email: '',
      password: '',
    });
    
    return (
      <div className="w-80 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Input Normal</label>
          <Input
            value={values.normal}
            onChange={(value) => setValues(prev => ({ ...prev, normal: value }))}
            placeholder="Digite algo..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Input Desabilitado</label>
          <Input
            value={values.disabled}
            onChange={() => {}}
            disabled
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Input Email</label>
          <Input
            type="email"
            value={values.email}
            onChange={(value) => setValues(prev => ({ ...prev, email: value }))}
            placeholder="email@exemplo.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Input Password</label>
          <Input
            type="password"
            value={values.password}
            onChange={(value) => setValues(prev => ({ ...prev, password: value }))}
            placeholder="••••••••"
          />
        </div>
      </div>
    );
  },
};
