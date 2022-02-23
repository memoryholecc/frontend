import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

const ScrollPositionContext = createContext(0);
export function useGetScrollPosition() {
  return useContext(ScrollPositionContext);
}

const UpdateScrollPositionContext = createContext<Dispatch<SetStateAction<number>>>(
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
);
export function useUpdateScrollPosition() {
  return useContext(UpdateScrollPositionContext);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ScrollMangerProvider(props: any) {
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <ScrollPositionContext.Provider value={scrollPosition}>
      <UpdateScrollPositionContext.Provider value={setScrollPosition}>
        {props.children}
      </UpdateScrollPositionContext.Provider>
    </ScrollPositionContext.Provider>
  );
}
