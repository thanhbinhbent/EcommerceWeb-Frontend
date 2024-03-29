import { Button, Popover, Rate, message } from 'antd';
import { useState } from 'react';
import {
    ShoppingCartOutlined,
    FullscreenOutlined,
    HeartOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import { handleMoney } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/actions/cartActions';
import { addToWishlist, removeFromWishlist } from '@/actions/userActions';
import PreviewModal from '@/components/Widgets/PreviewModal';
import './ProductItem.css';
import { useNavigate } from 'react-router-dom';
import customerService from '@/services/customerService';

function ProductItem(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { product } = props;
    const user = useSelector((state) => state.user.user);
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const viewDetail = (id) => {
        navigate(`/products/${product._id}`);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        messageApi.open({
            type: 'success',
            content: 'Thêm vào giỏ hàng thành công!',
          });
    };
    const displayDiscount = (product) => {
        if (product?.campaign?.active) {
            let discountType = product.campaign.sale_type;
            let discount = 0;
            if(discountType ==='percent') {
                discount = product.campaign.amount * 100;
            }
            else {
                discount = product.campaign.amount;
            }
            return (
                <span className="product-item__discount">
                    {`- ${discount} ${changeType(discountType)}`}
                </span>
            );
        }
        return <></>;
    };
    const changeType = (type) => {
        if (type === 'percent') {
            return '%';
        }
        return 'đ';
    };
    const displayNewPrice = (product) => {
        if (product?.campaign?.active) {
            if (product.campaign.sale_type === 'percent') {
                return product.price - (product.price * product.campaign.amount);
            }
            return product.price - product.campaign.amount;
        }
        return product.price;
    };
    const displayRating = (product) => {
        let rating = 0;
        if (!product?.reviews) {
            return rating;
        }
        product?.reviews.forEach((review) => {
            rating += review.rating;
        });
        return rating / product?.reviews.length;
    };
    const addProductToWishList = (product) => {
        if (!user) return;
        customerService.addToWishlist(user.user_id, product).then((res) => {
            if (res.status === 200) {
                dispatch(addToWishlist(product));
                messageApi.open({
                    type: 'success',
                    content: 'Thêm vào wishlist thành công!',
                });
            }
        });
    };
    const removeProductFromWishList = (product) => {
        if (!user) return;
        customerService.removeFromWishlist(user.user_id, product).then((res) => {
            if (res.status === 200) {
                messageApi.open({
                    type: 'success',
                    content: 'Xóa khỏi wishlist thành công!',
                });
                dispatch(removeFromWishlist(product._id));
            }
        });
    };
    return (
        <div className="product-item">
            {contextHolder}
            <div className="product-item__container">
                <button
                    onClick={viewDetail}
                    key={product.product_id}
                    className="product-item__link"
                >
                    <div className="product-item__img">
                        <img src={product?.image[0]} alt="" />
                    </div>
                    <h3 className="product-item__name">{product?.name}</h3>
                    <div className="product-item__rating">
                        <Rate
                            class="product-item__star"
                            disabled
                            defaultValue={displayRating(product)}
                        />
                    </div>
                    <div className="product-item__price">
                        {product?.campaign?.active && (
                            <span className="product-item__price--old">
                                {handleMoney(product?.price)}
                            </span>
                        )}
                        <span className="product-item__price--sale">
                            {handleMoney(displayNewPrice(product))}
                        </span>
                    </div>
                </button>
                <div className="product-item__more">
                    <div className="product-item__col">
                        {displayDiscount(product)}
                        <span className="product-item__category ">
                            {product?.category_lst[0]?.name}
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
                            open={isModalOpen}
                            product={product}
                            close={handleCancel}
                            oK={handleOk}
                        />
                        <div
                            className="product-item__wishlist  product-item__tag"
                            onClick={() => addProductToWishList(product)}
                        >
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
                    onClick={() => handleAddToCart(product)}
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
                        onClick={() => removeProductFromWishList(product)}
                    >
                        <CloseOutlined />
                    </Button>
                </Popover>
            </div>
        </div>
    );
}

export default ProductItem;
