import { makeAutoObservable } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { IData_SnippetNews } from "shared/api/services/GetAllNews/types";
import { getAllNews } from "shared/api/services/GetAllNews/api";

export class GetAllNewsStore {
    constructor() {
        makeAutoObservable(this);
    }

    getAllNewsData?: IPromiseBasedObservable<IData_SnippetNews>

    getAllNewsAction = async () => {
        try {
            console.log("getAllNewsAction");
            this.getAllNewsData = fromPromise<IData_SnippetNews>(
                getAllNews()
            );
            console.log(this.getAllNewsData, 'getAllNewsData');
        } catch (error) {
            console.log(error);
        }
    }
}