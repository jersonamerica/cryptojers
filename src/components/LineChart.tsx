import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

type Props = {
    coinHistory: any;
    currentPrice: string;
    coinName: string;
};

interface HistoryData {
    price: string;
    timestamp: string;
}

const { Title } = Typography;

const LineChart: FC<Props> = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice: Array<string> = [];
    const coinTimestamp: Array<string> = [];
    coinHistory?.data?.history.forEach((datum: HistoryData) => {
        coinPrice.push(datum.price);
        coinTimestamp.push(new Date(datum.timestamp).toLocaleDateString());
    });

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            },
        ],
    };

    const options: Record<string, any> = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };
    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">
                    {coinName} Price Chart
                </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">
                        {coinHistory?.data?.change}%
                    </Title>
                    <Title level={5} className="current-price">
                        Current {coinName} Price: $ {currentPrice}
                    </Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    );
};

export default LineChart;
