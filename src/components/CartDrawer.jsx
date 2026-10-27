import React, { useState } from 'react';
import { FaTimes, FaTrash, FaShoppingCart, FaShieldAlt, FaCheckCircle, FaTruck, FaBoxOpen } from 'react-icons/fa';

const CartDrawer = ({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
  onOpenOrders,
  ordersCount = 0
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      orderId: 'BV-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      items: [...cartItems],
      subtotal: subtotal,
      total: subtotal,
      shippingFee: 0,
      shippingAddress: {
        fullName: 'Suhirdha Sivakumar',
        street: '42 Literature Avenue, Book District',
        city: 'Chennai',
        pincode: '600001'
      },
      status: 'Confirmed - Preparing for Dispatch',
      deliveryDate: 'Tomorrow, by 11:00 AM'
    };

    if (onPlaceOrder) {
      onPlaceOrder(orderData);
    }

    setOrderPlaced(true);
    setTimeout(() => {
      onClearCart();
      setOrderPlaced(false);
      setIsCheckingOut(false);
      onClose();
      if (onOpenOrders) {
        onOpenOrders();
      }
    }, 2000);
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title">
            <FaShoppingCart style={{ color: '#febd69' }} />
            <span>Shopping Cart ({totalItemsCount})</span>
          </div>
          <button onClick={onClose} style={{ color: '#fff', fontSize: 18 }}><FaTimes /></button>
        </div>

        <div className="drawer-content">
          {orderPlaced ? (
            <div style={{ textAlign: 'center', padding: '40px 10px' }}>
              <FaCheckCircle style={{ fontSize: 50, color: '#007600', marginBottom: 16 }} />
              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#111', marginBottom: 8 }}>
                Order Placed Successfully!
              </h3>
              <p style={{ fontSize: 14, color: '#555', marginBottom: 12 }}>
                Thank you for your purchase on BookVerse. Your books are being packed and will arrive tomorrow.
              </p>
              <div style={{ fontSize: 13, color: '#888' }}>
                Redirecting back to your library...
              </div>
            </div>
          ) : isCheckingOut ? (
            /* Mock BookVerse Checkout Form */
            <form onSubmit={handleCheckoutSubmit}>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16, color: '#111' }}>
                BookVerse 1-Click Fast Checkout
              </h3>

              <div style={{ background: '#f8f9fa', padding: 14, borderRadius: 6, marginBottom: 16, border: '1px solid #ddd' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#007600', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <FaTruck /> FREE Prime Fast Delivery
                </div>
                <div style={{ fontSize: 12, color: '#666' }}>
                  Guaranteed delivery by <strong>Tomorrow, 11 AM</strong>
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Full Name</label>
                <input
                  type="text"
                  required
                  defaultValue="Suhirdha Sivakumar"
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 4, border: '1px solid #ccc', fontSize: 14 }}
                />
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Delivery Street Address</label>
                <input
                  type="text"
                  required
                  defaultValue="42 Literature Avenue, Book District"
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 4, border: '1px solid #ccc', fontSize: 14 }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>City</label>
                  <input
                    type="text"
                    required
                    defaultValue="Chennai"
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 4, border: '1px solid #ccc', fontSize: 14 }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Pincode</label>
                  <input
                    type="text"
                    required
                    defaultValue="600001"
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 4, border: '1px solid #ccc', fontSize: 14 }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Payment Method</label>
                <select style={{ width: '100%', padding: '8px 10px', borderRadius: 4, border: '1px solid #ccc', fontSize: 14 }}>
                  <option>Amazon Pay Balance / UPI</option>
                  <option>Credit / Debit Card</option>
                  <option>Cash on Delivery (COD)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  className="hero-btn-secondary"
                  style={{ color: '#111', borderColor: '#ccc' }}
                  onClick={() => setIsCheckingOut(false)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="hero-btn-primary"
                  style={{ flex: 1 }}
                >
                  Confirm Order (₹{subtotal})
                </button>
              </div>
            </form>
          ) : cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 10px' }}>
              <FaShoppingCart style={{ fontSize: 48, color: '#ccc', marginBottom: 16 }} />
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Your BookVerse Cart is empty</h3>
              <p style={{ fontSize: 13, color: '#666', marginBottom: 18 }}>
                Explore bestsellers, multilingual picks, and children stories to fill your cart.
              </p>

              {ordersCount > 0 && (
                <div style={{ marginBottom: 16, padding: 14, background: '#f8f9fa', borderRadius: 8, border: '1px solid #e2e8f0', textAlign: 'left' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#007600', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FaTruck /> You have {ordersCount} order{ordersCount > 1 ? 's' : ''} on the way!
                  </div>
                  <div style={{ fontSize: 12, color: '#555', marginBottom: 10 }}>
                    Track your package, view delivery dates, or re-order books in one click.
                  </div>
                  <button
                    className="hero-btn-primary"
                    style={{ width: '100%', fontSize: 13, padding: '9px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                    onClick={() => {
                      onClose();
                      if (onOpenOrders) onOpenOrders();
                    }}
                  >
                    <FaBoxOpen /> View Your Orders &amp; Tracking
                  </button>
                </div>
              )}

              <button className="hero-btn-secondary" style={{ width: '100%', borderColor: '#ccc' }} onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <div>
              {subtotal > 499 && (
                <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: 10, borderRadius: 6, fontSize: 12, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FaCheckCircle /> Your order qualifies for FREE Prime Delivery!
                </div>
              )}

              {cartItems.map((item) => (
                <div key={item._id || item.title} className="cart-item-card">
                  <img src={item.coverImage} alt={item.title} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4 className="cart-item-title">{item.title}</h4>
                    <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>by {item.author} ({item.format || 'Paperback'})</div>
                    <div className="cart-item-price">₹{item.price}</div>

                    <div className="cart-qty-row">
                      <div
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item._id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{item.quantity}</span>
                      <div
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                      >
                        +
                      </div>
                      <button
                        onClick={() => onRemoveItem(item._id)}
                        style={{ color: '#007185', fontSize: 12, marginLeft: 12, display: 'flex', alignItems: 'center', gap: 4 }}
                      >
                        <FaTrash style={{ fontSize: 11 }} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && !isCheckingOut && !orderPlaced && (
          <div className="drawer-footer">
            <div className="drawer-total-row">
              <span>Subtotal ({totalItemsCount} items):</span>
              <span className="drawer-total-price">₹{subtotal}</span>
            </div>

            <button
              className="hero-btn-primary"
              style={{ width: '100%', padding: 12, fontSize: 15 }}
              onClick={() => setIsCheckingOut(true)}
            >
              Proceed to Buy ({totalItemsCount} items)
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 11, color: '#666', marginTop: 10 }}>
              <FaShieldAlt style={{ color: '#007185' }} /> 100% Purchase Protection with BookVerse Guarantee
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
