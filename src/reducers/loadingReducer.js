const initialState={
    loading:true
}
const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                loading:false
            }
        default:
            return state
    }
}
export default loadingReducer;