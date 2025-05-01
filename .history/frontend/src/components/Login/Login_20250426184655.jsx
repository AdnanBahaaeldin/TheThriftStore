import * as React from 'react';
import logo from '../../assets/logo4.png'; 




export default function Login(){
    return(
        <div className="flex min-h-screen  items-center justify-center bg-gray-100">

            

            <div className= 'px-10 py-14 rounded-3xl bg-white'>
                <h1 className='text-5xl font-bold'>Welcome to our <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#2cada0] to-[#115e59]'>store</span></h1>
                <p className='font-medium text-lg text-gray-500 mt-4 mb-7 text-center'>The only store you need</p>
                

                <div> 
                    <label className='text-lg font-medium'>Email</label>
                    <input className='w-full border-2 rounded-xl p-4 mt-1 border-gray-150'
                    placeholder='Enter your email'
                    type='email'
                    />

                </div>

                <div className='mt-8'> 
                    <label className='text-lg font-medium'>Password</label>
                    <input className='w-full border-2 rounded-xl p-4 mt-1 border-gray-150'
                    placeholder='atleast 4 characters'
                    type='password'
                    />

                </div>

                <div className='flex flex-col mt-20'>
                    <button className='text-lg font-bold text-white py-4 rounded-3xl active:scale-[.98] ease-in-out hover:scale-[1.01]' style={{ backgroundColor: '#2cada0' }}>Login</button>
                </div>

                <div>
                    <p className='text-center text-gray-500 mt-4'>Don't have an account? <button className='text-black font-bold mt-4' style={{ color: '#2cada0' }}>Sign up</button></p>
                </div>

            </div>

            {/* Logo Section */}
            <div className='hidden lg:flex h-full '>
                
             <img src={logo} alt="Store Logo" className='' />

            </div>

        </div>

    )
}