import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartSelector } from '../../../../slices/cart'

const Cart = () => {
  const cart = useSelector(cartSelector)
  const dispatch = useDispatch()
  console.log(cart)
  return (
    <>
      <div className="shadow-lg rounded-lg">
        <h2> My Bag</h2>
        {/* mixed box div */}
        <div>
          <img></img>
          <h3>Small Mixed Box Thursday</h3>
          <h3>$49</h3>
          <button> + </button>
          <input placeholder="1"></input>
          <button> - </button>
        </div>
        <div>
          <p>Add a delivery message</p>
          <button> + </button>
        </div>
        <div>
          <p>Shipping</p>
          <p> Calculated at Checkout</p>
        </div>
        <div>
          <p>
            <span>Grand total</span> (inc.tax)
          </p>
          <p>$100 NZD</p>
        </div>
        <div>
          <input type="checkbox"></input>
          <p>I have read and agree with the terms of your delivery service.</p>
        </div>
      </div>
      <button>Checkout</button>
    </>
  )
}

export default Cart
