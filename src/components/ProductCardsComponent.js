import React from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";

function RenderProductCard({ product }) {
  return (
    <Card>
      <Link to={`/products/${product.id}`}>
        <CardImg width="100%" src={product.image} alt={product.name} />
        <CardImgOverlay>
          <CardTitle>{product.name}</CardTitle>
          <CardTitle>{product.price}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

function ProductCards(props) {
  console.log("ProductCards, ", props);
  const directory = props.products.map((product) => {
    return (
      <div key={product.id} className="col-md-5 m-1">
        <RenderProductCard product={product} />
      </div>
    );
  });
  console.log(props.isLoading);
  if (props.isLoading) {
    return <Loading />;
  }
  if (props.errMess) {
    return <h4>{props.errMess}</h4>;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {/* <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home"></Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Product</BreadcrumbItem>
          </Breadcrumb> */}
          <hr />
        </div>
      </div>
      <div className="row">{directory}</div>
    </div>
  );
}

export default ProductCards;
