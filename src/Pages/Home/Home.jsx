import React from 'react';
import useAuth from '../../hooks/useAuth';
import Loading from '../../Component/Loading/Loading';
import HeroSection from '../../Component/HeroSection/HeroSection';
import BottomSection from '../../Component/BottomSection/BottomSection';
import ContactSection from '../../Component/ContactSection/ContactSection';
import StatsAndFAQ from '../../Component/StatsAndFAQ/StatsAndFAQ';
import FeaturedDonations from '../../Component/FeaturedDonations/FeaturedDonations';
import LatestCharityRequests from '../../Component/LatestCharityRequests/LatestCharityRequests';

const Home = () => {
    const { user } = useAuth();
    console.log(user);
    return (
        <div>
            <HeroSection />
            <BottomSection />
            <FeaturedDonations />
            <LatestCharityRequests/>
            <StatsAndFAQ/>
            <ContactSection/>
        </div>
    );
};

export default Home;