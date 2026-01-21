import React, { useCallback, useMemo } from 'react';

// Hook para memoização de callbacks com dependências
export const useStableCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T => {
  return useCallback(callback, deps);
};

// Hook para memoização de valores computados
export function useComputedValue<T>(
  compute: () => T,
  deps: React.DependencyList
): T {
  return useMemo(compute, deps);
}

// Hook para debounce de valores
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook para gerenciamento de estado otimizado
export function useOptimizedState<T>(
  initialState: T
): [T, (newState: T | ((prev: T) => T)) => void] {
  const [state, setState] = React.useState<T>(initialState);

  const optimizedSetState = useCallback((newState: T | ((prev: T) => T)) => {
    setState(prev => {
      const nextState =
        typeof newState === 'function'
          ? (newState as (prev: T) => T)(prev)
          : newState;

      // Evita re-renders desnecessários
      if (JSON.stringify(prev) === JSON.stringify(nextState)) {
        return prev;
      }

      return nextState;
    });
  }, []);

  return [state, optimizedSetState];
}

export default {
  useStableCallback,
  useComputedValue,
  useDebouncedValue,
  useOptimizedState,
};
