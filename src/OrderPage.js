import axios from 'axios'
import React from 'react'
import {useNavigate,useLocation} from 'react-router-dom'

function OrderPage() 
{
    const navigator = useNavigate()

    const [productsData,setProductsData] = React.useState([])

    React.useEffect(() => {
        const temp = localStorage.getItem('productsData')
        const temp1 = JSON.parse(temp)
        console.log(temp1)
        setProductsData(temp1)        
    },[])

    const [name,setName] = React.useState('')
    const [address,setaddress] = React.useState('')

    const nameHandler = (e) => {
        setName(e.target.value)
    }

    const addressHandler = (e) => {
        setaddress(e.target.value)
    }

    const object1 = productsData.map(item => {
        return {
            productID:item._id,
            qty: item.count,
            price: item.price,
            total: item.count*item.price
        }
    })

    const orderHandler = () =>{
        const object = {
            personName: name,
            deliveryAddress: address,
            productsOrdered: object1
        }
        axios.post(' http://interviewapi.ngminds.com/api/placeOrder',object)
        .then(res => console.log((res)))
        .catch(error => console.log(error))
    }



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
                                Place Order
                            </div>
                            <div className="panel-body">
                                <form className="form-horizontal" role="form">
                                    <table className="table table-striped">
                                        <thead className="table-head">
                                            <tr>
                                                <td>Product Name</td>
                                                <td> Quntity</td>
                                                <td> SubTotal</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                productsData.map((productItem,productIndex) => {
                                                    return <tr key={productIndex}>
                                                            <td>{productItem.name}</td>
                                                            <td>{productItem.count}</td>
                                                            <td><i className="fa fa-inr"></i>{productItem.price*productItem.count}</td>
                                                        </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <br />
                                    <br />
                                    <div className="form-group">
                                        <label htmlFor="inputName3" className="col-sm-2 control-label">Enter Order Details</label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputName3" className="col-sm-2 control-label">Name</label>
                                        <div className="col-sm-6">
                                            <input className="form-control" id="inputName3" placeholder="Name" onChange={(e) => nameHandler(e)}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputEmail3" className="col-sm-2 control-label">Address</label>
                                        <div className="col-sm-6">
                                            <textarea className="form-control" id="inputEmail3" placeholder="Deliver Address" onChange={(e) => addressHandler(e)}></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label"></label>
                                        <div className="col-sm-6">
                                            <a className="btn btn-warning" onClick={() => orderHandler()}>Confirm Order</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderPage
