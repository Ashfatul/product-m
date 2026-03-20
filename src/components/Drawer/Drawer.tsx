import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, InputNumber, Select, Space, message } from 'antd';

interface DrawerComponentProps {
  open?: boolean;
  onClose?: () => void;
  product?: any;
}



export default function DrawerComponent({ open: externalOpen, onClose: externalOnClose, product }: DrawerComponentProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [form] = Form.useForm();

  // Use external state if provided, otherwise use internal state
  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const handleClose = externalOnClose || (() => setInternalOpen(false));
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values);
      message.success('Product updated successfully');
      handleClose();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  // Initialize form values when product data is available
  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        title: product.title,
        price: product.price,
        stock: product.stock,
        category: product.category,
        rating: product.rating,
        description: product.description,
      });
    } else {
      form.resetFields();
    }
  }, [product, form]);

  return (
    <>
      <Drawer
        title={product ? "Edit Product" : "Create New Product"}
        size={600}
        onClose={handleClose}
        open={isOpen}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space orientation="horizontal" size="middle">
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" requiredMark={false} form={form}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="title"
                label="Product Title"
                rules={[{ required: true, message: 'Please enter product title' }]}
              >
                <Input placeholder="Enter product title" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: 'Please enter price' }]}
              >
                <InputNumber 
                  placeholder="Enter price" 
                  prefix="$"
                  style={{ width: '100%' }}
                  min={0}
                  step={0.01}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="stock"
                label="Stock"
                rules={[{ required: true, message: 'Please enter stock' }]}
              >
                <InputNumber 
                  placeholder="Enter stock quantity" 
                  style={{ width: '100%' }}
                  min={0}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select category' }]}
              >
                <Select
                  placeholder="Select category"
                  options={[
                    { label: 'Electronics', value: 'Electronics' },
                    { label: 'Clothing', value: 'Clothing' },
                    { label: 'Books', value: 'Books' },
                    { label: 'Home', value: 'Home' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="rating"
                label="Rating"
                rules={[{ required: true, message: 'Please enter rating' }]}
              >
                <InputNumber 
                  placeholder="Enter rating" 
                  style={{ width: '100%' }}
                  min={0}
                  max={5}
                  step={0.1}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please enter product description' }]}
              >
                <Input.TextArea rows={4} placeholder="Enter product description" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};