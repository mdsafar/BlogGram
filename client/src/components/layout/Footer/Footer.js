import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer" >
      <div className="footer-container">
      <div className="footer-section">
          <Link  to={'/'}>
            <span className="footer-link">Home</span>
          </Link>
        </div>
        <div className="footer-section">
          <Link  to={'/explore'}>
            <span className="footer-link">Explore</span>
          </Link>
        </div>
        <div className="footer-section">
          <Link  to={'/profile'}>
            <span className="footer-link">Profile</span>
          </Link>
        </div>
        <div className="footer-section">
          <Link  to={'/about'}>
            <span className="footer-link">About</span>
          </Link>
        </div>
        <div className="footer-section">
          <a href="https://instagram.com/iiamsafar">
            <span className="footer-link">Contact</span>
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <span className="copyright-text">©{new Date().getFullYear()} <span>BlogGram</span> by Safar</span>
      </div>
    </footer>
  )
}

export default Footer