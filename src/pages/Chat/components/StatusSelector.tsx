import { useState, useRef, useEffect } from 'react';

export type UserStatus = 'ONLINE' | 'BUSY' | 'AWAY' | 'OFFLINE' | 'INVISIBLE';

interface StatusSelectorProps {
  currentStatus: UserStatus;
  onStatusChange: (status: UserStatus) => void;
}

export function StatusSelector({ currentStatus, onStatusChange }: StatusSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const statuses: { value: UserStatus; label: string; color: string }[] = [
    { value: 'ONLINE', label: 'Online', color: 'bg-green-500' },
    { value: 'BUSY', label: 'Ocupado', color: 'bg-red-500' },
    { value: 'AWAY', label: 'Ausente', color: 'bg-yellow-500' },
    { value: 'INVISIBLE', label: 'Invisível', color: 'bg-gray-400' },
    { value: 'OFFLINE', label: 'Offline', color: 'bg-gray-300' },
  ];

  const currentStatusInfo = statuses.find(s => s.value === currentStatus) || statuses[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className={`w-2.5 h-2.5 rounded-full ${currentStatusInfo.color}`}></div>
        <span className="text-sm text-gray-700 dark:text-gray-300">{currentStatusInfo.label}</span>
        <svg
          className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg py-1 min-w-[140px] z-50">
          {statuses.map((status) => (
            <button
              key={status.value}
              onClick={() => {
                onStatusChange(status.value);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className={`w-2.5 h-2.5 rounded-full ${status.color}`}></div>
              <span className="text-sm text-gray-700 dark:text-gray-200">{status.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
