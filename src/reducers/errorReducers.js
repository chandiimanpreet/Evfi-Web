const initialState={
    error:null
}

const errorReducer=(state=initialState,action)=>{
    switch(action.type){
        case "SET_ERROR":
            return {
                error:action.payload
            }
        case "CLEAR_ERROR":
            return {
                error:null
            }
        default:
            return state
    }
}
export default errorReducer;