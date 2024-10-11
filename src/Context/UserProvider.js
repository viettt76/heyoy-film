import { createContext, useState } from 'react';

export const UserContext = createContext();

function UserProvider({ children }) {
    const [userCurrent, setUserCurrent] = useState(false);

    return <UserContext.Provider value={{userCurrent, setUserCurrent}}>{children}</UserContext.Provider>;
}

export default UserProvider;
