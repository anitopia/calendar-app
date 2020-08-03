const initialState = {
    meetingRooms:[],
    meetings: [],
    date: {
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    }
}

export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_MEETINGS':
            return {
                ...state,
                meetings: [
                    ...state.meetings,
                    ...action.data
                ]
            }
        case 'ADD_MEETING':
            return {
                ...state,
                meetings: [
                    ...state.meetings,
                    action.data
                ]
            }
        case 'ADD_MEETING_ROOMS':
            return {
                ...state,
                meetingRooms: [
                    ...state.meetingRooms,
                    ...action.data
                ]
            }
    
        case 'REMOVE_MEETING':
            return {
                ...state,
                meetings: state.meetings.filter(m => action.data.start !== m.start || action.data.meetingRoom !== m.meetingRoom)                    
            }
        case 'SET_DATE':
            return {
                ...state,
                date: action.data
            }
        case 'SET_MONTH':
            return {
                ...state,
                date: {
                    ...state.date,
                    month: action.data
                }
            }
        case 'NEXT_MONTH':
            return {
                ...state,
                date: {
                    ...state.date,
                    month: state.date.month + 1
                }
            }
        case 'PREV_MONTH':
            return {
                ...state,
                date: {
                    ...state.date,
                    month: state.date.month - 1
                }
            }
        case 'SET_YEAR':
            return {
                ...state,
                date: {
                    ...state.date,
                    year: action.data
                }
            }
        default:
            return state;
    }
}
