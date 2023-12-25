
import { Outlet } from 'react-router-dom'
import '../../Dash.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const Dashboard = () => {



  return (
    <div className=' dash'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Dashboard