import * as React from 'react';

interface ICleanUpContext {
  performCleanUp: boolean | undefined;
  setPerformCleanUp: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

type CleanUpContextType = ICleanUpContext;

export const CleanUpContext = React.createContext<CleanUpContextType>({
  performCleanUp: undefined,
  setPerformCleanUp: undefined,
});

type ChildrenType = {
  children?: React.ReactElement | React.ReactElement[] | undefined;
};

export const CleanUpProvider = ({
  children,
}: ChildrenType): React.ReactElement => {
  const [performCleanUp, setPerformCleanUp] = React.useState(false);
  return (
    <CleanUpContext.Provider value={{ performCleanUp, setPerformCleanUp }}>
      {children}
    </CleanUpContext.Provider>
  );
};
