import { Link } from 'react-router-dom';
import data from '../data';

function HomeScreen() {
  return (
    <div>
      <h1> List of Products </h1>
      <div className="products">
        {data.products.map((product) => (
          <div className="product" key={product.itemId}>
            <div className="product-info">
              <Link to={`/product/${product.itemId}`}>
                <p>{product.itemCode}-{product.itemDesc}</p>
              </Link>

              <p>
                <strong>Rs. {product.itemTPRate}</strong>
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
