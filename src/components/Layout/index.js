import './index.css'
import blob from '../../images/blob.png';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className='app'>
            <img className='blob-left' src={blob} alt=''/>
            <img className='blob-right' src={blob} alt=''/>
            <Outlet />
        </div>
    )
}

export default Layout;