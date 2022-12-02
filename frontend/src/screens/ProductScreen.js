import { useParams } from 'react-router-dom';

function ProductScreen() {
  const params = useParams();
  //test
  const { itemId } = params;
  return (
    <div>
      <h1>{itemId}</h1>
    </div>
  );
}

export default ProductScreen;
