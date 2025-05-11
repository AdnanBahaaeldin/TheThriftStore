import React, { createContext, useContext, useState } from 'react';
import { CartService } from '../services/api';
import axios from 'axios';
import { useEffect } from 'react';
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [mergedCartItems , setMergedCartItems] = useState([]);

   useEffect(() => {
      const fetchCartItems = async () => {
        var token = localStorage.getItem('token') 
        const response = await axios.get('http://localhost:8080/cart/items',{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status < 300) {
          setCartItems(response.data);

        } else {
          alert("Error occurred :(");
        }
        console.log(response.data)
        console.log(cartItems)

        // 1 get products <-  ( customer prod id )
        // 2 get image <- products 

        const CartProducts = await Promise.all(
          response.data.map(async (item) => {
            try {
              const id = item.customerProductId;
              console.log(id)
              const resp = await axios.get(`http://localhost:8080/customer/products/get/product`, {
                params: { customerProductId: id }, // Correctly pass `id` as a query parameter
                headers: {
                  Authorization: `Bearer ${token}`, // Ensure token is included
                },
              });
              return resp.data;
            } catch (error) {
              if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                console.error("Unauthorized access. Please check your token.");
                // Handle unauthorized access (e.g., redirect to login)
              } else {
                console.error(`Failed to fetch product ${item.customerProductId}:`, error.message);
              }
              return null; // Return null for failed requests to avoid breaking the Promise.all
            }
          })
        )
        console.log(CartProducts)

        const ImageBlobs = await Promise.all(
          CartProducts.map(async (prod) => {
          try {
            const imageResponse = await axios.get(
              `http://localhost:8080/products/product/${prod.productId}/image`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: 'blob',
              }
            );
            return URL.createObjectURL(imageResponse.data);
          } catch (error) {
            // No image uploaded for this product
            console.warn(`No image for product ${prod.id}`);
            return null;
          }
        })
        )


        const mergedProducts = CartProducts.map((product, index) => ({
        ...product,
        imageURL: ImageBlobs[index], // null if no image
        itemQuantity: response.data[index].quantity,
        customerProductId : response.data[index].customerProductId,
        cartId : response.data[index].cartId
      }));
      console.log(mergedProducts);
      setMergedCartItems(mergedProducts)

      };
      fetchCartItems();
    }, []);

  const addToCart = async (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
      
    });
    var token = localStorage.getItem('token') 
    await CartService.addToCart(item.id,1,{ headers: {
                  Authorization: `Bearer ${token}`,
                }});
  };

  const removeFromCart = async (itemId) => {
    
    var token = localStorage.getItem('token');
    console.log(typeof itemId)
    console.log(itemId)
    await axios.delete('http://localhost:8080/cart/remove',
      { params : {customerProductId : itemId} ,
        headers: {
                  Authorization: `Bearer ${token}`,
                }})

    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartId === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
    setMergedCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartId === itemId ? { ...item, itemQuantity: newQuantity } : item
      )
    );
    console.log(mergedCartItems);
    var token = localStorage.getItem('token')
    await CartService.updateQuantity(itemId,newQuantity,{ headers: {
                        Authorization: `Bearer ${token}`,
                      }});
    
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    var total = 0;
    mergedCartItems.map((item) => {
        total = total + item.price * item.itemQuantity;
    })
    return total;
  };

  const value = {
    cartItems,
    mergedCartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};