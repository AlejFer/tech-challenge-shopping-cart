import React from 'react';
import Button from '../../components/Button';
import { ProductModel } from '../ProductList';
import {ProductStyles} from './ProductStyles';

export type ProductWrapper = {
    product: ProductModel,
    cart: React.Dispatch<any>,
};

export const Product: React.FC<ProductWrapper> = ({product, cart}) => {
    const handleAddProduct = () => {
        cart((prevProducts: ProductModel[]) => [...prevProducts, product])
    };

    return (
        <ProductStyles>
            <div className="productContainer">
                <h4>{product.name}</h4>
                <h6>${product.customerPrice}</h6>
                <Button onClick={handleAddProduct}>Add</Button>
            </div>
        </ProductStyles>
    )
};

export default Product;
