import { LOAD_TIMETABLE } from "../types"

export const loadTimetable = () => {
    return {
        type: LOAD_TIMETABLE,
        payload: DATA
    }
}