
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Calculator } from '../types';
import { getAllCalculators, setAllCalculators } from '../utils/db';

export function usePersistentStorage(initialValue: Calculator[]): [Calculator[], Dispatch<SetStateAction<Calculator[]>>] {
  const [value, setValue] = useState<Calculator[]>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from DB on mount
  useEffect(() => {
    getAllCalculators()
      .then(calculators => {
        if (calculators && calculators.length > 0) {
            setValue(calculators);
        }
      })
      .catch(error => {
        console.error("Failed to load from IndexedDB:", error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

  // Persist to DB on change, but only after initial load is complete
  useEffect(() => {
    if (isLoaded) {
      setAllCalculators(value)
        .catch(error => {
          console.error("Failed to save to IndexedDB:", error);
        });
    }
  }, [value, isLoaded]);

  return [value, setValue];
}
