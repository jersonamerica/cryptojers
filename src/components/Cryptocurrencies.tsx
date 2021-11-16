import { FC, useEffect } from 'react';
import { Card, Col, Input, Row } from 'antd';
import millify from 'millify';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';

import { useGetCryptosQuery } from 'services/CryptoApi';

type Props = {
    simplified?: boolean;
};

const Cryptocurrencies: FC<Props> = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState<Array<any>>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (cryptoList?.data) {
            const filtered = cryptoList?.data?.coins.filter((coin: any) =>
                coin.name
                    .toLocaleLowerCase()
                    .includes(searchTerm.toLocaleLowerCase()),
            );
            setCryptos(filtered);
        }
    }, [cryptoList?.data, searchTerm]);

    if (isFetching) return <Loader />;

    return (
        <>
            <div className="search-crypto">
                {!simplified && (
                    <Input
                        placeholder="Search Cryptocurrency"
                        onChange={e => setSearchTerm(e.target.value)}
                    ></Input>
                )}
            </div>
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map(currency => (
                    <Col
                        xs={24}
                        md={12}
                        lg={6}
                        className="crypto-card"
                        key={currency.id}
                    >
                        <Link to={`/crypto/${currency.id}`}>
                            <Card
                                title={`${currency.rank}. ${currency.name}`}
                                extra={
                                    <img
                                        className="crypto-image"
                                        src={currency.iconUrl}
                                    />
                                }
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Cryptocurrencies;
