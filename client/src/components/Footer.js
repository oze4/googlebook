import React from 'react';
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <Link className='button' to='/'>Home</Link>
            <Link className='button' to='/saved'>Saved</Link>
        </footer>
    )
}

export default Footer;