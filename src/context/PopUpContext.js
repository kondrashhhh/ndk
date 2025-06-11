import { createContext, useState, useContext } from 'react';


const PopUpContext = createContext();

export const usePopUp = () => {
    return useContext(PopUpContext);
};

export const PopUpProvider = ({ children }) => {
    const [activePopUp, setActivePopUp] = useState(null);
    const [popupProps, setPopupProps] = useState(null);

    const openPopUp = (popupId, props = {}) => {
        setActivePopUp(popupId);
        setPopupProps(props);
    };

    const closePopUp = () => {
        setActivePopUp(null);
        setPopupProps(null);
    };

    return (
        <PopUpContext.Provider value={{ activePopUp, popupProps, openPopUp, closePopUp }}>
            {children}
        </PopUpContext.Provider>
    );
};