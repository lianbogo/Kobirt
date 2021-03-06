export interface Progression {
    latest: number;
    week: number;
    month: number;
    total: number;
}

export interface MedalColorProperty<T> {
    bronze: T;
    silver: T;
    gold: T;
    platinum: T;
    black: T;
}

export interface IMedal {
    name: string,
    CurrentLevel: string,
    progression: Progression,
    date: MedalColorProperty<number>;
    miss: MedalColorProperty<number>;
}

export default IMedal;