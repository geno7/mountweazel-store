import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class ProductCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProduct: null
        };
    }

    onProductSelect(product) {
        this.setState({selectedProduct: product});
    }

    renderSelectedProduct(product) {
        if (product) {
            return (
                <Card>
                    <CardImg top src={product.image} alt={product.name} />
                    <CardBody>
                        <CardTitle>{product.name}</CardTitle>
                        <CardText>{product.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        return <div />;
    }

    render() {
        const directory = this.props.products.map(product => {
            return (
                <div key={product.id} className="col-md-5 m-1">
                    <Card onClick={() => this.onProductSelect(product)}>
                        <CardImg width="100%" src={product.image} alt={product.name} />
                        <CardImgOverlay>
                            <CardTitle>{product.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {directory}
                </div>
                <div className="row">
                    <div className="col-md-5 m-1">
                        {this.renderSelectedProduct(this.state.selectedProduct)}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductCards;

