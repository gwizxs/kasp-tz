import classNames from "shared/library/classNames/classNames";
import { observer } from "mobx-react-lite"
import s from './ArticleNewsList.module.scss'
import { ArticleNewsListItem } from "../ArticleNewsListItem/ArticleNewsListItem";
import { IData_SnippetNews } from "shared/api/services/GetAllNews/types";
import { Skeleton } from "antd";

interface ArticleListProps {
    className?: string;
    articles?: IData_SnippetNews[];
    isLoading?: boolean;
}

export const ArticleNewsList = observer((props: ArticleListProps) => {
    const {
        className,
        articles = [],
        isLoading,
    } = props

    const renderArticle = (article: IData_SnippetNews) => {
        return (
            <ArticleNewsListItem
                article={article}
                key={article.ID}
            />
        )
    }

    const getSkeletons = () => new Array(3).fill(0).map((_, index) => (
        <Skeleton key={index} active />
    ));

    return (
        <section className={classNames(s.ArticleNewsList, {}, [className])}>
            {Array.isArray(articles) ? articles.map(renderArticle) : null}
            {isLoading && getSkeletons()}
        </section>
    )
})

export default ArticleNewsList