// import React, { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
// import ProductView from './ProductView'
// import Button from './Button'
// import { remove } from '../redux/product-modal/productModalSlice'
// import productApi from '../Api/productApi'



// const ProductViewModal = () => {

//     const [productData, setProductData] = useState([]);
//     const dispatch = useDispatch();
    

//     useEffect(()=>{
//         productApi.getAll().then( res => {
//           if(res.statusText === 'OK'){
//             setProductData(res.data);
//           }
//         })
//       },[])

//       console.log(productData);
    
//     return (
//         <div className={`product-view__modal`}>
//             <div className="product-view__modal__content">
//                 <ProductView product={productData}/>
//                 <div className="product-view__modal__content__close">
//                     <Button
//                         size="sm"    
//                         onClick={() => dispatch(remove())}
//                     >
//                         Đóng
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductViewModal
