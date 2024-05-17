import React, {createContext, useState, useContext, FC} from 'react';

type User = {id: null | number; name: string | null; email: string | null};

const UserContext = createContext<{
  userDetails: User | null;
  setUserDetails: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  userDetails: null,
  setUserDetails: () => {},
});

export const UserProvider: FC = ({children}) => {
  const [userDetails, setUserDetails] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{userDetails, setUserDetails}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
