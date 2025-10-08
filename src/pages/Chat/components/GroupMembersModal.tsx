import React, { useState, useEffect } from 'react';
import { X, UserPlus, UserMinus, Crown } from 'lucide-react';
import type { Conversation, User } from '../../../types/chat';

interface GroupMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversation: Conversation;
  currentUserId?: number;
  onAddMember: (userId: number) => Promise<void>;
  onRemoveMember: (userId: number) => Promise<void>;
  onSearchUsers: (search: string) => Promise<User[]>;
}

export function GroupMembersModal({
  isOpen,
  onClose,
  conversation,
  currentUserId,
  onAddMember,
  onRemoveMember,
  onSearchUsers,
}: GroupMembersModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Load all users once when modal opens
  useEffect(() => {
    const loadUsers = async () => {
      if (!isOpen) {
        setSearchTerm('');
        setAllUsers([]);
        return;
      }

      console.log('[GroupMembersModal] Modal opened with conversation:', conversation.id);
      console.log('[GroupMembersModal] Participants:', conversation.participants?.map(p => ({ userId: p.userId, leftAt: p.leftAt })));

      setIsSearching(true);
      try {
        const users = await onSearchUsers('');
        setAllUsers(users);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setIsSearching(false);
      }
    };

    loadUsers();
  }, [isOpen, onSearchUsers]);

  // Calculate filtered results based on participants and search term
  const searchResults = React.useMemo(() => {
    if (!isOpen || allUsers.length === 0) return [];

    // First filter out current members
    const allParticipants = conversation.participants || [];
    const activeParticipants = allParticipants.filter(p => !p.leftAt);
    const memberIds = activeParticipants.map(p => p.userId);
    let filtered = allUsers.filter(u => !memberIds.includes(u.id));

    // Then filter by search term
    if (searchTerm.trim().length > 0) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        user.firstName.toLowerCase().includes(lowerSearch) ||
        user.lastName.toLowerCase().includes(lowerSearch) ||
        user.email.toLowerCase().includes(lowerSearch)
      );
    }

    return filtered;
  }, [isOpen, allUsers, conversation.participants, searchTerm]);

  const handleAddMember = async (userId: number) => {
    setIsAdding(true);
    try {
      await onAddMember(userId);
      setSearchTerm('');
    } catch (error) {
      console.error('Error adding member:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveMember = async (userId: number) => {
    if (window.confirm('Tem certeza que deseja remover este membro do grupo?')) {
      try {
        console.log('[GroupMembersModal] Removing member:', userId);
        await onRemoveMember(userId);
        console.log('[GroupMembersModal] Member removed successfully');
      } catch (error) {
        console.error('[GroupMembersModal] Error removing member:', error);
        alert('Erro ao remover membro: ' + (error as any).message);
      }
    }
  };

  const currentUserParticipant = conversation.participants?.find(
    p => p.userId === currentUserId
  );
  const isAdmin = currentUserParticipant?.role === 'ADMIN';

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700'>
          <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>Membros do Grupo</h2>
          <button
            onClick={onClose}
            className='p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-600 dark:text-gray-400'
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className='flex-1 overflow-y-auto p-4'>
          {/* Add member section (only for admins) */}
          {isAdmin && (
            <div className='mb-4'>
              <h3 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Adicionar Membro
              </h3>
              <input
                type='text'
                placeholder='Buscar ou selecionar usuário...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
              />

              {/* Search results */}
              {isSearching ? (
                <div className='mt-2 text-center text-sm text-gray-500 dark:text-gray-400 py-4'>
                  <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 dark:border-blue-400 mx-auto mb-2' />
                  Buscando usuários...
                </div>
              ) : searchResults.length > 0 ? (
                <div className='mt-2 space-y-1 max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg'>
                  {searchResults.map(user => (
                    <div
                      key={user.id}
                      className='flex items-center justify-between p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors cursor-pointer'
                      onClick={() => handleAddMember(user.id)}
                    >
                      <div className='flex items-center gap-2'>
                        <div className='w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-600 text-white flex items-center justify-center text-sm flex-shrink-0'>
                          {user.firstName.charAt(0).toUpperCase()}
                        </div>
                        <div className='min-w-0'>
                          <p className='text-sm font-medium text-gray-900 dark:text-gray-100 truncate'>
                            {user.firstName} {user.lastName}
                          </p>
                          <p className='text-xs text-gray-500 dark:text-gray-400 truncate'>{user.email}</p>
                        </div>
                      </div>
                      <button
                        disabled={isAdding}
                        className='p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full transition-colors disabled:opacity-50 flex-shrink-0'
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddMember(user.id);
                        }}
                      >
                        <UserPlus size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : !isSearching && searchTerm.length > 0 ? (
                <div className='mt-2 text-center text-sm text-gray-500 dark:text-gray-400 py-4'>
                  Nenhum usuário encontrado
                </div>
              ) : null}
            </div>
          )}

          {/* Members list */}
          <div>
            <h3 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Membros ({conversation.participants?.filter(p => !p.leftAt).length || 0})
            </h3>
            <div className='space-y-2'>
              {conversation.participants?.filter(p => !p.leftAt).map(participant => {
                const isCurrentUser = participant.userId === currentUserId;
                const isMemberAdmin = participant.role === 'ADMIN';

                return (
                  <div
                    key={participant.id}
                    className='flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg'
                  >
                    <div className='flex items-center gap-2'>
                      <div className='w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-600 text-white flex items-center justify-center text-sm relative'>
                        {participant.user.firstName.charAt(0).toUpperCase()}
                        {isMemberAdmin && (
                          <div className='absolute -bottom-1 -right-1 bg-yellow-500 dark:bg-yellow-600 rounded-full p-0.5'>
                            <Crown size={10} className='text-white' />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                          {participant.user.firstName} {participant.user.lastName}
                          {isCurrentUser && (
                            <span className='text-xs text-gray-500 dark:text-gray-400 ml-1'>
                              (você)
                            </span>
                          )}
                        </p>
                        {isMemberAdmin && (
                          <p className='text-xs text-yellow-600 dark:text-yellow-500'>Admin</p>
                        )}
                      </div>
                    </div>

                    {/* Remove button (only admins can remove, and can't remove themselves) */}
                    {isAdmin && !isCurrentUser && (
                      <button
                        onClick={() => handleRemoveMember(participant.userId)}
                        className='p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors'
                      >
                        <UserMinus size={18} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
