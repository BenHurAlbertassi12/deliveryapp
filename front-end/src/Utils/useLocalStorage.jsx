import { useMemo, useState } from 'react';

function useLocalStorage(local) {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(local);
    return JSON.parse(data);
  });

  const setData = useMemo(
    () => (data) => {
      localStorage.setItem(local, JSON.stringify(data));
      setValue(data);
    },
    [local],
  );

  return [value, setData];
}

export default useLocalStorage;
