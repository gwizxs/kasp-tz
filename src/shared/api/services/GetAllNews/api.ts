import { API_URL } from "shared/api/api_url";
import { baseInstanceV1 } from "shared/api/base";
import { IData_SnippetNews } from "./types";

//  ============= FETCH ALL NEWS =============
export const getAllNews = async () => {
    const response = await baseInstanceV1.get<IData_SnippetNews>(API_URL.getNews());
    return response.data;
};
