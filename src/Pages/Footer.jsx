import React from 'react'

function Footer() {
  return (
    <footer className='bg-[#090314] text-white py-6'>
      <div className=' mx-auto flex flex-row items-center justify-center'>
        <h1 className='text-center text-l font-boldonse'>
          Made By @
        </h1>
        {" "}
        <a
          href="https://github.com/yashsrivasta7a" className='text-purple-400 font-boldonse  hover:underline'
        >
          Yash Srivasta7a
        </a>
      </div>
    </footer>
  )
}

export default Footer