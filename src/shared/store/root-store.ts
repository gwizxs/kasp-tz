import { GetAllNewsStore } from "./api/Get-All-News/Get-All-News-store";

export class RootStore {
    getAllNewsStore = new GetAllNewsStore();
}