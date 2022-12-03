import { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
//import data from '../data';
import axios from 'axios';
import logger from 'use-reducer-logger';


const reducer = (state, action) => {
  console.log('hi');
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });

  //const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      console.log("hello world")
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      //setProducts(result.data);
    };
    fetchData();
  
  }, []);
  return (
    <div>
      <h1> List of Products </h1>
      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.itemId}>
            <div className="product-info">
              <Link to={`/product/${product.itemId}`}>
                <p>
                  {product.itemCode}-{product.itemDesc}
                </p>
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
