'use client';

import { useParams } from 'next/navigation';
import { products } from '../../dummydata/dummyData';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CategoryPage() {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category); 
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  const filteredProducts = products.filter(
    (product) =>
      product.category &&
      product.category.toLowerCase() === decodedCategory.toLowerCase()
  );

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    toast.success(`${product.name} added to cart!`, { theme: 'dark' });
  };

  const handleToggleWishlist = (product) => {
    const isWished = wishlist.some((item) => item.id === product.id);
    if (isWished) {
      dispatch(removeFromWishlist(product));
      toast.info(`${product.name} removed from wishlist.`, { theme: 'dark' });
    } else {
      dispatch(addToWishlist(product));
      toast.info(`${product.name} added to wishlist.`, { theme: 'dark' });
    }
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-lightGray text-center mb-8 capitalize">
        {decodedCategory}
      </h1>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden relative"
            >
              <Link href={`/product/${product.id}`}>
                <div>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-darkBlack">{product.name}</h3>
                    <p className="text-teal font-bold mt-2">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
              {/* Wishlist Icon */}
              <button
                className="absolute top-2 right-2 text-teal bg-white p-2 rounded-full shadow-md hover:bg-teal hover:text-white transition"
                onClick={() => handleToggleWishlist(product)}
              >
                {wishlist.some((item) => item.id === product.id) ? (
                  <AiFillHeart size={20} />
                ) : (
                  <AiOutlineHeart size={20} />
                )}
              </button>
              {/* Add to Cart Button */}
              <button
                className="w-full bg-teal text-white font-bold py-2 rounded-b-md hover:bg-green transition"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lightGray text-center text-lg">
          No products available in this category.
        </p>
      )}
    </div>
  );
}
