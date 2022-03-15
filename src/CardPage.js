import React from 'react'
import {useNavigate,useLocation} from 'react-router-dom'

function CardPage() 
{
    const navigator = useNavigate()

    const [productsData,setProductsData] = React.useState([])

    React.useEffect(() => {
        const temp = localStorage.getItem('productsData')
        const temp1 = JSON.parse(temp)
        console.log(temp1)
        setProductsData(temp1)        
    },[]) 

    const [amount,setAmount] = React.useState(0)

    React.useEffect(() => {
        let sum = 0
        const temp = productsData.map(item => {
            sum = parseInt(sum) + parseInt(item.price*item.count)
            return item
        })
        setAmount(sum)
    },[productsData]) 

    const dec = (index) => {
        const temp = productsData.map((item,i) => {
            if(i === index && item.count >= 2)
            {
                item.count = item.count - 1
                return item
            }
            else
            {
                return item
            }
            
        })
        setProductsData(temp)
    }

    const inc = (index) => {
        const temp = productsData.map((item,i) => {
            if(i === index)
            {
                item.count = item.count + 1
                return item
            }
            else
            {
                return item
            }
            
        })
        setProductsData(temp)
    }

    const remove = (index) => {
        const temp = productsData.filter((item,i) => {
            if(i !== index)
            {
                return item
            }
            
        })
        setProductsData(temp)
    }

    const changeHandler = (e) => {
        // console.log(e.target.value)
    }
    
    
    const display = productsData.map((productsItem,productsIndex) => {
            return <div key={productsIndex}>
                <div className="row">
                    <div className="col-md-3"> 
                        <img src={`http://interviewapi.ngminds.com/${productsItem.image}`} width="100px" height="200px" alt='' />
                    </div>
                    <div className="col-md-3"> {productsItem.name}
                        <br /><i className="fa fa-inr"></i>{productsItem.price}
                    </div>
                    <div className="col-md-3"> quantity
                        <br />
                        <button onClick={() => dec(productsIndex)}>-</button>
                        <input ng-model="qty" type='text' name='quantity' className='qty' size="5px" value={productsItem.count} onChange={(e) => {changeHandler(e)}} />
                        <button onClick={() => inc(productsIndex)}>+</button>
                    </div>
                    <div className="col-md-3"> 
                        <a className="btn btn-warning" onClick={() => remove(productsIndex)}>remove</a>
                    </div>
                </div>
            </div>
        }
    )

    React.useEffect(() => {
        localStorage.setItem('productsData',JSON.stringify(productsData))
    },[productsData])

    return (
        <div>
            <div className="container">
                <div className="row">

                    <h1>

                        <a onClick={() => {navigator('/')}}>My Ecommerce Site</a>
                        
                        <span className="pull-right">
                            <a onClick={() => {navigator('/card')}}>Cart ({productsData.length})</a>
                        </span>

                    </h1>

                    <hr />

                    <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                MY CART ({productsData.length})
                            </div>
                            <div className="panel-body">
                                
                                {display}  
                                
                                <hr />

                                <div className="row">
                                    <div className="col-md-9">
                                        <label className="pull-right">Amount Payable</label>
                                    </div>
                                    <div className="col-md-3 ">
                                        {amount}
                                    </div>
                                </div>

                            </div>
                            <div className="panel-footer">
                                <a className="btn btn-success" onClick={() => {navigator('/')}}>Continue Shopping</a>
                                <a className="pull-right btn btn-danger" onClick={() => {navigator('/order')}}>Place Order</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CardPage
