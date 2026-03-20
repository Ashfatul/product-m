import { useParams } from "react-router-dom";
import { Row, Col, Card, Button, Rate, Badge, Divider, Space, Descriptions, Image, Spin, Empty, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import DrawerComponent from "../Drawer/Drawer";
import useProductDetails from "../../query/productDetailsQuery";

export default function ProductDetails() {
  const { id } = useParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [displayProduct, setDisplayProduct] = useState<any>(null);

  const { productDetails: product, isLoading, error } = useProductDetails({id});

  const handleEditClick = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    if (product) {
      // if in localstorage there is a modified product with the same id, use that instead of the fetched product
      const modifiedProducts = localStorage.getItem('modifiedProducts');
      if (modifiedProducts) {
        const modifiedProductsArray = JSON.parse(modifiedProducts);
        const modifiedProduct = modifiedProductsArray.find((p: any) => p.id === product.id);
        if (modifiedProduct) {
          setDisplayProduct(modifiedProduct);
          message.info('Showing your local changes for this product');
          return;
        }
      }
      setDisplayProduct(product);
    }
  }, [product]);

  // Listen for storage changes to update on save
  useEffect(() => {
    const handleStorageChange = () => {
      if (product) {
        const modifiedProducts = localStorage.getItem('modifiedProducts');
        if (modifiedProducts) {
          const modifiedProductsArray = JSON.parse(modifiedProducts);
          const modifiedProduct = modifiedProductsArray.find((p: any) => p.id === product.id);
          if (modifiedProduct) {
            setDisplayProduct(modifiedProduct);
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [product]);

  const handleProductUpdate = () => {
    if (product) {
      const modifiedProducts = localStorage.getItem('modifiedProducts');
      if (modifiedProducts) {
        const modifiedProductsArray = JSON.parse(modifiedProducts);
        const modifiedProduct = modifiedProductsArray.find((p: any) => p.id === product.id);
        if (modifiedProduct) {
          message.success('Product updated successfully');
          setDisplayProduct(modifiedProduct);
        }
      }
    }
  };

  if (!displayProduct) {
    return <Empty description="Product not found" />;
  }

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[24, 24]}>
        {/* Product Image Section */}
        <Col xs={24} sm={24} md={10}>
          <Card>
            <Image
              src={displayProduct?.images[0]}
              alt={displayProduct?.title}
              style={{ width: "100%" }}
              preview
            />
          </Card>
        </Col>

        {/* Product Details Section */}
        <Col xs={24} sm={24} md={14}>
          <Card>
            {/* Title and Edit Button */}
            <Space orientation="vertical" size="large" style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div>
                  <Badge count={displayProduct?.category} style={{ backgroundColor: "#108ee9" }} />
                  <h1 style={{ margin: "0 0 8px 0" }}>{displayProduct?.title}</h1>
                </div>
                <Button 
                  type="primary" 
                  icon={<EditOutlined />}
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
              </div>

              {/* Price */}
              <div style={{ backgroundColor: "#fafafa", padding: "16px", borderRadius: "4px" }}>
                <h2 style={{ color: "#f5222d", fontSize: "40px" }}>${displayProduct?.price.toFixed(2)}</h2>
              </div>

              {/* Product Metrics */}
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <div>
                    <strong style={{ fontSize: "14px", color: "#999" }}>Rating</strong>
                    <div style={{ marginTop: "8px" }}>
                      <Rate value={displayProduct?.rating} disabled allowHalf />
                      <br />
                      <span>{displayProduct?.rating} / 5</span>
                      <span style={{ marginLeft: "8px" }}>({Array.isArray(displayProduct?.reviews) ? displayProduct?.reviews.length : displayProduct?.reviews} reviews)</span>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div>
                    <strong style={{ fontSize: "14px", color: "#999" }}>Stock Status</strong>
                    <div style={{ marginTop: "8px" }}>
                      <Badge 
                        status={displayProduct?.stock > 0 ? "success" : "error"} 
                        text={`${displayProduct?.stock} ${displayProduct?.stock === 1 ? "item" : "items"} available`}
                      />
                    </div>
                  </div>
                </Col>
              </Row>

              <Divider style={{ margin: "12px 0" }} />

              {/* Description */}
              <div>
                <strong style={{ fontSize: "14px", color: "#999" }}>Description</strong>
                <p style={{ marginTop: "8px", lineHeight: "1.6" }}>{displayProduct?.description}</p>
              </div>

              {/* Product Specifications */}
              <Descriptions 
                bordered 
                column={2}
                items={[
                  {
                    label: "Category",
                    children: displayProduct?.category,
                  },
                  {
                    label: "Stock",
                    children: displayProduct?.stock,
                  },
                  {
                    label: "Product ID",
                    children: displayProduct?.id,
                  },
                  {
                    label: "Rating",
                    children: `${displayProduct?.rating} / 5`,
                  },
                ]}
              />
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Edit Drawer */}
      <DrawerComponent 
        open={isDrawerOpen} 
        onClose={handleCloseDrawer}
        product={displayProduct}
        onProductUpdate={handleProductUpdate}
      />
    </div>
  );
}