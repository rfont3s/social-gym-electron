import React from 'react';
import { DashboardView } from './view';

export interface DashboardStats {
  activeMembers: number;
  monthlyRevenue: string;
  todayCheckins: number;
}

export interface DashboardData {
  stats: DashboardStats;
}

// Controller como React Component
export const Dashboard: React.FC = () => {
  // Simulando dados da API - em uma aplicação real, esses dados viriam do backend
  const stats: DashboardStats = {
    activeMembers: 1234,
    monthlyRevenue: 'R$ 45,670',
    todayCheckins: 89,
  };

  const data: DashboardData = {
    stats,
  };

  // Usando createElement para criar a view e passar as props
  return React.createElement(DashboardView, { data } as React.ComponentProps<
    typeof DashboardView
  >);
};

// Funções utilitárias do controller
export const DashboardController = {
  // Método para buscar estatísticas do backend (futuro)
  async fetchStats(): Promise<DashboardStats> {
    // Aqui você faria uma chamada para a API
    // const response = await api.get('/dashboard/stats');
    // return response.data;

    return {
      activeMembers: 1234,
      monthlyRevenue: 'R$ 45,670',
      todayCheckins: 89,
    };
  },

  // Método para atualizar dados em tempo real (futuro)
  async refreshDashboard(): Promise<void> {
    // Implementar lógica de refresh dos dados
    console.log('Refreshing dashboard data...');
  },
};
