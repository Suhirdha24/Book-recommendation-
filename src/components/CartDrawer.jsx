import React, { useState } from 'react';
import {
  FaTimes,
  FaTrash,
  FaShoppingCart,
  FaShieldAlt,
  FaCheckCircle,
  FaTruck,
  FaBoxOpen,
  FaLock,
  FaReceipt,
  FaChevronRight,
  FaCreditCard,
  FaMoneyBillWave,
  FaMobileAlt
} from 'react-icons/fa';

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
  // checkout steps: 'cart' | 'checkout' | 'processing' | 'confirmed'
  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);

  // Form states
  const [shippingName, setShippingName] = useState('Suhirdha Sivakumar');
  const [shippingStreet, setShippingStreet] = useState('42 Literature Avenue, Book District');
  const [shippingCity, setShippingCity] = useState('Chennai');
  const [shippingPincode, setShippingPincode] = useState('600001');
  const [shippingSpeed, setShippingSpeed] = useState('prime');
  const [paymentMethod, setPaymentMethod] = useState('Amazon Pay UPI');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleStartCheckout = () => {
    setCheckoutStep('checkout');
  };

  const handlePlaceOrderSubmit = (e) => {
    e.preventDefault();
    setCheckoutStep('processing');

    const deliveryDateStr =
      shippingSpeed === 'prime' ? 'Tomorrow, by 11:00 AM' : 'Within 2-3 Business Days';

    const orderData = {
      orderId: 'BV-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      items: [...cartItems],
      subtotal: subtotal,
      total: subtotal,
      shippingFee: 0,
      paymentMethod,
      shippingSpeed: shippingSpeed === 'prime' ? 'FREE Prime One-Day' : 'Standard Delivery',
      shippingAddress: {
        fullName: shippingName.trim() || 'Suhirdha Sivakumar',
        street: shippingStreet.trim() || '42 Literature Avenue',
        city: shippingCity.trim() || 'Chennai',
        pincode: shippingPincode.trim() || '600001'
      },
      status: 'Confirmed - Preparing for Dispatch',
      deliveryDate: deliveryDateStr
    };

    // Simulate realistic Amazon payment verification (1.2 seconds)
    setTimeout(() => {
      if (onPlaceOrder) {
        onPlaceOrder(orderData);
      }
      setPlacedOrderDetails(orderData);
      setCheckoutStep('confirmed');
    }, 1200);
  };

  const handleFinishToOrders = () => {
    onClearCart();
    setCheckoutStep('cart');
    setPlacedOrderDetails(null);
    onClose();
    if (onOpenOrders) {
      onOpenOrders();
    }
  };

  const handleFinishToShopping = () => {
    onClearCart();
    setCheckoutStep('cart');
    setPlacedOrderDetails(null);
    onClose();
  };

  const handleDrawerClose = () => {
    if (checkoutStep === 'confirmed') {
      onClearCart();
      setCheckoutStep('cart');
      setPlacedOrderDetails(null);
    }
    onClose();
  };

  return (
    <div className="drawer-backdrop" onClick={handleDrawerClose}>
      <div
        className="drawer-panel"
        style={{ width: 480 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title">
            {checkoutStep === 'confirmed' ? (
              <>
                <FaCheckCircle style={{ color: '#007600', fontSize: 20 }} />
                <span>Order Placed</span>
              </>
            ) : checkoutStep === 'checkout' || checkoutStep === 'processing' ? (
              <>
                <FaShieldAlt style={{ color: '#febd69' }} />
                <span>Amazon Secure Checkout</span>
              </>
            ) : (
              <>
                <FaShoppingCart style={{ color: '#febd69' }} />
                <span>Shopping Cart ({totalItemsCount})</span>
              </>
            )}
          </div>
          <button
            onClick={handleDrawerClose}
            style={{ color: '#fff', fontSize: 18, background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <FaTimes />
          </button>
        </div>

        {/* Content Body */}
        <div className="drawer-content">
          {/* STEP 1: PROCESSING SPINNER */}
          {checkoutStep === 'processing' && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  border: '4px solid #f3f3f3',
                  borderTop: '4px solid #febd69',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 20px'
                }}
              />
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#111', marginBottom: 8 }}>
                Securing Your Payment...
              </h3>
              <p style={{ fontSize: 13, color: '#666', maxWidth: 300, margin: '0 auto' }}>
                Connecting with Amazon Pay &amp; generating your confirmed BookVerse invoice...
              </p>
            </div>
          )}

          {/* STEP 2: ORDER CONFIRMED SCREEN */}
          {checkoutStep === 'confirmed' && placedOrderDetails && (
            <div style={{ padding: '10px 0' }}>
              {/* Top Success Banner */}
              <div
                style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: 8,
                  padding: '16px',
                  marginBottom: 20,
                  textAlign: 'center'
                }}
              >
                <FaCheckCircle
                  style={{ fontSize: 44, color: '#16a34a', marginBottom: 10 }}
                />
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#166534', margin: '0 0 6px' }}>
                  Order Placed, thank you!
                </h3>
                <p style={{ fontSize: 13, color: '#4b5563', margin: 0 }}>
                  Confirmation and tracking updates have been recorded.
                </p>
              </div>

              {/* Order Key Details Card */}
              <div
                style={{
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  padding: '16px',
                  marginBottom: 18,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #f3f4f6',
                    paddingBottom: 10,
                    marginBottom: 10,
                    fontSize: 13
                  }}
                >
                  <span style={{ color: '#6b7280', fontWeight: 600 }}>Order Number:</span>
                  <strong style={{ color: '#111827' }}>#{placedOrderDetails.orderId}</strong>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #f3f4f6',
                    paddingBottom: 10,
                    marginBottom: 10,
                    fontSize: 13
                  }}
                >
                  <span style={{ color: '#6b7280', fontWeight: 600 }}>Estimated Delivery:</span>
                  <span style={{ color: '#15803d', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <FaTruck /> {placedOrderDetails.deliveryDate}
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #f3f4f6',
                    paddingBottom: 10,
                    marginBottom: 10,
                    fontSize: 13
                  }}
                >
                  <span style={{ color: '#6b7280', fontWeight: 600 }}>Payment Method:</span>
                  <strong style={{ color: '#374151' }}>{placedOrderDetails.paymentMethod}</strong>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 14,
                    paddingTop: 4
                  }}
                >
                  <span style={{ color: '#111827', fontWeight: 700 }}>Total Amount Paid:</span>
                  <span style={{ color: '#b12704', fontWeight: 800, fontSize: 16 }}>
                    ₹{placedOrderDetails.total}
                  </span>
                </div>
              </div>

              {/* Items List in this confirmed order */}
              <div
                style={{
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  padding: '14px',
                  marginBottom: 20
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 12 }}>
                  Books in this delivery ({placedOrderDetails.items?.length || 0}):
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {placedOrderDetails.items?.map((item, idx) => (
                    <div
                      key={idx}
                      style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb' }}
                    >
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        style={{ width: 42, height: 56, objectFit: 'cover', borderRadius: 4 }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: '#111827',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {item.title}
                        </div>
                        <div style={{ fontSize: 11, color: '#6b7280' }}>
                          Qty: {item.quantity} • ₹{item.price} each
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons: User chooses what to do next */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button
                  className="hero-btn-primary"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8
                  }}
                  onClick={handleFinishToOrders}
                >
                  <FaBoxOpen /> View Order &amp; Live Tracking
                </button>

                <button
                  className="hero-btn-secondary"
                  style={{ width: '100%', padding: '10px', fontSize: 13, borderColor: '#d1d5db' }}
                  onClick={handleFinishToShopping}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: STRUCTURED CHECKOUT FORM */}
          {checkoutStep === 'checkout' && (
            <form onSubmit={handlePlaceOrderSubmit}>
              {/* Step Title */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <h3 style={{ fontSize: 17, fontWeight: 800, margin: 0, color: '#111' }}>
                  Review &amp; Place Your Order
                </h3>
                <span style={{ fontSize: 12, color: '#666', background: '#f0f0f0', padding: '3px 8px', borderRadius: 4 }}>
                  {totalItemsCount} item{totalItemsCount > 1 ? 's' : ''}
                </span>
              </div>

              {/* Delivery Speed / Prime Banner */}
              <div
                style={{
                  background: '#f0fdf4',
                  border: '1px solid #86efac',
                  borderRadius: 6,
                  padding: '12px 14px',
                  marginBottom: 16
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: '#166534', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <FaTruck /> Prime Fast Delivery Guaranteed
                </div>
                <div style={{ fontSize: 12, color: '#374151' }}>
                  Arriving: <strong>Tomorrow by 11:00 AM</strong> with verified book-safe packaging
                </div>
              </div>

              {/* Delivery Address Section */}
              <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: '14px', marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>1. Delivery Address</span>
                </div>

                <div style={{ marginBottom: 10 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#4b5563', marginBottom: 3 }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingName}
                    onChange={(e) => setShippingName(e.target.value)}
                    style={{ width: '100%', padding: '7px 10px', borderRadius: 4, border: '1px solid #d1d5db', fontSize: 13 }}
                  />
                </div>

                <div style={{ marginBottom: 10 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#4b5563', marginBottom: 3 }}>
                    Street Address &amp; House No.
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingStreet}
                    onChange={(e) => setShippingStreet(e.target.value)}
                    style={{ width: '100%', padding: '7px 10px', borderRadius: 4, border: '1px solid #d1d5db', fontSize: 13 }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#4b5563', marginBottom: 3 }}>
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingCity}
                      onChange={(e) => setShippingCity(e.target.value)}
                      style={{ width: '100%', padding: '7px 10px', borderRadius: 4, border: '1px solid #d1d5db', fontSize: 13 }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#4b5563', marginBottom: 3 }}>
                      PIN Code
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingPincode}
                      onChange={(e) => setShippingPincode(e.target.value)}
                      style={{ width: '100%', padding: '7px 10px', borderRadius: 4, border: '1px solid #d1d5db', fontSize: 13 }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: '14px', marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 10 }}>
                  2. Select Payment Method
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { id: 'Amazon Pay UPI', label: 'Amazon Pay UPI / Balance (Fastest)', icon: <FaMobileAlt style={{ color: '#007185' }} /> },
                    { id: 'Credit / Debit Card', label: 'Credit or Debit Card (Visa, RuPay, MC)', icon: <FaCreditCard style={{ color: '#4338ca' }} /> },
                    { id: 'Cash on Delivery (COD)', label: 'Cash on Delivery (Pay at Doorstep)', icon: <FaMoneyBillWave style={{ color: '#15803d' }} /> }
                  ].map((method) => (
                    <label
                      key={method.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '9px 12px',
                        background: paymentMethod === method.id ? '#fff9e6' : '#fff',
                        border: paymentMethod === method.id ? '1.5px solid #febd69' : '1px solid #e5e7eb',
                        borderRadius: 6,
                        cursor: 'pointer',
                        fontSize: 12.5,
                        fontWeight: paymentMethod === method.id ? 700 : 500
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        style={{ accentColor: '#e67a00' }}
                      />
                      {method.icon}
                      <span>{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order Summary Breakdown */}
              <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '14px', marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 10 }}>
                  3. Order Summary
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: '#4b5563', marginBottom: 6 }}>
                  <span>Items Subtotal ({totalItemsCount}):</span>
                  <span>₹{subtotal}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: '#15803d', marginBottom: 6 }}>
                  <span>Prime Delivery:</span>
                  <span>FREE</span>
                </div>

                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 8, marginTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 800, color: '#b12704' }}>
                  <span>Order Total:</span>
                  <span>₹{subtotal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  className="hero-btn-secondary"
                  style={{ borderColor: '#d1d5db', color: '#111', padding: '10px 16px' }}
                  onClick={() => setCheckoutStep('cart')}
                >
                  Back to Cart
                </button>

                <button
                  type="submit"
                  className="hero-btn-primary"
                  style={{
                    flex: 1,
                    padding: '12px',
                    fontSize: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6
                  }}
                >
                  <FaLock style={{ fontSize: 12 }} /> Place Your Order and Pay (₹{subtotal})
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: CART VIEW */}
          {checkoutStep === 'cart' && (
            <div>
              {cartItems.length === 0 ? (
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
                    <div
                      style={{
                        background: '#e8f5e9',
                        color: '#2e7d32',
                        padding: 10,
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 700,
                        marginBottom: 16,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6
                      }}
                    >
                      <FaCheckCircle /> Your order qualifies for FREE Prime Delivery!
                    </div>
                  )}

                  {cartItems.map((item) => (
                    <div key={item._id || item.title} className="cart-item-card">
                      <img src={item.coverImage} alt={item.title} className="cart-item-img" />
                      <div className="cart-item-info">
                        <h4 className="cart-item-title">{item.title}</h4>
                        <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
                          by {item.author} ({item.format || 'Paperback'})
                        </div>
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
                            style={{
                              color: '#007185',
                              fontSize: 12,
                              marginLeft: 12,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 4,
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer'
                            }}
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
          )}
        </div>

        {/* Footer (Only in 'cart' view when cart is not empty) */}
        {checkoutStep === 'cart' && cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-total-row">
              <span>Subtotal ({totalItemsCount} items):</span>
              <span className="drawer-total-price">₹{subtotal}</span>
            </div>

            <button
              className="hero-btn-primary"
              style={{ width: '100%', padding: 12, fontSize: 15 }}
              onClick={handleStartCheckout}
            >
              Proceed to Buy ({totalItemsCount} items)
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                fontSize: 11,
                color: '#666',
                marginTop: 10
              }}
            >
              <FaShieldAlt style={{ color: '#007600' }} /> Secure 256-Bit SSL Checkout • Fast Prime Delivery
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
