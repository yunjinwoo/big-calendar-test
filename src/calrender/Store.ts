import { create } from 'zustand'

//출처: https://itchallenger.tistory.com/606 [Development & Investing:티스토리]
interface BearState {
    date?: Date
    cnt: number
    setDate: (by: Date) => void
    countUp: (by: number) => void
}

export const useBearState = create<BearState>()((set) => ({
    date: undefined,
    cnt: 0,
    setDate: (by) => set((state) => ({...state, date: by })),
    countUp: (by) => set((state) => ({...state, cnt: state.cnt + by })),
}))

/*** */