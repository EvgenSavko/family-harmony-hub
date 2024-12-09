import React, { createContext, useState, ReactNode } from 'react';

interface State {
  menuPosition: 'right' | 'left' | 'top' | 'bottom';
}

interface ContextProps {
  state: State;
  setMenuPosition: (menuPosition: 'right' | 'left' | 'top' | 'bottom') => void;
}

export const CoreContext = createContext<ContextProps | undefined>(undefined);

export const CoreContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<State>({ menuPosition: 'right' });

  const setMenuPosition = (menuPosition: 'right' | 'left' | 'top' | 'bottom') =>
    setState((prevState) => ({ ...prevState, menuPosition }));

  return (
    <CoreContext.Provider value={{ state, setMenuPosition }}>
      {children}
    </CoreContext.Provider>
  );
};
