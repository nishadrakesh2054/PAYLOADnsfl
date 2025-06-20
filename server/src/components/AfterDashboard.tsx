import React from 'react'
import '../style/custom.css'

const AfterDashboard: React.FC = () => {
  return (
    <footer className="dashboard-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-left">
            <p className="copyright">© 2024 NSFL. All Rights Reserved.</p>
          </div>
          <div className="footer-right">
            <nav className="footer-nav">
              <a href="#" className="footer-link">
                Privacy Policy
              </a>
              <a href="#" className="footer-link">
                Terms of Service
              </a>
              <a href="#" className="footer-link">
                Contact Support
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default AfterDashboard
