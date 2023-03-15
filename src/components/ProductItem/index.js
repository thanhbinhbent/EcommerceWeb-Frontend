import { Button, Popover, Rate } from 'antd';
import { useState } from 'react';
import {
    ShoppingCartOutlined,
    FullscreenOutlined,
    HeartOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import { handleMoney } from '@/utils';
import { connect } from 'react-redux';
import { addToCart } from '@/actions/cartActions';
import PreviewModal from '@/components/Widgets/PreviewModal';
import './ProductItem.css';
function ProductItem(props) {
    const { product, addToCart } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="product-item">
            <div className="product-item__container">
                <a href="#" className="product-item__link">
                    <div className="product-item__img">
                        <img src={product.thumbnail} alt="" />
                    </div>
                    <h3 className="product-item__name">{product.title}</h3>
                    <div className="product-item__rating">
                        <Rate
                            class="product-item__star"
                            disabled
                            defaultValue={product.rating}
                        />
                    </div>
                    <div className="product-item__price">
                        <span className="product-item__price--old">
                            {product.oldPrice
                                ? handleMoney(product.oldPrice)
                                : handleMoney('20000')}
                        </span>
                        <span className="product-item__price--sale">
                            {handleMoney(product.price)}
                        </span>
                    </div>
                </a>
                <div className="product-item__more">
                    <div className="product-item__col">
                        <span className="product-item__discount">
                            {'-' + product.discountPercentage + ' %'}
                        </span>
                        <span className="product-item__category ">
                            {product.category}
                        </span>
                    </div>
                    <div className="product-item__col">
                        <div
                            className="product-item__preview  product-item__tag"
                            onClick={showModal}
                        >
                            <FullscreenOutlined />
                        </div>
                        <PreviewModal
                            addToCart={addToCart}
                            open={isModalOpen}
                            product={product}
                            close={handleCancel}
                            oK={handleOk}
                        />
                        <div className="product-item__wishlist  product-item__tag">
                            <HeartOutlined />
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-item__addcart">
                <Button
                    block
                    type="primary"
                    className="product-item__btn"
                    ghost
                    onClick={() => addToCart(product)}
                >
                    <ShoppingCartOutlined />
                    Thêm vào giỏ
                </Button>
                <Popover content={'Xoá khỏi danh sách yêu thích'}>
                    <Button
                        block
                        type="primary"
                        className="product-item__btn product-item__btn-love-clear"
                        danger
                        ghost
                    >
                        <CloseOutlined />
                    </Button>
                </Popover>
            </div>
        </div>
    );
}

export default connect(null, { addToCart })(ProductItem);
