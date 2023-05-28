import * as React from 'react';

interface IHost {
  environment: 'dev' | 'prod';
  host:
    | 'http://localhost:5000'
    | 'https://ai-website-niche-finder.onrender.com';
}

export type HostType = IHost;

export const HostContext = React.createContext<HostType>({
  environment: 'dev',
  host: 'http://localhost:5000',
});

type ChildrenType = {
  children?: React.ReactElement | React.ReactElement[] | undefined;
};

export const HostProvider = ({
  children,
}: ChildrenType): React.ReactElement => {
  if (process.env.NODE_ENV === 'dev') {
    return (
      <HostContext.Provider
        value={{ environment: 'dev', host: 'http://localhost:5000' }}
      >
        {children}
      </HostContext.Provider>
    );
  } else {
    return (
      <HostContext.Provider
        value={{
          environment: 'prod',
          host: 'https://ai-website-niche-finder.onrender.com',
        }}
      >
        {children}
      </HostContext.Provider>
    );
  }
};
