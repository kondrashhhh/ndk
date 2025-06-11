import { createContext, useContext } from 'react';

export const BrowserContext = createContext(null);

export const useBrowserContext = () => useContext(BrowserContext);