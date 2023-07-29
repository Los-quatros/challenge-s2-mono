import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Product(props) {
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setProduct(props.product);
  }, [props.product]);

  /**
   * Redirect to product details page
   * @param { Event } event Click event
   * @returns Link to product details page
   */
  const redirectToProductDetails = (event) => {
    event.preventDefault();
    navigate(`/products/${product.category.name}/${product.id}`, {
      state: { product },
    });
  };

  /**
   * Handle link click to prevent page reload
   * @param { Event } event Click event
   */
  const handleLinkClick = (event) => event.preventDefault();

  return (
    <>
      <div
        className="product"
        style={{ cursor: 'pointer' }}
        onClick={(event) => redirectToProductDetails(event)}
      >
        <div className="product_image">
          <img src={product.image} alt={product.label} />
        </div>
        <div className="product_content">
          <div className="product_title">
            <Link onClick={handleLinkClick}>{product.label}</Link>
          </div>
          <div className="product_price">{product.price}€</div>
        </div>
      </div>
    </>
  );
}

export default Product;
