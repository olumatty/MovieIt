import React,{} from 'react'
import logo from '../src/assets/moveit.svg'
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../src/context/AuthContext';



const Header = () => {
    const location = useLocation()
    const Navigate = useNavigate();

    const {logout} = React.useContext(AuthContext);

    const handleMovieSwitch = () => {
        if (location.pathname !== "/movie") {
          Navigate("/movie");
        }
    }

    const handleTvSeriesSwitch = () => {
        if (location.pathname !== "/tvseries") {
          Navigate("/tvseries");
        }
    }

    const handleHomeSwitch = () => {
        if (location.pathname !== "/home") {
          Navigate("/home");
        }
    }

    const handleLogout = () => {
        try{
          logout();
        }catch(error){
          console.error('Logout failed', error);
        }
        Navigate("/");
      }

  return (
    <div className='md:py-[16px] py-[14.5px]  fixed top-0 left-0 w-full z-10 transition-all duration-50'>
        <nav className='max-w-[1140px] mx-auto md:px-8 sm:px-6 px-4 xl:px-0 flex flex-row justify-between items-center'>
            <div className='flex flex-row gap-3 items-center'>
                <img src={logo} alt="logo" className='w-[40px] h-[40px]' />
                <h1 className='text-gray-800 cursor-pointer font-extrabold sm:leading-[1.2] leading-snug sm:max-w-[420px] max-w-[280px]'>MoveIt</h1>
            </div>

            <div className='flex items-center space-x-4'>
            <button 
                    className ={`px-4 py-2 font-semibold cursor-pointer transition-colors duration-200
                    ${location.pathname === "/home" ? "text-gray-800 border-b-2 border-black": "text-gray-500 hover:text-black border-b-2 border-transparent" }`}
                    onClick={handleHomeSwitch}
                >
                    Home
                </button>

                <button 
                    className ={`px-4 py-2 font-semibold cursor-pointer transition-colors duration-200
                    ${location.pathname === "/movie" ? "text-gray-800 border-b-2 border-black": "text-gray-500 hover:text-black border-b-2 border-transparent" }`}
                    onClick={handleMovieSwitch}
                >
                    Movies
                </button>

                <button className={`px-4 py-2 font-semibold cursor-pointer transition-colors duration-200
                      ${location.pathname === "/tvseries" ? "text-gray-800 border-b-2 border-black": "text-gray-500 hover:text-black border-b-2 border-transparent" }
                    `}
                onClick ={handleTvSeriesSwitch}  
                >
                   TvSeries
                </button>

                <div className='flex items-center'>
                <button 
                    className='text-shadow-gray-800 px-4 py-2 font-semibold cursor-pointer transition-colors duration-200'
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            </div>

            
        </nav>
        
      
    </div>
  )
}

export default Header
