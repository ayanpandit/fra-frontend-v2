import Navbar from "./components/navbar";
import Hero2 from "./components/hero2";
import SplitScreen from "./components/splitscreen";
import AwardsServices from "./components/impactcards";
import ProjectsShowcase from "./components/projectsshowcase";
import GallerySection from "./components/gallerysection";
import TestimonialsSection from "./components/testimonialssection";
import BlogSection from "./components/blogsection";

import HowItWorks from "./components/howItworks";
import FAQSection from "./components/faqsection";

import FooterContact from "./components/footercontact";


export default function App() {
	return (
		<>
			<Navbar />
			<Hero2 />
			<SplitScreen />
			<AwardsServices />
			<ProjectsShowcase />
			<GallerySection />
			<TestimonialsSection />
			<BlogSection />
			
			<HowItWorks />
			<FAQSection />
			
			<FooterContact />
		</>
	);
}
