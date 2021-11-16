import { FC, useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from 'services/CryptoNewsApi';
import { useGetCryptosQuery } from 'services/CryptoApi';
import { SelectValue } from 'antd/lib/select';

import Loader from './Loader';

type Props = {
    simplified?: boolean;
};

const { Text, Title } = Typography;
const { Option } = Select;
const defaultImage =
    'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
const News: FC<Props> = ({ simplified }) => {
    const [newsCategory, setNewsCategory] =
        useState<SelectValue>('Cryptocurrency');
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
        newsCategory,
        count: simplified ? 6 : 12,
    });

    const { data: cryptoList } = useGetCryptosQuery(100);

    if (isFetching) return <Loader />;

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        onChange={value => setNewsCategory(value)}
                        filterOption={(input, option) =>
                            option?.children
                                .toLocaleLowerCase()
                                .indexOf(input.toLocaleLowerCase()) > -1
                        }
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {cryptoList?.data?.coins.map((coin: any) => (
                            <Option key={coin.id} value={coin.name}>
                                {coin.name}
                            </Option>
                        ))}
                    </Select>
                </Col>
            )}
            {cryptoNews?.value.length === 0 && (
                <Text>No news yet about {newsCategory}</Text>
            )}
            {cryptoNews?.value.map((news: any) => (
                <Col xs={24} sm={12} lg={8} key={news.name}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title
                                    className="news-title"
                                    level={4}
                                    title={news.name}
                                >
                                    {news.name}
                                </Title>
                                <img
                                    src={
                                        news.image?.thumbnail?.contentUrl ||
                                        defaultImage
                                    }
                                    alt={news.name}
                                    style={{
                                        maxWidth: '200px',
                                        maxHeight: '100px',
                                    }}
                                />
                            </div>
                            <p className="news-description">
                                {news.description}
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar
                                        src={
                                            news.provider[0]?.image?.thumbnail
                                                ?.contentUrl || defaultImage
                                        }
                                    />
                                    <Text className="provider-name">
                                        {news.provider[0]?.name}
                                    </Text>
                                </div>
                                <Text>
                                    {moment(news.datePublished)
                                        .startOf('second')
                                        .fromNow()}
                                </Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default News;
