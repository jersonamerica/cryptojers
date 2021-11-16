import { Spin } from 'antd';

const Loader = () => {
    return (
        <div className="loader">
            <Spin size="large" tip="Please wait"></Spin>
        </div>
    );
};

export default Loader;
