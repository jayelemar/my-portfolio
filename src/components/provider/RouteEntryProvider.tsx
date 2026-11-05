"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type MutableRefObject,
} from "react";

const RouteEntryContext = createContext<MutableRefObject<boolean> | null>(null);

export function RouteEntryProvider({ children }: { children: ReactNode }) {
  const entered = useRef(false);
  return (
    <RouteEntryContext.Provider value={entered}>
      {children}
    </RouteEntryContext.Provider>
  );
}

export function useRouteEntry() {
  return useContext(RouteEntryContext);
}
