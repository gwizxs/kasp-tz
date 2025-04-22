import { MainPage } from "pages/MainPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { RouteProps } from "react-router-dom";


export enum AppRoutes {
    MAIN = 'main',
    NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {

    [AppRoutes.MAIN]: '/',

    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {

    // ------------- ВЕБ ------------------
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },

    // ------------- ВЕБ ------------------

    // всегда должен быть последним 
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
