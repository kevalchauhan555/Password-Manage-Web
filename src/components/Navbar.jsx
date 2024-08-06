/* eslint-disable no-unused-vars */
import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white h-20'>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-20">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-700">&lt;</span>
            Pass
          <span className="text-green-700">OP/ &gt;</span>
            
        </div>
        <button className='text-white bg-green-900 my-5 rounded-full flex justify-between item-center'>
          <img className='invert p-1 w-10' src="/image/github.png" alt="git gub png"/>
          <span className='font-bold px-2 mt-2'>GitHub</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
