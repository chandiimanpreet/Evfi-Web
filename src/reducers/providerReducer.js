const initialState = {
    status: '',
    timeSlot: '',
    userId: '',
}

const providerReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SET_PROVIDER':
            console.log(action.payload.status)
            return {
                ...action.payload,
            }


        default:
            return state
    }
}
export default providerReducer;