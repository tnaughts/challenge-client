import React from 'react'
import {Link} from 'react-router-dom'
import './Banner.css'

export default () => (
    <div className="banner">
        <Link to="/" className="banner-link">
          <h2>
            Review Trackers
          </h2>
        </Link>
    </div>
)
