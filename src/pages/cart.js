import About from "../components/about";
import { Table, Input, InputNumber } from 'antd';
import { useState, useEffect } from "react";
import plus from '../images/plus.svg';
import chair from '../images/product-1.png';

function Cart(){
  const [value, setValue] = useState("");
  
  function onChangeValue(value){
    setValue(value)
  }

    const data = [
        {
        key: '1',
        image: chair,
        name: 'Nordic Chair',
        price: 150,
        quantity: 0,    
        },
        {
            key: '2',
            image: chair,
            name: 'Nordic Chair',
            price: 350,
            quantity: 0,    
        },
    ];

  const columns = [
    {
        title: 'image',
        dataIndex: 'image',
        width: '20%',
        render: theImageURL => <img alt={theImageURL} src={theImageURL} key={theImageURL} />
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '10%'
    },
    {
        title: 'price',
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price,
        width: "10%"
      },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      width: '20%',
      render: () => <InputNumber min={1} max={10} defaultValue={1} onChange={onChangeValue}/>
    },
    
    
    {
      title: 'Total',
      dataIndex: 'total',
      render: () => <p>{value}</p>
    },
    {
        title: 'Remove',
        dataIndex: 'remove',
        width: '5%',
        render: () => <img alt="Plus" src={plus} key="Plus"/>
    },
  ];
  
  
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
    return(
        <main className="carts">
            <About text="Cart"></About>
            <section className="cart">
                <Table columns={columns} dataSource={data} onChange={onChange} />
                <div className="buttons">
                    <p><button class="btn">Update Cart</button></p>
                    <p><button href="shop.html" class="btn">Continue Shopping</button></p>
                </div>
                <div className="total">
                    <div className="total_coupon">
                        <div className="total_coupon--text">
                            <h1>Coupon</h1>
                            <h3>Enter coupon number if you have one!</h3>
                        </div>
                        <div className="total_coupon--form">
                            <Input placeholder="Coupon Code" className="totalInput" />
                            <p><button class="btn">Apply Coupon</button></p>
                        </div>
                    </div>
                    <div className="total_amount">
                        <div className="total_amount-header">
                            <h1>Cart Total</h1>
                        </div>

                        <div className="total_amount-body">
                            <span>
                                <h3>Subtotal</h3>
                                <h1>$230.00</h1>
                            </span>
                            <span>
                                <h3>Total</h3>
                                <h1>$250.00</h1>
                            </span>
                        </div>
                        <div><p><button class="btn">Proceed to Checkout</button></p></div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Cart;