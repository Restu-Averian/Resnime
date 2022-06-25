import React, {  useEffect, useState } from 'react';
import { Link, Outlet, useNavigate} from 'react-router-dom';
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from 'firebase/auth'
import { app } from '../components/Firebase/firebase';
function Navbar() {
    const [search,setSearch] = useState("")
    const [searchFin,setSearchFin] = useState("")
    let navigate = useNavigate()

    const auth = getAuth(app)
    let [isUserSignedIn,setUserSignerdIn] = useState(true)
    
    useEffect(
        ()=>{
            onAuthStateChanged(auth, async user => {
                // Check for user status
                console.log("data user from navbar : ",user)
                if(user){ 
                  await setUserSignerdIn(true)
                }else{
                   await setUserSignerdIn(false)
                }
            });
        },[auth, isUserSignedIn]
    )
    const searchAnime = (e)=>{
        e.preventDefault();
        setSearchFin(search)
        setSearch("")
        navigate(`/search`)
    }

    const SignInWithFirebaseGoogle = ()=>{    
        let google_provider = new GoogleAuthProvider()
        signInWithPopup(auth, google_provider)
        .then(
            (res)=>{
                console.log(res)
                const credential = GoogleAuthProvider.credentialFromResult(res);
                const token = credential.accessToken;
                console.log(token)
                navigate("/")
            }
        )

    }
   
    const SignOut = ()=>{
        signOut(auth).then(
            ()=>{
                console.log("logout successfull")
            }
        )
        setUserSignerdIn(false)
        navigate("/")
    }
    

    const moveTo =(destination)=>{
        navigate(`/${destination}`)

    }
    return (
        <>
            <div className='bg-blue-500 text-white w-full sticky top-0 z-10'>
                <div className='container flex justify-between mx-auto'>
                    <div className='flex space-x-5'>
                        <Link to="/" className='py-5'>Home</Link>
                        <div onClick={()=>moveTo('popular')} className='py-5 cursor-pointer'>Popular</div>
                        <div onClick={()=>moveTo('top_airing')} className='py-5 cursor-pointer'>Top Airing</div>
                        <div onClick={()=>moveTo('movies')} className='py-5 cursor-pointer'>Movies</div>
                    </div>
                    <form onSubmit={searchAnime} className="my-3">
                        <input type="text" placeholder='Search Anime' 
                        className='border w-full text-black text-center px-4 py-2 border-gray-300 focus:outline-0' 
                        value={search}  onChange={(e)=>setSearch(e.target.value)}/>
                    </form>

                    {isUserSignedIn?(
                        <button onClick={SignOut}>
                            Logout
                        </button>
                    ):(
                        <button onClick={SignInWithFirebaseGoogle}>
                            Login
                        </button>
                    )}
                    

                </div>
            </div>
            <div className='container mx-auto'>
                <Outlet context={
                        {
                            searchFin,isUserSignedIn
                        }
                        }/>
            </div>

        </>
    );
}

export default Navbar;