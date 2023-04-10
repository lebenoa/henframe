export type MultipleNHResponse = {
    success: Boolean;
    error: string;
    data: [Nhresponse];
};

export type Nhql = {
    id: number;
    title: NhqlTitle;
    images: NhqlImages;
    info: NhqlInfo;
    metadata: NhqlMetadata;
};

export type NhqlImages = {
    pages: [NhqlPage];
    cover: NhqlPage;
};

export type NhqlInfo = {
    amount: number;
    favorite: number;
    upload: number;
    mediaId: number;
};

export type NhqlMetadata = {
    parodies: [NhqlTag];
    characters: [NhqlTag];
    groups: [NhqlTag];
    categories: [NhqlTag];
    artists: [NhqlTag];
    tags: [NhqlTag];
    language: string;
};

export type NhqlPage = {
    link: string;
    info: NhqlPageInfo;
};

export type NhqlPageInfo = {
    type: string;
    width: number;
    height: number;
};

export type NhqlTag = {
    name: string;
    count: number;
    url: string;
};

export type NhqlTitle = {
    display: string;
    english: string;
    japanese: string;
};

export type Nhresponse = {
    success: Boolean;
    error: string;
    data: Nhql;
};

export type NhsearchResponse = {
    success: Boolean;
    error: string;
    total: number;
    data: [Nhql];
};

export type APISearchResponse = {
    data: {
        nhql: {
            search: NhsearchResponse;
        };
    };
};

export type APIByResponse = {
    data: {
        nhql: {
            by: Nhresponse;
        };
    };
};
