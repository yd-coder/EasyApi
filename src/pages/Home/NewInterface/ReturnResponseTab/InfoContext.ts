import React from 'react'
import { Dispatch, SetStateAction } from 'react';

interface MyContextType {
    componentName: string;
    httpCode: string;
    selectedValue: string;
    setComponentName: Dispatch<SetStateAction<string>>;
    setHttpCode: Dispatch<SetStateAction<string>>;
    setSelectedValue: Dispatch<SetStateAction<string>>;
    setLabel: Dispatch<SetStateAction<string>>;
  }
  

const defaultValue = {
    componentName: '',
    httpCode: '',
    selectedValue: '',
    setComponentName: () => {},
    setHttpCode: () => {},
    setSelectedValue: () => {},
    setLabel: () => {},

  };

export const InfoContext = React.createContext<MyContextType>(defaultValue)

// export default InfoContext