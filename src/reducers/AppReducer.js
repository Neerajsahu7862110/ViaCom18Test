const initialState = {
    result: [],
    error: {},
    isLoading: false,
    totalCount: 1
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_GIF_REQUESTING': {
            return {
                ...state,
                isLoading: true
            }
        }
        case 'FETCH_GIF_SUCCESS': {
            const updateData = action.payload.isInitial ? action.payload.data.data : [...state.result, ...action.payload.data.data];
            return {
                ...state,
                result: updateData,
                isLoading: false,
                totalCount: action.payload.data.pagination.total_count
            }
        }
        case 'FETCH_GIF_FAILURE': {
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        }
        default: return state;
    }
}
