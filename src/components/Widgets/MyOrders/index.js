import { useEffect, useState } from 'react';
import {
    Button,
    List,
    Skeleton,
    Modal,
    Popconfirm,
    Table,
    InputNumber,
    Card,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import OrderTracking from '@/components/OrderTracking';

import './MyOrders.css';
import { useSelector } from 'react-redux';
import orderService from '@/services/orderService';
import { handleMoney } from '@/utils';
function MyOrders() {
    const customer = useSelector((state) => state.customer.customer);
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [openPop, setOpenPop] = useState(false);
    const [orderId, setOrderId] = useState('');
    const sumTotal = (order) => {
        return order?.products.reduce((sum, item) => {
            return sum + item.quantity * item.price;
        }, 0);
    };
    const changePaymentMethodToText = (e) => {
        switch (e) {
            case 'cash_on_delivery':
                return 'Thanh toán khi nhận hàng';
            case 'momo':
                return 'Thanh toán qua Momo';
            case 'zalopay':
                return 'Thanh toán qua ZaloPay';
            case 'credit_card':
                return 'Thanh toán bằng thẻ tín dụng';
            default:
                return 'Thanh toán khi nhận hàng';
        }
    };
    const changeDateFormat = (date) => {
        let newDate = new Date(date);
        return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
    };
    useEffect(() => {
        orderService.getOrdersOfUser({ customer_id: customer._id }).then((res) => {
            setInitLoading(false);
            setList(res.data);
        });
    }, [customer]);
    const onLoadMore = () => {
        setLoading(true);
    };
    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>Xem thêm</Button>
            </div>
        ) : null;
    const showPopconfirm = () => {
        setOpenPop(true);
    };
    const handlePopOk = () => {
        setCancelLoading(true);
        setTimeout(() => {
            setOpenPop(false);
            setCancelLoading(false);
        }, 1500);
    };

    const handleCancelPop = () => {
        setOpenPop(false);
    };
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'product_name',
            key: 'name',
            render: (name) => <p className="product-title">{name}</p>,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => handleMoney(price),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity, record) => (
                <InputNumber
                    value={quantity}
                    defaultValue={quantity}
                    min={1}
                    max={100}
                    bordered={false}
                />
            ),
        },
    ];
    return (
        <div>
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={(item) => (
                    <List.Item
                        key={item._id}
                        actions={[
                            <div>
                                {' '}
                                <button
                                    className="button-detail"
                                    key="list-loadmore-edit"
                                    onClick={() => {
                                        setModalOpen(true);
                                        setOrderId(item._id);
                                    }}
                                >
                                    Chi tiết
                                </button>
                            </div>,
                            <button className="button-rate" key="list-loadmore-more">
                                Đánh giá
                            </button>,
                        ]}
                    >
                        <Card className="my-order__table">
                            {' '}
                            <Table
                                dataSource={item.products}
                                pagination={false}
                                columns={columns}
                            />
                        </Card>
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                title={<span>{item._id}</span>}
                                description={changePaymentMethodToText(
                                    item?.payment_method,
                                )}
                            />
                            <div></div>
                            <div>
                                <p>Đặt ngày: {changeDateFormat(item.order_date)}</p>
                                <p className="my-order__price-total">
                                    Tổng tiền: {sumTotal(item)} đồng
                                </p>
                            </div>
                        </Skeleton>
                    </List.Item>
                )}
            />
            <Modal
                style={{ top: 20 }}
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                footer={[
                    <Popconfirm
                        title="Huỷ đơn hàng"
                        description="Bạn có chắn chắn muốn huỷ đơn hàng này?"
                        open={openPop}
                        onConfirm={handlePopOk}
                        okButtonProps={{ loading: cancelLoading }}
                        onCancel={handleCancelPop}
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    >
                        <Button key="cancel" onClick={showPopconfirm} danger>
                            Huỷ đơn
                        </Button>
                    </Popconfirm>,
                    <Button key="ok" type="primary" onClick={() => setModalOpen(false)}>
                        Thoát
                    </Button>,
                ]}
            >
                <OrderTracking order_id={orderId}></OrderTracking>
            </Modal>
        </div>
    );
}

export default MyOrders;
