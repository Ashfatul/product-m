import { useParams } from "react-router-dom";
import { Row, Col, Card, Button, Rate, Badge, Divider, Space, Descriptions, Image, Empty, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import styled from "styled-components";
import DrawerComponent from "../Drawer/Drawer";
import useProductDetails from "../../query/productDetailsQuery";
import type { Product } from "../../types";
import { colors, transitions } from "../../theme/colors";

const Container = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

const TitleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    gap: 10px;
    margin-bottom: 12px;
  }

  & > div:first-child {
    flex: 1;
  }

  & > button {
    white-space: nowrap;

    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

const ProductTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 12px 0;
  line-height: 1.3;
  word-break: break-word;

  @media (max-width: 1024px) {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 0 0 8px 0;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin: 0 0 6px 0;
    line-height: 1.25;
  }
`;

const PriceSection = styled.div`
  background-color: #fafafa;
  padding: 20px 16px;
  border-radius: 6px;
  margin-bottom: 24px;
  border: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    margin-bottom: 16px;
    padding: 16px 12px;
  }

  @media (max-width: 480px) {
    padding: 12px 10px;
    margin-bottom: 12px;
  }
`;

const PriceText = styled.h2`
  color: #f5222d;
  font-size: 48px;
  font-weight: 700;
  margin: 0;
  line-height: 1;

  @media (max-width: 1024px) {
    font-size: 40px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const MetricsRow = styled(Row)`
  margin-bottom: 24px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const MetricLabel = styled.strong`
  font-size: 13px;
  color: #999;
  display: block;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 6px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    margin-bottom: 4px;
  }
`;

const DescriptionSection = styled.div`
  margin-bottom: 24px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    margin-bottom: 12px;
  }

  & > p {
    margin-top: 8px;
    line-height: 1.6;
    color: #333;
    margin-bottom: 0;

    @media (max-width: 768px) {
      font-size: 14px;
      margin-top: 6px;
    }

    @media (max-width: 480px) {
      font-size: 13px;
      margin-top: 4px;
      line-height: 1.5;
    }
  }
`;

const SpecificationsCard = styled(Card)`
  margin-top: 24px;

  @media (max-width: 768px) {
    margin-top: 16px;
  }

  .ant-descriptions {
    width: 100%;

    @media (max-width: 768px) {
      font-size: 13px;
    }

    @media (max-width: 480px) {
      font-size: 13px;
    }

    .ant-descriptions-item {
      width: 100%;

      @media (max-width: 480px) {
        padding: 8px 0 !important;
      }
    }

    .ant-descriptions-row {
      width: 100%;
      display: flex;

      @media (max-width: 768px) {
        margin-bottom: 12px;
      }

      @media (max-width: 480px) {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #f0f0f0;
        margin-bottom: 12px;
        padding-bottom: 12px;

        &:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
      }

      > td {
        width: 100%;
        display: table-cell;
        padding: 12px 16px !important;
        text-align: left;
        border: 1px solid #f0f0f0;
        text-align: center;

        @media (max-width: 480px) {
          display: block;
          width: 100%;
          padding: 8px 0 !important;
          border: none;
          border-bottom: none;

          &:first-child {
            font-weight: 600;
            color: #666;
            margin-bottom: 4px;
          }

          &:last-child {
            color: #333;
            font-weight: 500;
          }
        }
      }
    }

    th {
      width: 100%;
      text-align: left;
      padding: 12px 16px !important;

      @media (max-width: 480px) {
        padding: 8px 0 !important;
        font-size: 12px;
        text-align: center;
      }
    }
  }
`;

export default function ProductDetails() {
  const { id } = useParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [displayProduct, setDisplayProduct] = useState<Product | null>(null);

  const { productDetails: product } = useProductDetails({id});

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
        const modifiedProductsArray: Product[] = JSON.parse(modifiedProducts);
        const modifiedProduct = modifiedProductsArray.find((p: Product) => p.id === product.id);
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
          const modifiedProductsArray: Product[] = JSON.parse(modifiedProducts);
          const modifiedProduct = modifiedProductsArray.find((p: Product) => p.id === product.id);
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
        const modifiedProductsArray: Product[] = JSON.parse(modifiedProducts);
        const modifiedProduct = modifiedProductsArray.find((p: Product) => p.id === product.id);
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
    <Container>
      <Row gutter={[24, 24]}>
        {/* Product Image Section */}
        <Col xs={24} sm={24} md={10} lg={9}>
          <Card style={{ height: "100%" }}>
            <Image
              src={displayProduct?.images[0]}
              alt={displayProduct?.title}
              style={{ width: "100%" }}
              preview
            />
          </Card>
        </Col>

        {/* Product Details Section */}
        <Col xs={24} sm={24} md={14} lg={15}>
          <Card>
            <Space orientation="vertical" size="large" style={{ width: "100%" }}>
              {/* Title and Edit Button */}
              <TitleHeader>
                <div>
                  <ProductTitle>{displayProduct?.title}</ProductTitle>
                  <Badge count={displayProduct?.category} style={{ backgroundColor: "#108ee9" }} />
                </div>
                <Button 
                  type="primary" 
                  icon={<EditOutlined />}
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
              </TitleHeader>

              {/* Price */}
              <PriceSection>
                <PriceText>${displayProduct?.price.toFixed(2)}</PriceText>
              </PriceSection>

              {/* Product Metrics */}
              <MetricsRow gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <div>
                    <MetricLabel>Rating</MetricLabel>
                    <div style={{ marginTop: "8px" }}>
                      <Rate value={displayProduct?.rating} disabled allowHalf />
                      <br />
                      <span style={{ fontSize: "14px" }}>
                        {displayProduct?.rating} / 5
                      </span>
                      <span style={{ marginLeft: "8px", fontSize: "14px" }}>
                        ({Array.isArray(displayProduct?.reviews) ? displayProduct?.reviews.length : displayProduct?.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div>
                    <MetricLabel>Stock Status</MetricLabel>
                    <div style={{ marginTop: "8px" }}>
                      <Badge 
                        status={displayProduct?.stock > 0 ? "success" : "error"} 
                        text={`${displayProduct?.stock} ${displayProduct?.stock === 1 ? "item" : "items"} available`}
                      />
                    </div>
                  </div>
                </Col>
              </MetricsRow>

              <Divider style={{ margin: "16px 0" }} />

              {/* Description */}
              <DescriptionSection>
                <MetricLabel style={{ marginBottom: "12px" }}>Description</MetricLabel>
                <p>{displayProduct?.description}</p>
              </DescriptionSection>

              {/* Product Specifications */}
              <SpecificationsCard>
                <Descriptions 
                  bordered 
                  column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
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
              </SpecificationsCard>
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
    </Container>
  );
}