import React from 'react';
import BackButton from '../components/BackButton';
import FavouritesComp from '../components/FavouritesComp'
function Favourites(props) {
    return (
        <div className='container mx-auto px-5 flex flex-col space-y-10'>
            <div className='mt-10'>
                <BackButton />
            </div>
            <div className=' card'>
                <h1 className='text-4xl font font-semibold mb-4 hp:text-2xl sm:text-3xl'>Favourites</h1>
                <div className='line'></div>
                <FavouritesComp />
            </div>
        </div>
    );
}

export default Favourites;