import axios from "axios";
import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Helmet} from 'react-helmet-async'
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import { getError } from "../util";

const reducer = (state, action) => {
  console.log("hi");
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const params = useParams();
  //test
  const { itemId } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  //const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/itemId/${itemId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }

      //setProducts(result.data);
    };
    fetchData();
  }, [itemId]);

  return loading ? (
    <LoadingBox />
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <Helmet>
              <title>{product.itemDesc}</title>
              </Helmet>
            </ListGroup.Item>
            <ListGroup.Item>Price: Pkr {product.itemTPRate}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.itemTPRate}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button variant="primary">
                      Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
