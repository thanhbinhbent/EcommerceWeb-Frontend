import React from 'react';
import {
    MailOutlined,
    SafetyOutlined,
    RocketOutlined,
    TagsOutlined,
    DollarOutlined,
    WhatsAppOutlined,
} from '@ant-design/icons';

import { Input, Row, Col, Form, Button, message } from 'antd';
import './Footer.css';
import PayMethod from '@/components/Widgets/PayMethod';
import SourceImg from '../../assets/images';
import { emailValidator } from '@/utils';
import newsLetterService from '@/services/newsLetterService';
function Footer() {
    const [messageApi, contextHolder] = message.useMessage();
    const onSubmit = (values) => {
        newsLetterService.postEmail(values).then((res) => {
            if (res.status === 400) {
                messageApi.open({
                    type: 'error',
                    content: 'Email này đã được đăng ký!',
                });
            } else {
                messageApi.open({
                    type: 'success',
                    content: 'Đăng ký thành công!',
                });
            }
        });
    };
    return (
        <Row>
            {contextHolder}
            <div className="footer-letter">
                <Row className="container" justify="space-between">
                    <Col className="footer-letter__form">
                        <Row className="footer-letter__desc">
                            <h3>Giảm 10.000đ cho đơn hàng đầu tiên</h3>
                            <h1>Nhận tin khuyến mãi qua Email</h1>
                            <p>
                                Đăng ký nhận tin của chúng tôi qua email ngay bây giờ để
                                nhận thông tin cập nhật về các chương trình khuyến mãi và
                                phiếu giảm giá.
                            </p>
                        </Row>
                        <Row className="footer-letter__container">
                            <Form
                                size="large"
                                name="normal_letter"
                                className="email-form"
                                initialValues={{ remember: true }}
                                onFinish={onSubmit}
                            >
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng không bỏ trống Email!',
                                        },
                                        {
                                            validator: emailValidator,
                                        },
                                    ]}
                                >
                                    <Input
                                        style={{ width: 300 }}
                                        prefix={
                                            <MailOutlined className="site-form-item-icon" />
                                        }
                                        placeholder="Nhập E-mail..."
                                    />
                                </Form.Item>
                                <Button htmlType="submit" className="email-form-button">
                                    Gửi
                                </Button>
                            </Form>
                        </Row>
                    </Col>
                    <Col className="footer-letter__img">
                        <img src={SourceImg.coupon} alt="" />
                    </Col>
                </Row>
            </div>
            <div className="footer-services">
                <div className="container">
                    <ul className="footer-services__list">
                        <li className="footer-service__item">
                            <SafetyOutlined className="footer-service__icon" />
                            <span className="footer-item__text">Sản phẩm chất lượng</span>
                        </li>
                        <li className="footer-service__item">
                            <RocketOutlined className="footer-service__icon" />
                            <span className="footer-item__text">
                                Miễn phí vận chuyển từ 300.000 VNĐ
                            </span>
                        </li>
                        <li className="footer-service__item">
                            <TagsOutlined className="footer-service__icon" />
                            <span className="footer-item__text">
                                Giảm giá ưu đãi khách hàng cũ
                            </span>
                        </li>
                        <li className="footer-service__item">
                            <DollarOutlined className="footer-service__icon" />
                            <span className="footer-item__text">
                                Giá tốt nhất thị trường
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <Row className="footer-category">
                <Col className="footer-category__col col">
                    <ul className="footer-category__list">
                        <li className="footer-category__item"></li>
                        <li className="footer-category__item"></li>
                        <li className="footer-category__item"></li>
                        <li className="footer-category__item"></li>
                        <li className="footer-category__item"></li>
                    </ul>
                </Col>
                <Col className="footer-category__col col">
                    <ul className="footer-category__list">
                        <li className="footer-category__item"></li>
                        <li className="footer-category__item"></li>
                        <li className="footer-category__item"></li>
                        <li className="footer-category__item"></li>
                        <li className="footer-category__item"></li>
                    </ul>
                </Col>
                <Col className="footer-category__col col">
                    <ul className="footer-category__list">
                        <li className="footer-category__item"></li>
                        <li className="footer-category__item"></li>
                        <li className="footer-category__item"></li>
                        <li className="footer-category__item"></li>
                        <li className="footer-category__item"></li>
                    </ul>
                </Col>
                <Col className="footer-category__col col">
                    <ul className="footer-category__list">
                        <li className="footer-category__item"></li>
                        <li className="footer-category__item"></li>
                        <li className="footer-category__item"></li>
                        <li className="footer-category__item"></li>
                        <li className="footer-category__item"></li>
                    </ul>
                </Col>
            </Row>
            <Row
                className="footer-contact container"
                justify="space-between"
                align="middle"
            >
                <Col className="footer-contact__phone">
                    <WhatsAppOutlined />
                    <span className="footer-phone__value">1900.61.28</span>
                </Col>
                <Col className="footer-payment__method">
                    <PayMethod></PayMethod>
                </Col>
            </Row>
            <Row className="footer-copyright container">
                <div className="footer-copyright__row">
                    <Col className="footer-copyright__col">
                        <p>Bản quyền nội dung 2023 © BHShop.</p>
                    </Col>
                    <Col className="footer-copyright__col">
                        <img
                            className="footer-copyright__verified"
                            src={SourceImg.verifiedWebsite}
                            alt=""
                        />
                    </Col>
                </div>
            </Row>
        </Row>
    );
}

export default Footer;
