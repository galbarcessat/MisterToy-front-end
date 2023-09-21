

import { UserMsg } from './UserMsg.jsx'
import { ShoppingCart } from './ShoppingCart.jsx'
import { SET_CART_IS_SHOWN } from '../store/reducers/car.reducer.js'
import { useDispatch, useSelector } from 'react-redux'

export function AppFooter() {

    const dispatch = useDispatch()
    const isCartShown = useSelector(storeState => storeState.carModule.isCartShown)
    const count = useSelector(storeState => storeState.userModule.count)
    const carsCount = useSelector(storeState => storeState.carModule.cars.length)
    const shoppingCart = useSelector(storeState => storeState.carModule.shoppingCart)

    return (
        <footer>
            <h5>
                Currently {carsCount} cars in the shop
            </h5>
            <p>
                Coffeerights to all - Count: {count}
            </p>
            {
                <h5>
                    <span>{shoppingCart.length}</span> Products in your Cart
                    <a href="#" onClick={(ev) => {
                        ev.preventDefault()
                        dispatch({ type: SET_CART_IS_SHOWN, isCartShown: !isCartShown })

                    }}>
                        ({(isCartShown) ? 'hide' : 'show'})
                    </a>
                </h5>
            }

            <ShoppingCart isCartShown={isCartShown} shoppingCart={shoppingCart} />
            <UserMsg />
        </footer>
    )
}
