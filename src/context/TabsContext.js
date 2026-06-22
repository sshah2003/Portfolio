import { createContext, useContext } from 'react';

export const TabsContext = createContext(() => {});
export const useGoTo = () => useContext(TabsContext);
