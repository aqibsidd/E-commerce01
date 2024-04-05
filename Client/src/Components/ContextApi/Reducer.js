//yeh empty data basket h initial state m, isi m data as objects store honge
export const initialState ={
    basket:[],
}

export const getBasketTotal=(basket)=>{
    return(basket?.reduce((amount,item)=> (item.price + amount),0))
}

//reducer hum us krte hai actions ko krwane ke lie, jese yha do btns use hue states move krane data layer p ..add or remove to vo case ayenge
const reducer = (state,action) =>{
      switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket:[...state.basket,action.item]
            }
        case 'REMOVE_FROM_BASKET':
                const index = state.basket.findIndex(
                    (basketItem)=>basketItem.id === action.id
                );
                let newBasket = [...state.basket];
                if(index>=0){
                    newBasket.splice(index,1);
                }else{
                    console.warn('cant remove as its not in basket')
                }
                return{
                    ...state,
                    basket:newBasket
                }
        default :
            return state;        
            
      }
}
export default reducer;