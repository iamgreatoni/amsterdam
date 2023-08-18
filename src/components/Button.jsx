import React from 'react'

const Button = ({styles}) => {
  return (
    <button type="button" className={`py-4 px-6 bg-blue-gradient btn rounded-[10px] font-poppins font-medium text-[18px] text-primary outline-none mt-10 ${styles} `}>
      Get Started
    </button>
  )
}

export default Button