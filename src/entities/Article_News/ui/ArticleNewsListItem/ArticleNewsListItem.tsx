import { classNames } from 'shared/library/classNames/classNames';
import { HTMLAttributeAnchorTarget, memo, useState } from 'react';
import { IData_SnippetNews } from 'shared/api/services/GetAllNews/types';
import { Card, Typography, Space, Tag, Button } from 'antd';
import { EyeOutlined, GlobalOutlined, DownOutlined, InfoCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import s from './ArticleNewsListItem.module.scss';
import { useTranslation } from 'react-i18next';

interface ArticleNewsListItemProps {
    className?: string;
    article: IData_SnippetNews;
    target?: HTMLAttributeAnchorTarget;
}

const { Link, Text } = Typography;

export const ArticleNewsListItem = memo((props: ArticleNewsListItemProps) => {
    const {
        className,
        article,
        target,
    } = props;

    const { t } = useTranslation();

    const [expanded, setExpanded] = useState(false);
    const [showDuplicates, setShowDuplicates] = useState(false);

    const formatTraffic = () => {
        return article.TRAFFIC
            .map(t => `${t.value} ${Math.round(t.count * 100)}%`)
            .join(' ');
    };

    const renderHighlight = (text: string) => {
        return text.replace(
            /\u003Ckw\u003E(.*?)\u003C\/kw\u003E/g,
            '<span class="highlight">$1</span>'
        );
    };

    const handleTitleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open(article.URL, target || '_blank');
    };

    const handleSourceClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open(`https://${article.DOM}`, '_blank');
    };

    return (
        <div className={classNames(s.articleCard, {}, [className])}>
            <Card
                className={s.card}
            >
                <div className={s.header}>
                    <Space size={16}>
                        <Text className={s.date}>{dayjs(article.DP).format('DD MMM YYYY')}</Text>
                        <Space className={s.reach}>
                            <EyeOutlined />
                            <Text>{article.REACH} {t('Охватов')}</Text>
                        </Space>
                        <Text className={s.traffic}>{t('Основной трафик')}: {formatTraffic()}</Text>
                    </Space>
                    <Space className={s.statusIcons}>
                        <Button 
                            type="primary" 
                            size="small" 
                            className={s.statusButton}
                        >
                            {article.SENT.charAt(0).toUpperCase() + article.SENT.slice(1)}
                        </Button>
                        <InfoCircleOutlined 
                            className={s.infoIcon} 
                        />
                    </Space>
                </div>

                <Link 
                    href={article.URL} 
                    target={target} 
                    className={s.title}
                    onClick={handleTitleClick}
                >
                    {article.H}
                </Link>

                <div className={s.sourceInfo}>
                    <Space size={16}>
                        <Link 
                            href={`https://${article.DOM}`}
                            className={s.source}
                            onClick={handleSourceClick}
                        >
                            <GlobalOutlined />
                            <Text>{article.DOM}</Text>
                        </Link>
                        <Space className={s.country}>
                            <span className={s.flag}>
                                {article.CNTR_CODE === 'fr' ? '🇫🇷' : 
                                 article.CNTR_CODE === 'us' ? '🇺🇸' :
                                 article.CNTR_CODE === 'at' ? '🇦🇹' : '🌐'}
                            </span>
                            <Text>{article.CNTR}</Text>
                        </Space>
                        {article.AU.length > 0 && (
                            <Space className={s.authors}>
                                <Text>{article.AU.join(', ')}</Text>
                            </Space>
                        )}
                    </Space>
                </div>

                <div className={s.content}>
                    <div 
                        className={s.highlight}
                        dangerouslySetInnerHTML={{ 
                            __html: expanded && article.HIGHLIGHTS.length > 0 
                                ? article.HIGHLIGHTS.map(h => renderHighlight(h)).join('<br/><br/>') 
                                : article.HIGHLIGHTS.length > 0 
                                    ? renderHighlight(article.HIGHLIGHTS[0]) 
                                    : article.AB
                        }} 
                    />
                    {article.HIGHLIGHTS.length > 1 && (
                        <div className={s.showMoreWrapper}>
                            <Button 
                                type="link" 
                                className={s.showMoreBtn}
                                onClick={() => setExpanded(!expanded)}
                                icon={<DownOutlined rotate={expanded ? 180 : 0} />}
                            >
                                {expanded ? t('Показать меньше') : t('Показать больше')}
                            </Button>
                        </div>
                    )}
                </div>

                <div className={s.tags}>
                    <Space wrap>
                        {article.KW.map(tag => (
                            <Tag 
                                key={tag.value} 
                                className={s.tag}
                            >
                                <Space>
                                    <Text>{tag.value}</Text>
                                    <Text className={s.tagCount}>{tag.count}</Text>
                                </Space>
                            </Tag>
                        ))}
                    </Space>
                </div>

                <div className={s.footer}>
                    <Button 
                        type="link"
                        className={s.sourceBtn}
                        onClick={() => {
                            window.open(article.URL, '_blank');
                        }}
                    >
                        {t('Оригинальный источник')}
                    </Button>

                    <div className={s.duplicates}>
                        <Text className={s.duplicatesCount}>{t('Дубликаты')}: 192</Text>
                        <Button 
                            className={s.viewDuplicatesBtn}
                            icon={<DownOutlined rotate={showDuplicates ? 180 : 0} />}
                            onClick={() => setShowDuplicates(!showDuplicates)}
                            block
                        >
                            {t('Просмотреть дубликаты')}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
});
