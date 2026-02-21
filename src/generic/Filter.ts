export type FilterValue<T> = {
    eq?: T;
    ne?: T;
    gt?: T;
    gte?: T;
    lt?: T;
    lte?: T;
    in?: T[];
    nin?: T[];
    like?: string;
};

export type Filter<T> = {
    [K in keyof T]?: FilterValue<T[K]> | T[K];
};
