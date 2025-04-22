export interface IData_SnippetNews {
    ID: number;        // идентификатор новости
    H: string;         // заголовок новости
    AB: string;        // содержимое новости
    URL: string;       // ссылка на новость
    DOM: string;       // домен
    DP: string;        // дата и время публикации
    LANG: string;      // язык новости
    REACH: number;     // охват новости
    KW: IData_TagItem[]; // ключевые слова
    AU: string[];      // автор новости
    CNTR: string;      // страна
    CNTR_CODE: string; // код страны
    SENT: string;      // сентимент новости
    TRAFFIC: IData_TrafficItem[]; // траффик из стран
    FAV: string;       // ссылка на иконку
    HIGHLIGHTS: string[]; // блоки содержимого новости с ключевыми словами
}

export interface IData_TagItem {
    value: string;     // название тега
    count: number;     // кол-во тегов с указанным названием
}

export interface IData_TrafficItem {
    value: string;     // название страны-источник траффика
    count: number;     // объем траффика для указанной страны
}
