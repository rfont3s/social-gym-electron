import { useState, useEffect, useCallback } from 'react';
import { X, Users, MessageCircle } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

type ConversationType = 'DIRECT' | 'GROUP';

interface NewConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateConversation: (
    userIds: number[],
    groupName?: string,
    type?: ConversationType
  ) => Promise<void>;
  currentUserId?: number;
}

export function NewConversationModal({
  isOpen,
  onClose,
  onCreateConversation,
  currentUserId,
}: NewConversationModalProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationType, setConversationType] =
    useState<ConversationType>('DIRECT');
  const [groupName, setGroupName] = useState('');

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch users from backend
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${apiUrl}/chat/users`);

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const result = await response.json();
      const data = result.data || result; // Handle both TSOA response format and plain array

      // Transform users to match expected format
      const transformedUsers = data.map((user: Record<string, unknown>) => ({
        id: user.id,
        name:
          `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
        email: user.email,
        avatar: user.profilePicture,
      }));

      // Filter out current user
      const filteredUsers = transformedUsers.filter(
        (user: User) => user.id !== currentUserId
      );
      setUsers(filteredUsers);
    } catch (err) {
      setError('Erro ao carregar usuários');
      console.error('Error fetching users:', err);
    } finally {
      setIsLoading(false);
    }
  }, [currentUserId]);

  // Fetch users when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen, fetchUsers]);

  const handleUserToggle = (userId: number) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreateConversation = async () => {
    if (selectedUsers.length === 0) return;

    // Validar nome do grupo se for tipo GROUP
    if (conversationType === 'GROUP' && !groupName.trim()) {
      setError('Por favor, insira um nome para o grupo');
      return;
    }

    // Validar mínimo de participantes para grupo (você + pelo menos 1 pessoa)
    if (conversationType === 'GROUP' && selectedUsers.length < 1) {
      setError('Selecione pelo menos 1 pessoa para criar o grupo');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await onCreateConversation(
        selectedUsers,
        conversationType === 'GROUP' ? groupName.trim() : undefined,
        conversationType
      );
      // Fechar modal após sucesso
      handleClose();
    } catch (err) {
      setError('Erro ao criar conversa');
      console.error('Error creating conversation:', err);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedUsers([]);
    setSearchTerm('');
    setGroupName('');
    setError(null);
    setConversationType('DIRECT');
    onClose();
  };

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700'>
          <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>Nova Conversa</h2>
          <button
            onClick={handleClose}
            className='text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
          >
            <X size={20} />
          </button>
        </div>

        {/* Type Selection */}
        <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
          <div className='grid grid-cols-2 gap-3'>
            <button
              onClick={() => setConversationType('DIRECT')}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                conversationType === 'DIRECT'
                  ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
              }`}
            >
              <MessageCircle size={20} />
              <span className='font-medium'>Conversa Privada</span>
            </button>
            <button
              onClick={() => setConversationType('GROUP')}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                conversationType === 'GROUP'
                  ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Users size={20} />
              <span className='font-medium'>Grupo</span>
            </button>
          </div>
        </div>

        {/* Group Name (only for GROUP type) */}
        {conversationType === 'GROUP' && (
          <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
            <input
              type='text'
              placeholder='Nome do grupo...'
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
            />
          </div>
        )}

        {/* Search */}
        <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
          <input
            type='text'
            placeholder='Buscar usuários...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
          />
          {conversationType === 'DIRECT' && selectedUsers.length > 0 && (
            <p className='text-xs text-gray-500 dark:text-gray-400 mt-2'>
              Para conversa privada, selecione apenas 1 pessoa
            </p>
          )}
          {conversationType === 'GROUP' && (
            <p className='text-xs text-gray-500 dark:text-gray-400 mt-2'>
              Selecione pelo menos 1 pessoa para criar um grupo
            </p>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className='p-4 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800'>
            <p className='text-sm text-red-600 dark:text-red-400'>{error}</p>
          </div>
        )}

        {/* Users List */}
        <div className='max-h-96 overflow-y-auto'>
          {isLoading ? (
            <div className='p-8 text-center'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 dark:border-blue-400 mx-auto' />
              <p className='text-sm text-gray-500 dark:text-gray-400 mt-2'>
                Carregando usuários...
              </p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className='p-8 text-center text-gray-500 dark:text-gray-400'>
              <p>Nenhum usuário encontrado</p>
            </div>
          ) : (
            <div className='divide-y divide-gray-200 dark:divide-gray-700'>
              {filteredUsers.map(user => (
                <div
                  key={user.id}
                  onClick={() => handleUserToggle(user.id)}
                  className='p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors'
                >
                  <div className='flex items-center gap-3'>
                    <input
                      type='checkbox'
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => {}}
                      className='w-4 h-4 text-blue-600 dark:text-blue-400 rounded focus:ring-blue-500 dark:focus:ring-blue-400'
                    />
                    <div className='w-10 h-10 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white font-medium'>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='font-medium text-gray-900 dark:text-gray-100 truncate'>
                        {user.name}
                      </p>
                      <p className='text-sm text-gray-500 dark:text-gray-400 truncate'>
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='p-4 border-t border-gray-200 dark:border-gray-700 flex gap-3'>
          <button
            onClick={handleClose}
            className='flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
          >
            Cancelar
          </button>
          <button
            onClick={handleCreateConversation}
            disabled={
              selectedUsers.length === 0 ||
              isLoading ||
              (conversationType === 'DIRECT' && selectedUsers.length > 1)
            }
            className='flex-1 px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed'
          >
            {isLoading
              ? 'Criando...'
              : conversationType === 'GROUP'
                ? `Criar Grupo (${selectedUsers.length})`
                : `Criar Conversa ${selectedUsers.length > 0 ? '(1)' : ''}`}
          </button>
        </div>
      </div>
    </div>
  );
}
