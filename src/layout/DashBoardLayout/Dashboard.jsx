
import { Outlet } from 'react-router-dom'
import '../../Dash.css'

const Dashboard = () => {



  return (
    <div className=' dash'>
      <Outlet />
    </div>
  )
}

export default Dashboard