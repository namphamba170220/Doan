import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "../../components/Button/Button";
import Helmet from "../../components/Helmet/Helmet";
import InfinityList from "../../components/infinity/InfinityList";
import CheckBox from "../../components/Checkbox/CheckBox";
import categoryApi from "../../Api/categoryApi";
import productApi from "../../Api/productApi";
import colorsApi from "../../Api/colorsApi";
import versionApi from "../../Api/versionApi";
import ReactLoading from "react-loading";
const Catalog = () => {
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [versionData, setVersionData] = useState([]);
  const [done, setDone] = useState(undefined);
  useEffect(() => {
    setTimeout(() => {
      productApi.getAll().then((res) => {
        if (res.statusText === "OK") {
          setProductData(res.data);
        }
      });
      categoryApi.getAll().then((res) => {
        if (res.statusText === "OK") {
          setCategoryData(res.data);
        }
      });
      colorsApi.getAll().then((res) => {
        if (res.statusText === "OK") {
          setColorData(res.data);
        }
      });
      versionApi.getAll().then((res) => {
        if (res.statusText === "OK") {
          setVersionData(res.data);
        }
      });
      setDone(true);
    }, 2000);
  }, []);

  const initFilter = {
    category: [],
    color: [],
    version: [],
  };

  const productList = productData;

  const [products, setProducts] = useState(productList);

  const [filter, setFilter] = useState(initFilter);

  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilter({
            ...filter,
            category: [...filter.category, item.categoryslug],
          });
          break;
        case "COLOR":
          setFilter({ ...filter, color: [...filter.color, item.color] });
          break;
        case "VERSION":
          setFilter({ ...filter, version: [...filter.version, item.version] });
          break;
        default:
      }
    } else {
      switch (type) {
        case "CATEGORY":
          const newCategory = filter.category.filter(
            (e) => e !== item.categoryslug
          );
          setFilter({ ...filter, category: newCategory });
          break;
        case "COLOR":
          const newColor = filter.color.filter((e) => e !== item.color);
          setFilter({ ...filter, color: newColor });
          break;
        case "VERSION":
          const newVersion = filter.version.filter((e) => e !== item.version);
          setFilter({ ...filter, version: newVersion });
          break;
        default:
      }
    }
  };

  const clearFilter = () => setFilter(initFilter);

  const updateProducts = useCallback(() => {
    let temp = productList;

    if (filter.category.length > 0) {
      temp = temp.filter((e) => filter.category.includes(e.categoryslug));
    }

    if (filter.color.length > 0) {
      temp = temp.filter((e) => {
        const check = e.colors.find((color) => filter.color.includes(color));
        return check !== undefined;
      });
    }

    if (filter.version.length > 0) {
      temp = temp.filter((e) => {
        const check = e.version.find((version) =>
          filter.version.includes(version)
        );
        return check !== undefined;
      });
    }

    setProducts(temp);
  }, [filter, productList]);

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);

  const filterRef = useRef(null);

  const showHideFilter = () => filterRef.current.classList.toggle("active");

  return (
    <Helmet title="Sản phẩm">
      {!done ? (
        <div className="loading">
          <ReactLoading
            type={"bubbles"}
            color={"blue"}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <div className="catalog">
          <div className="catalog__filter" ref={filterRef}>
            <div
              className="catalog__filter__close"
              onClick={() => showHideFilter()}
            >
              <i className="bx bx-left-arrow-alt"></i>
            </div>
            <div className="catalog__filter__widget">
              <div className="catalog__filter__widget__title">
                Danh mục sản phẩm
              </div>
              <div className="catalog__filter__widget__content">
                {categoryData.map((item, index) => (
                  <div
                    key={index}
                    className="catalog__filter__widget__content__item"
                  >
                    <CheckBox
                      label={item.display}
                      onChange={(input) =>
                        filterSelect("CATEGORY", input.checked, item)
                      }
                      checked={filter.category.includes(item.categoryslug)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="catalog__filter__widget">
              <div className="catalog__filter__widget__title">Màu sắc</div>
              <div className="catalog__filter__widget__content">
                {colorData.map((item, index) => (
                  <div
                    key={index}
                    className="catalog__filter__widget__content__item"
                  >
                    <CheckBox
                      label={item.display}
                      onChange={(input) =>
                        filterSelect("COLOR", input.checked, item)
                      }
                      checked={filter.color.includes(item.color)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="catalog__filter__widget">
              <div className="catalog__filter__widget__title">Phiên bản</div>
              <div className="catalog__filter__widget__content">
                {versionData.map((item, index) => (
                  <div
                    key={index}
                    className="catalog__filter__widget__content__item"
                  >
                    <CheckBox
                      label={item.display}
                      onChange={(input) =>
                        filterSelect("VERSION", input.checked, item)
                      }
                      checked={filter.version.includes(item.version)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="catalog__filter__widget">
              <div className="catalog__filter__widget__content">
                <Button size="sm" onClick={clearFilter}>
                  Xóa bộ lọc
                </Button>
              </div>
            </div>
          </div>
          <div className="catalog__filter__toggle">
            <Button size="sm" onClick={() => showHideFilter()}>
              Bộ lọc
            </Button>
          </div>
          <div className="catalog__content">
            <InfinityList data={products} />
          </div>
        </div>
      )}
    </Helmet>
  );
};

export default Catalog;
