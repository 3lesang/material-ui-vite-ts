import { createContext, ReactNode, useContext, useState } from "react";

interface AppMediaValue {
  selected: string[];
  selectedAll: boolean;
  pushName: (name: string) => void;
  removeName: (name: string) => void;
  clearName: () => void;
  setAll: (value: boolean) => void;
  setNameAll: (value: string[]) => void;
}

interface MediaProviderProps {
  children: ReactNode;
}

const AppMediaContext = createContext<AppMediaValue | undefined>(undefined);

export function AppMediaProvider({ children }: MediaProviderProps) {
  const [selectedAll, setSelectedAll] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const pushName = (value: string) => {
    setSelected([...selected, value]);
  };

  const removeName = (value: string) => {
    setSelected(selected.filter((n) => n !== value));
  };

  const clearName = () => {
    setSelected([]);
  };

  const setAll = (value: boolean) => {
    setSelectedAll(value);
  };

  const setNameAll = (value: string[]) => {
    setSelected(value);
  };

  const value: AppMediaValue = {
    selected,
    selectedAll,
    setNameAll,
    setAll,
    pushName,
    removeName,
    clearName,
  };

  return (
    <AppMediaContext.Provider value={value}>
      {children}
    </AppMediaContext.Provider>
  );
}

export function useMedia(): AppMediaValue {
  const context = useContext(AppMediaContext);
  if (context === undefined) {
    throw new Error("useMedia must be used within an AppMediaProvider");
  }
  return context;
}
