import { Link } from 'react-router-dom'

function NotFound() {

  return (
    <div className='home-container'>
      <h1 className="home-title">404: Page Not Found</h1>
      <Link to="/" className='home-button'>Back to Home Page</Link>
    </div>
  )
}

export default NotFound;