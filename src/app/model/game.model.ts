export interface Game {
    id: number;
    status: boolean;
    initialValue: number;
    finalValue: number;
    initTime: number;
    endTime: number;
}

export const defaultGame = {
    id: 0,
    status: false,
    initialValue: 0,
    finalValue: 0,
    initTime: 0,
    endTime: 0
}