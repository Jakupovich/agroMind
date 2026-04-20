import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web.
 * This prevents a mismatch between server-rendered HTML and client-side React hydration.
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const colorScheme = useRNColorScheme();

  // Once hydrated, return the actual system scheme (dark or light)
  if (hasHydrated) {
    return colorScheme;
  }

  // Default to 'light' during the server-render/initial-hydration phase
  return 'light';
}
