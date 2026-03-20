import { Table, type GetProps, Flex } from 'antd';
import useProducts from '../../query/productQuery';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import { DownOutlined, UserOutlined, FilterOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import { useState } from 'react';
import useProductsCategory from '../../query/productCategoryQuery';
import useProductStore from '../../store/store';

type SearchProps = GetProps<typeof Input.Search>;

export default function ProductList() {
  const page = useProductStore((state) => state.page);
  const setPage = useProductStore((state) => state.setPage);
  const searchQuery = useProductStore((state) => state.searchQuery);
  const setSearchQuery = useProductStore((state) => state.setSearchQuery);
  const selectedCategory = useProductStore((state) => state.selectedCategory);
  const setSelectedCategory = useProductStore((state) => state.setSelectedCategory);

  const { products, isLoading, isError, total } = useProducts({
    limit: parseInt(import.meta.env.VITE_PRODUCTS_PER_PAGE),
    skip: (page - 1) * parseInt(import.meta.env.VITE_PRODUCTS_PER_PAGE),
    ...(searchQuery && { filter: 'search', q: searchQuery }),
    ...(selectedCategory && { filter: 'category', category: selectedCategory }),
  });

  const { category } = useProductsCategory();
  
  const { Search } = Input;

  // DataSource is the array of data that will be displayed in the table.
  const dataSource = products || [];

  // Columns is the array of objects that defines the columns of the table. Each object has a title, dataIndex, and key.
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: string, record: Record<string, any>) => (
        <Link to={`/products/${record.id}`}>View Details</Link>
      ),
    }
  ];

  // onSearch is the function that will be called when the user clicks the search button.
  const onSearch: SearchProps['onSearch'] = (value) => {
    setSearchQuery(value);
    setPage(1); // Reset to first page on search
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setSelectedCategory(e.key);
  };

  const items: MenuProps['items'] = category?.map((cat: string) => ({
      label: cat.name,
      key: cat.slug,
    })) || [];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };


  return (
    <div>
      <h1>Product List</h1>
      <Flex gap="10px" justify='center' align='center'>
      <Search placeholder="input search text" allowClear onSearch={onSearch} style={{width: '300px'}} />
      <Dropdown menu={menuProps}>
        <Button icon={<DownOutlined />} iconPlacement="end">
          Filter By Category
        </Button>
      </Dropdown>
      </Flex>
      <Flex justify='center' gap='20px' align='center' wrap style={{ marginTop: '20px' }}>
        {searchQuery &&
        <p className='applied_filter'>
          {searchQuery && 'Showing results for: '} <b>{searchQuery}</b>
        </p>
        }

        {searchQuery && selectedCategory &&
        <p className='applied_filter'>
          |
        </p>
        }

        {selectedCategory &&
        <p className='applied_filter'>
          {selectedCategory && 'Filtering by category: '} <b>{selectedCategory}</b>
        </p>
        }
      </Flex>
      <Table 
      className='product_table'
      dataSource={dataSource} 
      columns={columns} 
      rowKey="id"
      pagination={{ 
        pageSize: parseInt(import.meta.env.VITE_PRODUCTS_PER_PAGE),
        current: page,
        total: total,
        showSizeChanger: false,
        onChange: (page) => setPage(page)
      }}
      />
    </div>
  );
}