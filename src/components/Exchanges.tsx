import { useGetExchangesQuery } from 'services/CryptoApi';
import { Col, Row, Collapse, Avatar } from 'antd';
import Loader from 'components/Loader';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';

const { Panel } = Collapse;

interface Exchanges {
    id: number;
    name: string;
    numberOfMarkets: number;
    iconUrl: string;
    description: any;
    rank: number;
    volume: number;
    marketShare: number;
}

const Exchanges = () => {
    const { data, isFetching } = useGetExchangesQuery('');

    if (isFetching) return <Loader />;

    const exchanges = data?.data?.exchanges;

    console.log('exchyanhges: ', exchanges);

    return (
        <>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>
            <Collapse accordion>
                {exchanges.map(
                    ({
                        id,
                        name,
                        numberOfMarkets,
                        iconUrl,
                        description,
                        rank,
                        volume,
                        marketShare,
                    }: Exchanges) => (
                        <Panel
                            header={
                                <Row>
                                    <Col span={6}>
                                        <strong>{rank}</strong>.{' '}
                                        <Avatar
                                            src={iconUrl}
                                            className="exchange-image"
                                        />{' '}
                                        <strong>{name}</strong>{' '}
                                    </Col>
                                    <Col span={6}>{millify(volume)}</Col>
                                    <Col span={6}>
                                        {millify(numberOfMarkets)}
                                    </Col>
                                    <Col span={6}>{millify(marketShare)}</Col>
                                </Row>
                            }
                            key={id}
                            showArrow={false}
                        >
                            {HTMLReactParser(description || '')}
                        </Panel>
                    ),
                )}
            </Collapse>
        </>
    );
};

export default Exchanges;
