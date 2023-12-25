import { Link } from 'react-router-dom';
import bgFooter from '../assets/images/footer.png'


const Footer = () => {
  return (
    <div style={{backgroundImage: `url(${bgFooter})`}} className='p-10 bg-cover bg-center bg-no-repeat text-[#24275a] dark:text-[#ffffff] dark:bg-[#210d4bcf] font-lora' >
      <footer className="footer" >
      <div>
        <span className="footer-title">Services</span>
        <Link to='/' className="link link-hover">Branding</Link>
        <Link to='/' className="link link-hover">Design</Link>
        <Link to='/' className="link link-hover">Marketing</Link>
        <Link to='/' className="link link-hover">Advertisement</Link>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <Link to='/' className="link link-hover">About us</Link>
        <Link to='/' className="link link-hover">Contact</Link>
        <Link to='/' className="link link-hover">Jobs</Link>
        <Link to='/' className="link link-hover">Press kit</Link>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <Link to='/' className="link link-hover">Terms of use</Link>
        <Link to='/' className="link link-hover">Privacy policy</Link>
        <Link to='/' className="link link-hover">Cookie policy</Link>
      </div>
    </footer>

    <div>
      <p className='text-center pt-5 font-bold'>Copyright &copy; {new Date().getFullYear()}. all rights reserved.</p>
    </div>
    </div>
  )
}

export default Footer