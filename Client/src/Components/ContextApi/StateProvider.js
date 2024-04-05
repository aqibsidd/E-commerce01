import { useContext, createContext, useReducer } from "react";

//yeh data layer h jha hmare globally data sharing ke lie store hoga
export const StateContext = createContext();

//ye us data ko sb jagah provide krwata hai
export const StateProvider = ({reducer, initialState ,children})=>{
    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
          {children}
        </StateContext.Provider>
      );
}

//yeh un state ko access krne k lie hooks bnae hai 
export const useStateValue =() => useContext(StateContext);