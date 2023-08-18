import {useState} from 'react'

import {logo, close, menu} from '../assets'
import {navLinks} from '../constants'

const Navbar = () => {
  const [toggle, setToggle] = useState(false)

  return (
    <nav className='w-full flex py-6 justify-center items-center'>
      <img src={logo} alt="logo" className= 'w-[124px] h-[32]'/>

      <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] feature-card p-4 rounded-[20px] text-white ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}`}
          >
            <a href={`#${nav.id}`}>
              {nav.title}
            </a>
          </li>
        ))};
      </ul>

      <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img src={toggle ? close : menu}
               alt="menu" 
               className='w-[24px] h-[24px] object-contain' 
               onClick={() => setToggle((prev)=> !prev)}
            />
      </div>

      <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-16 right-0 mx-6 my-2 min-w-[140px] rounded-xl sidebar`}>
        <ul className='list-none flex flex-col justify-end items-center flex-1'>
          {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${index === navLinks.length - 1 ? 'mr-0' : 'mb-4'}`}
            >
              <a href={`#${nav.id}`}>
                {nav.title}
              </a>
            </li>
          ))};
        </ul>
      </div>

      
    </nav>
  )
}

export default Navbar