import { useParams } from "react-router-dom";
import { Row, Col, Card, Button, Rate, Badge, Divider, Space, Descriptions, Image, Spin, Empty } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import DrawerComponent from "../Drawer/Drawer";
import useProductDetails from "../../query/productDetailsQuery";

export default function ProductDetails() {
  const { id } = useParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { productDetails: product, isLoading, error } = useProductDetails({id});

  const handleEditClick = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  if (!product) {
    return <Empty description="Product not found" />;
  }

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[24, 24]}>
        {/* Product Image Section */}
        <Col xs={24} sm={24} md={10}>
          <Card>
            <Image
              src={product.images[0]}
              alt={product.title}
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
                  <h1 style={{ margin: "0 0 8px 0" }}>{product.title}</h1>
                  <Badge count={product.category} style={{ backgroundColor: "#108ee9" }} />
                </div>
                <Button 
                  type="primary" 
                  icon={<EditOutlined />}
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
              </div>

              <Divider style={{ margin: "12px 0" }} />

              {/* Product Metrics */}
              <Row gutter={16}>
                <Col xs={12}>
                  <div>
                    <strong style={{ fontSize: "14px", color: "#999" }}>Rating</strong>
                    <div style={{ marginTop: "8px" }}>
                      <Rate value={product.rating} disabled allowHalf />
                      <span style={{ marginLeft: "8px" }}>({Array.isArray(product.reviews) ? product.reviews.length : product.reviews} reviews)</span>
                    </div>
                  </div>
                </Col>
                <Col xs={12}>
                  <div>
                    <strong style={{ fontSize: "14px", color: "#999" }}>Stock Status</strong>
                    <div style={{ marginTop: "8px" }}>
                      <Badge 
                        status={product.stock > 0 ? "success" : "error"} 
                        text={`${product.stock} ${product.stock === 1 ? "item" : "items"} available`}
                      />
                    </div>
                  </div>
                </Col>
              </Row>

              <Divider style={{ margin: "12px 0" }} />

              {/* Description */}
              <div>
                <strong style={{ fontSize: "14px", color: "#999" }}>Description</strong>
                <p style={{ marginTop: "8px", lineHeight: "1.6" }}>{product.description}</p>
              </div>

              {/* Price */}
              <div style={{ backgroundColor: "#fafafa", padding: "16px", borderRadius: "4px" }}>
                <strong style={{ fontSize: "14px", color: "#999" }}>Price</strong>
                <h2 style={{ margin: "8px 0 0 0", color: "#f5222d" }}>${product.price.toFixed(2)}</h2>
              </div>

              {/* Product Specifications */}
              <Descriptions 
                bordered 
                column={2}
                items={[
                  {
                    label: "Category",
                    children: product.category,
                  },
                  {
                    label: "Stock",
                    children: product.stock,
                  },
                  {
                    label: "Product ID",
                    children: product.id,
                  },
                  {
                    label: "Rating",
                    children: `${product.rating} / 5`,
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
        product={product}
      />
    </div>
  );
}