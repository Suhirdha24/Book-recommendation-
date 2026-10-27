import React, { useState } from 'react';
import {
  FaTimes,
  FaBoxOpen,
  FaTruck,
  FaCheckCircle,
  FaReceipt,
  FaRedo,
  FaChevronRight,
  FaClock,
  FaExternalLinkAlt
} from 'react-icons/fa';

const OrdersModal = ({
  isOpen,
  onClose,
  orders = [],
  onAddToCart,
  onSelectBook,
  onExploreBooks
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedTrackingId, setExpandedTrackingId] = useState(null);

  if (!isOpen) return null;

  const filteredOrders = orders.filter((o) => {
    if (activeTab === 'not_shipped') return o.status?.toLowerCase().includes('preparing') || o.status?.toLowerCase().includes('confirmed');
    if (activeTab === 'delivered') return o.status?.toLowerCase().includes('delivered');
    return true;
  });

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateStr || 'Today';
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 4000 }}>
      <div
        className="quiz-modal"
        style={{
          maxWidth: 820,
          width: '95%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            background: '#232f3e',
            color: '#fff',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <FaBoxOpen style={{ fontSize: 24, color: '#febd69' }} />
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Your Orders</h2>
              <div style={{ fontSize: 12, color: '#ccc' }}>
                Track packages, review items, and manage past book deliveries
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              color: '#fff',
              border: 'none',
              fontSize: 20,
              cursor: 'pointer'
            }}
          >
            <FaTimes />
          </button>
        </div>

        {/* Orders Filter Tabs */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            padding: '12px 24px',
            background: '#f8f9fa',
            borderBottom: '1px solid #e2e8f0',
            fontSize: 13,
            fontWeight: 700
          }}
        >
          <button
            onClick={() => setActiveTab('all')}
            style={{
              background: activeTab === 'all' ? '#232f3e' : '#fff',
              color: activeTab === 'all' ? '#fff' : '#444',
              border: '1px solid #ccc',
              borderRadius: 20,
              padding: '6px 14px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            All Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('not_shipped')}
            style={{
              background: activeTab === 'not_shipped' ? '#232f3e' : '#fff',
              color: activeTab === 'not_shipped' ? '#fff' : '#444',
              border: '1px solid #ccc',
              borderRadius: 20,
              padding: '6px 14px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Preparing / In Transit
          </button>
          <button
            onClick={() => setActiveTab('delivered')}
            style={{
              background: activeTab === 'delivered' ? '#232f3e' : '#fff',
              color: activeTab === 'delivered' ? '#fff' : '#444',
              border: '1px solid #ccc',
              borderRadius: 20,
              padding: '6px 14px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Delivered
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
          {filteredOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px' }}>
              <FaBoxOpen style={{ fontSize: 54, color: '#ccc', marginBottom: 16 }} />
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#111', marginBottom: 8 }}>
                No orders found in this view
              </h3>
              <p style={{ color: '#666', fontSize: 14, maxWidth: 460, margin: '0 auto 20px' }}>
                When you place orders through the BookVerse cart, they will instantly appear here with real-time Prime package tracking.
              </p>
              <button
                className="hero-btn-primary"
                onClick={() => {
                  onClose();
                  if (onExploreBooks) onExploreBooks();
                }}
              >
                Browse Books Catalog
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {filteredOrders.map((order) => {
                const isExpanded = expandedTrackingId === (order.orderId || order._id);
                return (
                  <div
                    key={order.orderId || order._id}
                    style={{
                      border: '1px solid #d5d9d9',
                      borderRadius: 8,
                      overflow: 'hidden',
                      background: '#fff',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                    }}
                  >
                    {/* Order Metadata Strip */}
                    <div
                      style={{
                        background: '#f0f2f2',
                        padding: '12px 18px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: 12,
                        color: '#565959',
                        gap: 12,
                        borderBottom: '1px solid #d5d9d9'
                      }}
                    >
                      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                        <div>
                          <div style={{ textTransform: 'uppercase', fontSize: 11, fontWeight: 700 }}>
                            Order Placed
                          </div>
                          <div style={{ color: '#111', fontWeight: 600 }}>
                            {formatDate(order.createdAt)}
                          </div>
                        </div>

                        <div>
                          <div style={{ textTransform: 'uppercase', fontSize: 11, fontWeight: 700 }}>
                            Total
                          </div>
                          <div style={{ color: '#b12704', fontWeight: 800 }}>
                            ₹{order.total || order.subtotal}
                          </div>
                        </div>

                        <div>
                          <div style={{ textTransform: 'uppercase', fontSize: 11, fontWeight: 700 }}>
                            Ship To
                          </div>
                          <div style={{ color: '#007185', fontWeight: 600 }}>
                            {order.shippingAddress?.fullName || 'Verified Reader'}
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ textTransform: 'uppercase', fontSize: 11, fontWeight: 700 }}>
                          Order # {order.orderId || order._id}
                        </div>
                        <div style={{ color: '#007185', cursor: 'pointer', fontSize: 11 }}>
                          View Invoice
                        </div>
                      </div>
                    </div>

                    {/* Order Delivery Status Bar */}
                    <div style={{ padding: '16px 18px' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: 14,
                          flexWrap: 'wrap',
                          gap: 8
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: '50%',
                              backgroundColor: '#007600',
                              display: 'inline-block'
                            }}
                          />
                          <h4 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: '#007600' }}>
                            {order.deliveryDate ? `Arriving ${order.deliveryDate}` : 'Arriving Tomorrow by 11:00 AM'}
                          </h4>
                          <span
                            style={{
                              background: '#e8f5e9',
                              color: '#2e7d32',
                              padding: '2px 8px',
                              borderRadius: 4,
                              fontSize: 11,
                              fontWeight: 700
                            }}
                          >
                            Prime Fast Delivery
                          </span>
                        </div>

                        <button
                          onClick={() => setExpandedTrackingId(isExpanded ? null : (order.orderId || order._id))}
                          style={{
                            background: '#ffd814',
                            border: '1px solid #fcd200',
                            borderRadius: 6,
                            padding: '6px 14px',
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6
                          }}
                        >
                          <FaTruck /> {isExpanded ? 'Hide Tracking' : 'Track Package'}
                        </button>
                      </div>

                      {/* Visual Package Tracking Step Bar (When expanded) */}
                      {isExpanded && (
                        <div
                          style={{
                            background: '#f8f9fa',
                            border: '1px solid #e2e8f0',
                            borderRadius: 6,
                            padding: '16px 20px',
                            marginBottom: 16
                          }}
                        >
                          <div style={{ fontSize: 13, fontWeight: 800, color: '#111', marginBottom: 12 }}>
                            Delivery Progress • Tracking ID: TRK-{String(order.orderId || order._id).replace(/\D/g, '') || '982310'}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                            <div style={{ textAlign: 'center', zIndex: 1, flex: 1 }}>
                              <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#007600', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px', fontSize: 12 }}>
                                ✓
                              </div>
                              <div style={{ fontSize: 11, fontWeight: 700, color: '#111' }}>Ordered</div>
                              <div style={{ fontSize: 10, color: '#777' }}>Confirmed</div>
                            </div>

                            <div style={{ flex: 1, height: 3, background: '#007600', margin: '-16px 0 0 0' }} />

                            <div style={{ textAlign: 'center', zIndex: 1, flex: 1 }}>
                              <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#007600', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px', fontSize: 12 }}>
                                ✓
                              </div>
                              <div style={{ fontSize: 11, fontWeight: 700, color: '#111' }}>Shipped</div>
                              <div style={{ fontSize: 10, color: '#777' }}>From Hub</div>
                            </div>

                            <div style={{ flex: 1, height: 3, background: '#febd69', margin: '-16px 0 0 0' }} />

                            <div style={{ textAlign: 'center', zIndex: 1, flex: 1 }}>
                              <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#febd69', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px', fontSize: 12 }}>
                                🚚
                              </div>
                              <div style={{ fontSize: 11, fontWeight: 700, color: '#111' }}>Out for Delivery</div>
                              <div style={{ fontSize: 10, color: '#777' }}>Tomorrow 9 AM</div>
                            </div>

                            <div style={{ flex: 1, height: 3, background: '#e2e8f0', margin: '-16px 0 0 0' }} />

                            <div style={{ textAlign: 'center', zIndex: 1, flex: 1 }}>
                              <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#e2e8f0', color: '#777', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px', fontSize: 12 }}>
                                ○
                              </div>
                              <div style={{ fontSize: 11, fontWeight: 700, color: '#777' }}>Delivered</div>
                              <div style={{ fontSize: 10, color: '#777' }}>By 11 AM</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Items list inside this order */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {(order.items || []).map((item, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              gap: 16,
                              alignItems: 'center',
                              paddingBottom: 12,
                              borderBottom: idx < order.items.length - 1 ? '1px solid #eee' : 'none'
                            }}
                          >
                            <img
                              src={item.coverImage}
                              alt={item.title}
                              style={{
                                width: 60,
                                height: 80,
                                objectFit: 'cover',
                                borderRadius: 4,
                                border: '1px solid #ddd',
                                cursor: 'pointer'
                              }}
                              onClick={() => {
                                onClose();
                                if (onSelectBook) onSelectBook(item);
                              }}
                            />
                            <div style={{ flex: 1 }}>
                              <h5
                                style={{
                                  fontSize: 14,
                                  fontWeight: 700,
                                  margin: '0 0 4px',
                                  color: '#007185',
                                  cursor: 'pointer'
                                }}
                                onClick={() => {
                                  onClose();
                                  if (onSelectBook) onSelectBook(item);
                                }}
                              >
                                {item.title}
                              </h5>
                              <div style={{ fontSize: 12, color: '#555', marginBottom: 4 }}>
                                by {item.author} • {item.format || 'Paperback'}
                              </div>
                              <div style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>
                                ₹{item.price} <span style={{ fontSize: 11, fontWeight: 400, color: '#666' }}>× {item.quantity || 1}</span>
                              </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                              <button
                                onClick={() => {
                                  if (onAddToCart) onAddToCart(item, 1);
                                }}
                                className="hero-btn-primary"
                                style={{
                                  padding: '6px 12px',
                                  fontSize: 12,
                                  whiteSpace: 'nowrap',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 4
                                }}
                              >
                                <FaRedo style={{ fontSize: 10 }} /> Buy It Again
                              </button>
                              <button
                                onClick={() => {
                                  onClose();
                                  if (onSelectBook) onSelectBook(item);
                                }}
                                className="hero-btn-secondary"
                                style={{ padding: '5px 12px', fontSize: 11, whiteSpace: 'nowrap' }}
                              >
                                View Book
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersModal;
