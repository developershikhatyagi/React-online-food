import { Link } from 'react-router-dom';
import { CartContext } from '../Pages/CartContext';
import { useContext } from 'react';

const Navigation = () => {

  const {cart} = useContext(CartContext);

  const cartStyle = {
    background: '#F59E0D',
    display: 'flex',
    padding: '6px 12px',
    borderRadius: '50px',
  }

  
  return (
    <>
      <nav className='container max-auto flex items-center justify-between py-4 m-auto p-5'>
        <Link to='/'>
          <img style={{ height: 45 }} src="/images/logo.png" alt="logo" />
        </Link>
        <ul className='flex items-center'>
          <li className='hover:text-[#f59e0d] hover:animate-bounce '><Link to='/'>Home</Link></li>
          <li className='ml-6 hover:text-[#f59e0d] hover:animate-bounce '><Link to='/products'>Products</Link></li>
          <li className='ml-6 hover:animate-bounce '>
            <Link to='/cart'>
              <div style={cartStyle}>
                <span>{cart.totalItems ? cart.totalItems : 0 }</span>
                <img className='ml-2' src="/images/cart.png" alt="cart-icon" />
              </div>
            </Link> 
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navigation;
