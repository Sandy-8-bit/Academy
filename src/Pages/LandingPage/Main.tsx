import Layout from "../../Component/Layout/LandingLayout";
import CoursesSection from "./CoursesSection";
import CtaSection from "./Cta";
import CertificationFAQ from "./Faq";
import HeroSection from "./HeroSection";
import Testimonial from "./Testimonial";
import { Usage } from "./Usage";
import { WhyChooseUs } from "./WhyChooseUs";

const Main = () => {
  return (
    <Layout>
      <HeroSection />
      <Usage />
      <WhyChooseUs />
      <CoursesSection />
      <Testimonial />
      <CertificationFAQ />
      <div className="md:px-20 md:py-5 px-4 bg-white py-10">
        <CtaSection />
      </div>
    </Layout>
  );
};

export default Main;
