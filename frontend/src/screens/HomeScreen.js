import { useEffect, useReducer } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/AccordionCollapse'
import MessageBox from '../component/MessageBox'
import LoadingBox from '../component/LoadingBox'
import Product from '../component/Product'
//import data from '../data';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Helmet } from 'react-helmet-async';

const reducer = (state, action) => {
  console.log('hi');
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload };
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
      <Helmet>
        <title>Booker App</title>
      </Helmet>
      <h1>List of Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.itemId} sm={12} md={12} lg={12}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
