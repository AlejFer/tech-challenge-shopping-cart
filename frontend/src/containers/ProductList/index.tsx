import React, { useEffect, useState, createRef } from 'react';
import Button from '../../components/Button';
import Product from '../Product';
import {ProductStyles} from './ProductListStyles';

export type ProductModel = {
    id: number,
    name: string,
    customerPrice: number,
    cost: number,
};

export type ProductRequest = {
    productId: number,
    quantity: number,
};

export type ProductResponse = {
    name: string,
    quantity: number,
    unitPrice: string,
    totalPrice: string
};

export type CartResponse = {
    products: ProductResponse[],
    total: string,
};

export const ProductList: React.FC = () => {
    const [products, setProducts] = useState([]);
    const [productsInCart, setProductsInCart] = useState([]);
    const modalRef = createRef<HTMLDivElement>();
    const listRef = createRef<HTMLDivElement>();
    let showModal = false;

    const handleCart = () => {
        showModal = !showModal;
        if (showModal) {
            const cart: ProductRequest[] = productsInCart.reduce((acc: ProductRequest[], prd: ProductModel) => {
                const p = acc.find(a => a.productId === prd.id);
                if (p) {
                    p.quantity += 1;
                } else {
                    acc.push({
                        productId: prd.id,
                        quantity: 1
                    });
                }
                return acc;
            }, []);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ products: cart })
            };
            fetch('http://localhost:3001/api/v1/products/cart', requestOptions)
                .then(response => response.json())
                .then((data: CartResponse) => {
                    if (listRef && listRef.current) {
                        listRef.current.innerHTML = '';
                        const ul = document.createElement('ul');
                        data?.products?.forEach(prd => {
                            const li = document.createElement('li');
                            li.innerText = `${prd.name}. Unit Price ${prd.unitPrice} x Quantity ${prd.quantity} = SubTotal ${prd.totalPrice}`;
                            ul.appendChild(li);
                        });
                        const p = document.createElement('p');
                        p.innerText = `Total: ${data.total}`;
                        listRef.current.appendChild(ul);
                        listRef.current.appendChild(p);
                    }
                    if (modalRef && modalRef.current) {
                        modalRef.current.hidden = false;
                    }
                });
        } else if (modalRef && modalRef.current) {
            modalRef.current.hidden = true;
            if (listRef && listRef.current) {
                listRef.current.innerHTML = '';
            }
        }
    };

    useEffect(() => {
        fetch('http://localhost:3001/api/v1/products', { method: 'GET' })
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <ProductStyles>
            <div className="productListContainer">
                <h1>Products</h1>
                {products.map((prd: ProductModel) => <Product key={prd.id} product={prd} cart={setProductsInCart}/>)}
                <br></br>
                <hr></hr>
                <Button onClick={handleCart}>Cart</Button>
            </div>
            <div className="productListModalContainer" ref={modalRef} hidden>
                <h3>Cart List</h3>
                <div className="productList" ref={listRef}>
                </div>
            </div>
        </ProductStyles>
    )
};

export default ProductList;
