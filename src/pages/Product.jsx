import React,{useEffect,useState} from 'react'
import Helmet from '../components/Helmet'
import Section, {SectionBody, SectionTitle} from '../components/Section'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import ProductView from '../components/ProductView'
import productApi from '../Api/productApi'



const Product = props => {

    const [productData, setProductData] = useState([]);


    const relatedProducts = productData.slice(0,8);

    useEffect(()=>{
        productApi.getAll().then( res => {
          if(res.statusText === 'OK'){
            setProductData(res.data);
          }
        })
      
      },[])
      localStorage.setItem("add item",productData )

    React.useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    return (
        <Helmet title={productData.title}>
            <Section>
                <SectionBody>
                    <ProductView product={productData}/>
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>
                    Khám phá thêm
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            relatedProducts.map((item, index) => (
                                <ProductCard
                                    key={index}
                                    img01={item.image01}
                                    img02={item.image02}
                                    name={item.title}
                                    price={Number(item.price)}
                                    slug={item.slug}
                                />   
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default Product
