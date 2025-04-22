import { useStore } from "app/providers/StoreProvider"
import { ArticleNewsList } from "entities/Article_News"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { IData_SnippetNews } from "shared/api/services/GetAllNews/types"
import { Page } from "widgets/Page/Page"

export const MainPage = observer(() => {
    const { getAllNewsStore } = useStore()

    useEffect(() => {
        const fetchData = async () => {
            await getAllNewsStore.getAllNewsAction();
        };
        fetchData();
    }, [getAllNewsStore]);


    const articles = getAllNewsStore.getAllNewsData?.value ? [getAllNewsStore.getAllNewsData.value] : [];
    const isLoading = getAllNewsStore.getAllNewsData?.state === "pending";

    return (
        <Page>
            <ArticleNewsList 
                articles={articles as IData_SnippetNews[]}
                isLoading={isLoading}
            />
        </Page>
    )
})

export default MainPage