import { Link } from 'react-router-dom';
import data from '../data';

function HomeScreen() {
  return (
    <div>
      <h1> List of Products </h1>
      <div className="products">
        {data.products.map((product) => (
          <div className="product" key={product.id}>
            <div className="product-info">
              <Link to={`/product/${product.id}`}>
                <p>{product.name}</p>
              </Link>

              <p>
                <strong>Rs. {product.price}</strong>
              </p>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
