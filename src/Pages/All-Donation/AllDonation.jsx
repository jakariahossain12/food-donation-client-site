import React from 'react';
import DonationCard from '../../Component/DonationCard/DonationCard';

const AllDonation = () => {
    return (
        <div className='grid grid-cols-4 justify-center items-center'>
            <DonationCard></DonationCard>
        </div>
    );
};

export default AllDonation;