import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import ProductView from './ProductView'

import Button from './Button'

import { remove } from '../redux/product-modal/productModalSlice'
import productApi from '../Api/productApi'



const ProductViewModal = () => {

    const productSlug = useSelector((state) => state.productModal.value)
    const dispatch = useDispatch()
    const [productData, setProductData] = useState([]);
    const [product, setProduct] = useState(undefined)
    
    useEffect(()=>{
        
        productApi.getAll().then( res => {
          if(res.statusText === 'OK'){
            setProductData(res.data);
          }
        })
      
      },[])

    useEffect(() => {
        setProduct(productData.getProductBySlug(productSlug))
    }, [productSlug,productData]);

    return (
        <div className={`product-view__modal ${product === undefined ? '' : 'active'}`}>
            <div className="product-view__modal__content">
                <ProductView product={product}/>
                <div className="product-view__modal__content__close">
                    <Button
                        size="sm"    
                        onClick={() => dispatch(remove())}
                    >
                        đóng
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductViewModal
