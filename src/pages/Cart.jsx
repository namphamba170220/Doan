import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Helmet from '../components/Helmet'
import CartItem from '../components/CartItem'
import Button from '../components/Button'
import numberWithCommas from '../utils/numberWithCommas'
import productApi from '../Api/productApi'

const Cart = () => {

    const [productData, setProductData] = useState([]);

    useEffect(()=>{
        productApi.getAll().then( res => {
          if(res.statusText === 'OK'){
            setProductData(res.data);
          }
        })
      
      },[])


    return (
        <Helmet title="Giỏ hàng">
            <div className="cart">
                <div className="cart__info">
                    <div className="cart__info__txt">
                        <p>
                            Bạn đang có sản phẩm trong giỏ hàng
                        </p>
                        <div className="cart__info__txt__price">
                            <span>Thành tiền:</span> <span>{numberWithCommas(Number())}</span>
                        </div>
                    </div>
                    <div className="cart__info__btn">
                        <Button size="block">
                            Đặt hàng
                        </Button>
                        <Link to="/catalog">
                            <Button size="block">
                                Tiếp tục mua hàng
                            </Button>
                        </Link>
                        
                    </div>
                </div>
                <div className="cart__list">
                    {
                        productData.map((item, index) => (
                            <CartItem item={item} key={index}/>
                        ))
                    }
                </div>
            </div>
        </Helmet>
    )
}

export default Cart
