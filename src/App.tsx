import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import NavBar from 'components/NavBar';
import Homepage from 'components/Homepage';
import Exchanges from 'components/Exchanges';
import Cryptocurrencies from 'components/Cryptocurrencies';
import CryptoDetails from 'components/CryptoDetails';
import News from 'components/News';
import NotFound from 'components/NotFound';
import './App.css';

const App = () => (
    <div className="app">
        <div className="navbar">
            <NavBar />
        </div>
        <div className="main">
            <Layout className="main-content">
                <div className="routes">
                    <Switch>
                        <Route exact path="/">
                            <Homepage />
                        </Route>
                        <Route exact path="/exchanges">
                            <Exchanges />
                        </Route>
                        <Route exact path="/cryptocurrencies">
                            <Cryptocurrencies />
                        </Route>
                        <Route exact path="/crypto/:coinId">
                            <CryptoDetails />
                        </Route>
                        <Route exact path="/news">
                            <News />
                        </Route>
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Layout>
            <div className="footer">
                <Typography.Title
                    level={5}
                    style={{ color: 'white', textAlign: 'center' }}
                >
                    Cryptojers <br />
                    All rights reserved
                </Typography.Title>
                <Space>
                    <Link to="/">Home</Link>
                    <Link to="/exchanges">Exchanges</Link>
                    <Link to="/">News</Link>
                </Space>
            </div>
        </div>
    </div>
);

export default App;
