import { createContext, useEffect, useState, useContext } from 'react';

export const UserContext = createContext(null);

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [logged, setLogged] = useState(false);

    // useEffect(() => {
    //     const user = localStorage.getItem("user");
    //     if (user) {
    //         setUser(user);
    //         setLogged(true);
    //     }
    // }, []);

    return (
        <UserContext.Provider value={{ user, setUser, logged, setLogged }}>
            {children}
        </UserContext.Provider>
    );
};

export default AppContextProvider;

//ON CHILD COMPONENT: <AppContextProvider><ChildComponent /></AppContextProvider>
//ON PARENT COMPONENT: import {UserContext} from '../GlobalStates';
// const {user, setUser, logged, setLogged} = useContext(UserContext);
