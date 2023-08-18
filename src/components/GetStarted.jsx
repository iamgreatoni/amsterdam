import React from 'react'
import styles from '../style'
import { arrowUp } from '../assets' 

const GetStarted = () => {
  return (
    <div className={`${styles.flexCenter} sm:w-[160px] sm:h-[160px] w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}>
      <div className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}>
        <div className={`${styles.flexStart} flex-col`}>
          <p className="font-poppins flex flex-row font-medium text-[18px] leading-[23px]">
            <span className="text-gradient">Get</span> 
            <img src={arrowUp} alt="arrow-up" className="w-[23px] h-[23px] object-contain"/>
          </p>
          <span className="text-gradient">Started</span>
        </div>
      </div>
    </div>
  )
}

export default GetStarted