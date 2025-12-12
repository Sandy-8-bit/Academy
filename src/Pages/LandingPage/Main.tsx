import Layout from '../../Component/Layout/LandingLayout'
import Courses from './Courses';
import CertificationFAQ from './Faq';
import HeroSection from './HeroSection';
import { Usage } from './Usage';
import { StickyScrollRevealDemo } from './WhyweSpecial';

const Main = () => {
  return (
    <Layout>
      <HeroSection/>
      <Usage/>
      <StickyScrollRevealDemo/>
      {/* <Courses/> */}
      <CertificationFAQ/>
    </Layout>
  );
};

export default Main;
