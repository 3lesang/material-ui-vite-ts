import { createContext, ReactNode, useContext, useState } from "react";

interface AppTableValue {
  selected: string[];
  setName: (value: string[]) => void;
}

interface TableProviderProps {
  children: ReactNode;
}

const AppTableContext = createContext<AppTableValue | undefined>(undefined);

export function AppTableProvider({ children }: TableProviderProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const setName = (value: string[]) => {
    setSelected(value);
  };

  const value: AppTableValue = {
    selected,
    setName,
  };

  return (
    <AppTableContext.Provider value={value}>
      {children}
    </AppTableContext.Provider>
  );
}

export function useTable(): AppTableValue {
  const context = useContext(AppTableContext);
  if (context === undefined) {
    throw new Error("useTable must be used within an AppTableProvider");
  }
  return context;
}
