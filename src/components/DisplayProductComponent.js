//basically campsiteinfocomp for now
import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem,
    Modal, ModalHeader, ModalBody, Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderProduct({product}) {
    return (
            <Card>
                <CardImg top src={product.image} alt={product.name} />
                <CardBody>
                    <CardText>{product.description}</CardText>
                </CardBody>
            </Card>
    );
}

function DisplayProduct(props) {
        if (props.product != null) {
            return (
                <div class="container">
                                <div className="row">
                {/* <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/products">Products</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.product.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>{props.product.name}</h2>
                    <hr />
                </div> */}
            </div>
                    <div className="row">
                        <RenderProduct product={props.product} />
                    </div>
                </div>
                
            );
        }
        return <div />;
    }

export default DisplayProduct;