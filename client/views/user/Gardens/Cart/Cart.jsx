import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartSelector } from '../../../../slices/cart'

const Cart = () => {
  const cart = useSelector(cartSelector)
  const dispatch = useDispatch()
  console.log(cart)
  return (
    <>
      {/* entire page div */}
      <div className="flex flex-col items-center mt-12">
        {/* cotainer for bag and button */}
        <div className="flex flex-col w-6/12 items-center ">
          {/* mybag div starts here */}

          <div className="shadow-lg rounded-lg w-full ">
            {/* mybag header div */}
            <div className="flex flex-row items-center border-b-2 justify-between px-10">
              <h2 className=" p-5 pb-8 text-2xl font-bold">My Bag</h2>
              <button className="w-7 h-7 rounded-full  border-solid border-2 border-grey text-gray-500  ">
                X
              </button>
            </div>
            {/* mybag header div ends here */}

            {/* small mixed box div */}
            <div className="flex flex-row p-6 border-b-2 justify-between">
              <img
                className="w-2/12 h-auto mr-8 shadow-2xl"
                src="/images/comGardenPlant.png"
                alt="basket images"
              />
              {/* top and bottom container */}
              <div className="flex flex-col  w-full">
                {/* top box of small mixed bag div */}
                <div className="flex flex-row justify-between px-10 mt-8 mb-4">
                  <h3 className="text-xl font-bold">
                    Small Mixed Box Thursday
                  </h3>
                  <button className="w-7 h-7 rounded-full  border-solid border-2 border-grey text-gray-500 ">
                    X
                  </button>
                </div>
                {/* top box of small mixed bag div  ends*/}
                {/* bottom box of small mixed bag div */}
                <div className="flex flex-row justify-between px-10">
                  <h3 className="text-xl font-bold">$49</h3>
                  {/* button div */}
                  <div className=" justify-end border-solid border border-gray-400">
                    <button className="w-1/4"> + </button>
                    <input
                      className="w-2/4 border-solid border-x border-gray-400 placeholder:text-black text-center"
                      placeholder="1"
                    ></input>
                    <button className="w-1/4"> - </button>
                  </div>
                  {/* button div ends */}
                </div>
                {/* bottom box of small mixed bag div */}
              </div>
              {/* top and bottom container ends */}
            </div>
            {/* small mixed bag div ends here */}
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
              <p>
                I have read and agree with the terms of your delivery service.
              </p>
            </div>
          </div>

          {/* mybag div ends here */}
          <button className="self-end">Checkout</button>
        </div>
      </div>
    </>
  )
}

export default Cart
