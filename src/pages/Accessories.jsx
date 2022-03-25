import React, { useCallback, useState, useEffect, useRef } from 'react'
import colorsApi from '../Api/colorsApi';
import Helmet from '../components/Helmet';
import CheckBox from '../components/CheckBox';
import Button from '../components/Button';
import categoryAccessoryApi from '../Api/categoryAccessoryApi';
import accessoryApi from '../Api/accessoryApi';
import AccessoryList from '../components/accessoryList';

const Accessories = () => {
    const [productAccessoryData, setProductAccessoryData] = useState([]);
    const [categoryAccessoryData, setCategoryAccessoryData] = useState([]);
    const [colorData,setColorData] = useState([]);
    useEffect(()=>{
        accessoryApi.getAll().then( res => {
          if(res.statusText === 'OK') {
            setProductAccessoryData(res.data);
          }
        })
        colorsApi.getAll().then(res => {
            if(res.statusText ==='OK') {
                setColorData(res.data);
            }
        })
        categoryAccessoryApi.getAll().then(res => {
            if(res.statusText === 'OK') {
                setCategoryAccessoryData(res.data);
            }
        })

      },[])


    const initFilter = {
        category: [],
        color: [],
    }

    const productList = productAccessoryData;

    const [products, setProducts] = useState(productList)

    const [filter, setFilter] = useState(initFilter)

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch(type) {
                case "CATEGORY":
                    setFilter({...filter, category: [...filter.category, item.categoryslug]})
                    break
                case "COLOR":
                    setFilter({...filter, color: [...filter.color, item.color]})
                    break
                default:
            }
        } else {
            switch(type) {
                case "CATEGORY":
                    const newCategory = filter.category.filter(e => e !== item.categoryslug)
                    setFilter({...filter, category: newCategory})
                    break
                case "COLOR":
                    const newColor = filter.color.filter(e => e !== item.color)
                    setFilter({...filter, color: newColor})
                    break
                default:
            }
        }
    }

    const clearFilter = () => setFilter(initFilter)

    const updateProducts = useCallback(
        () => {
            let temp = productList

            if (filter.category.length > 0) {
                temp = temp.filter(e => filter.category.includes(e.categoryslug))
            }

            if (filter.color.length > 0) {
                temp = temp.filter(e => {
                    const check = e.colors.find(color => filter.color.includes(color))
                    return check !== undefined
                })
            }

            setProducts(temp)
        },
        [filter, productList],
    )

    useEffect(() => {
        updateProducts()
    }, [updateProducts])

    const filterRef = useRef(null)

    const showHideFilter = () => filterRef.current.classList.toggle('active')

    return (
        <Helmet title="Sản phẩm">
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Danh mục sản phẩm
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                categoryAccessoryData.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("CATEGORY", input.checked, item)}
                                            checked={filter.category.includes(item.categoryslug)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Màu sắc
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                colorData.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("COLOR", input.checked, item)}
                                            checked={filter.color.includes(item.color)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button size="sm" onClick={clearFilter}>Xóa bộ lọc</Button>
                        </div>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={() => showHideFilter()}>Bộ lọc</Button>
                </div>
                <div className="catalog__content">
                    <AccessoryList
                        data={products}
                    />
                </div>
            </div>
        </Helmet>
    )
}

export default Accessories