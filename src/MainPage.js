import axios from 'axios'
import React from 'react'
import {useNavigate} from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import "./App.css";
   

function MainPage() 
{
    const navigator = useNavigate()

    const [productsData,setProductsData] = React.useState([])
    
    React.useEffect(() => {
        axios.get('http://interviewapi.ngminds.com/api/getAllProducts')
        .then(response => {
            console.log(response.data.products)
            const temp = response.data.products.map((item,index) => {
                return {...item,count:0}
            })
            setProductsData(temp)
        })
        .catch(error => console.log(error))
    },[])

    const [selectedProductsData,setSelectedProductsData] = React.useState(JSON.parse(localStorage.getItem('productsData')) ? JSON.parse(localStorage.getItem('productsData')) : [])

    React.useEffect(() => {
        console.log(selectedProductsData)
        localStorage.setItem('productsData',JSON.stringify(selectedProductsData))
    },[selectedProductsData])

    const displayHandler = (e) => {
        console.log(e.target.value)
        if(e.target.value==='Low to High')
        {
            axios.get('http://interviewapi.ngminds.com/api/getAllProducts')
            .then(response => {
                console.log(response.data.products.sort(function (x, y) {
                    return x.price - y.price;
                }))
                const temp = response.data.products.map((item,index) => {
                    return {...item,count:0}
                })
                setProductsData(temp)
            })
            .catch(error => console.log(error))
        }
        else if(e.target.value==='High to Low')
        {
            axios.get('http://interviewapi.ngminds.com/api/getAllProducts')
            .then(response => {
                console.log(response.data.products.sort(function (x, y) {
                    return y.price - x.price;
                }))
                const temp = response.data.products.map((item,index) => {
                    return {...item,count:0}
                })
                setProductsData(temp)
            })
            .catch(error => console.log(error))
        }
        else
        {
            axios.get('http://interviewapi.ngminds.com/api/getAllProducts')
            .then(response => {
                console.log(response.data.products)
                const temp = response.data.products.map((item,index) => {
                    return {...item,count:0}
                })
                setProductsData(temp)
            })
            .catch(error => console.log(error))
        }
    }

    const [pageNumber,setPageNumber] = React.useState(0)
    const [dataPerPage,setDataPerPage] = React.useState(5)
    const pageVisited = pageNumber * dataPerPage

    const displayData = productsData.slice(pageVisited , pageVisited + dataPerPage).map((productItem,productIndex) => {
        let backGroundColor = ""
        if(productIndex%4===0)
        {
            backGroundColor="bg-info"
        }
        if(productIndex%4===1)
        {
            backGroundColor = "bg-success"
        }
        if(productIndex%4===2)
        {
            backGroundColor = "bg-warning"
        }
        if(productIndex%4===3)
        {
            backGroundColor = "bg-danger"
        }    

        return <div className={productIndex+1%4===0 ? "row" : ''} key={productIndex}>
            
            <div className="col-md-3">
                <div className={backGroundColor}>
                    <img src={`http://interviewapi.ngminds.com/${productItem.image}`} width="100" height="200" alt='' />
                    <br />
                    <div style={{height:'50px'}}>{productItem.name}</div>
                    <p><i className="fa fa-inr"></i>{productItem.price}</p>
                    <div className="btn btn-warning" onClick={() => {
                        let tempCount = 0
                        const a = selectedProductsData.map((item) => {
                            if(item.name === productItem.name)
                            {
                                tempCount++
                                return item
                            }
                            else
                            {
                                return item
                            }
                            })
                        console.log(tempCount)
                            
                        if(productItem.count===0 && tempCount!=1)
                        {
                            productItem.count = productItem.count + 1
                            setSelectedProductsData(prevValue => [...prevValue,{...productItem}])
                        }
                        else
                        {
                            const temp = selectedProductsData.map((item) => {
                                if(item.name === productItem.name)
                                {
                                    item.count = item.count + 1
                                    return item
                                }
                                else
                                {
                                    return item
                                }
                            })
                            setSelectedProductsData(temp)
                        }

                    }}>
                        Add to Cart
                    </div>
                </div>
            </div>

            {productIndex%4===3 && <div>.<hr /></div>}

        </div>
    })


    const pageCount = Math.ceil(productsData.length/dataPerPage)

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    const perPageHandler = (e) => {
        const a = parseInt(e.target.value)
        setDataPerPage(a)
     }

    /**Manual pagination */

    const ProductsDataPerPage = 5
    console.log(Math.ceil(productsData.length/5))
        
    const tempArray = Array(Math.ceil(productsData.length/ProductsDataPerPage)).fill(null)

    const displayDataOnSelectedPage = (index) => {
        console.log(index);
        const temp = productsData.filter((item,ind) => {
            if(ind >=index && ind<=index+ProductsDataPerPage)
            {
                return item
            }
        })
        console.log(temp)
        setProductsData(temp)
    }

    return (
        <div>
            <div className="container">
                <h1>
                    <a href="/">My Ecommerce Site</a>
                    <span className="pull-right" onClick={() => {navigator('/card')}}>Cart ({selectedProductsData.length})</span>
                </h1>

                <div className="row">
                    <div className="col-sm-12">
                        <div style={{margin: "25px 0"}}>
                            <label className="control-label">Sort by:</label>
                            <select name="" id="" onChange={(e) => displayHandler(e)}>
                                <option value="">Default</option>
                                <option value="High to Low">High to Low</option>
                                <option value="Low to High">Low to High</option>
                            </select>
                        </div>
                    </div>
                </div>

                <hr />

                {displayData}

            </div>

            <hr />

            <div className="row">
                <div className="col-sm-8">
                    <ReactPaginate 
                        previousLable={"previous"}
                        nextLable={"next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationButton"}
                        previousLinkClassName={"previousButton"}
                        nextLinkClassName={"nextButton"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                </div>
                <div className="col-sm-4 text-right">
                    <div style={{margin: "25px 0"}}>
                        <label className="control-label">Items Per Page:</label>
                        <select name="" id="" onChange={(e) => perPageHandler(e)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>
                <div className="col-sm-8">
                    <ul className="pagination">

                        <li className="page-item"><a className="page-link">Previous</a></li>

                        {
                            tempArray.map((item ,index)=> {
                                return <li className="page-item" key={index}><a className="page-link" onClick={() => displayDataOnSelectedPage(index)}>{index+1}</a></li>
                            })
                        }

                        <li className="page-item"><a className="page-link">Next</a></li>
                        
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default MainPage
