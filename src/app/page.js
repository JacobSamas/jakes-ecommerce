import HeroSection from './components/HeroSection';
import FeaturedCategories from './components/FeaturedCategories';
import FeaturedProducts from './components/FeaturedProducts';
import PromotionalBanners from './components/PromotionalBanners';
import TrustBadges from './components/TrustBadges';
import Testimonials from './components/Testimonials';


export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <PromotionalBanners />
      <FeaturedCategories />
      <FeaturedProducts />
      <TrustBadges />
      <Testimonials />
    </div>
  );
}
