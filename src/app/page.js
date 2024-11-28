import HeroSection from './components/HeroSection';
import FeaturedCategories from './components/FeaturedCategories';
import FeaturedProducts from './components/FeaturedProducts';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
    </div>
  );
}
