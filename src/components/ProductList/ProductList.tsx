import { Table, type GetProps, Flex, type TableColumnsType } from 'antd';
import useProducts from '../../query/productQuery';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import { DownOutlined, EyeOutlined, ClearOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Tooltip } from 'antd';
import useProductsCategory from '../../query/productCategoryQuery';
import useProductStore from '../../store/store';
import styled from 'styled-components';
import { colors, transitions } from '../../theme/colors';

type SearchProps = GetProps<typeof Input.Search>;

const ActionIconButton = styled(Link)`
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  border-radius: 4px;
  color: ${colors.primary};
  transition: all ${transitions.normal};
  height: 32px;
  width: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.primary};
  
  &:hover {
    background-color: ${colors.bgTertiary};
    color: ${colors.primaryDark};
    border-color: ${colors.primaryDark};
  }
  
  font-size: 16px;
`;

export default function ProductList() {
  const page = useProductStore((state) => state.page);
  const setPage = useProductStore((state) => state.setPage);
  const searchQuery = useProductStore((state) => state.searchQuery);
  const setSearchQuery = useProductStore((state) => state.setSearchQuery);
  const selectedCategory = useProductStore((state) => state.selectedCategory);
  const setSelectedCategory = useProductStore((state) => state.setSelectedCategory);
  const resetFilters = useProductStore((state) => state.resetFilters);

  const { products, total } = useProducts({
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
  const columns: TableColumnsType = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      align: 'left' as const,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'center' as const,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      align: 'center' as const,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      align: 'center' as const,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      align: 'center' as const,
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center' as const,
      render: (_: string, record: Record<string, any>) => (
        <Tooltip title="View Product Details">
          <ActionIconButton to={`/products/${record.id}`}>
            <EyeOutlined />
          </ActionIconButton>
        </Tooltip>
      ),
    }
  ];

  // onSearch is the function that will be called when the user clicks the search button.
  const onSearch: SearchProps['onSearch'] = (value) => {
    setSearchQuery(value);
    setPage(1); // Reset to first page on search
  };

  const handleResetFilters = () => {
    resetFilters();
    setPage(1); // Reset to first page on filters reset
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setSelectedCategory(e.key);
  };

  const items: MenuProps['items'] = category?.map((cat: any) => ({
    label: cat.name,
    key: cat.slug,
  })) || [];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };


  return (
    <div>
      <Flex gap="10px" justify='space-between' align='center' wrap>
        <h1 className='mb-0'>Product List</h1>
        <Flex gap='10px' align='center' wrap>
          <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: '300px' }} />
          <Dropdown menu={menuProps}>
            <Button icon={<DownOutlined />} iconPlacement="end">
              Filter By Category
            </Button>
          </Dropdown>
        </Flex>
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

        {(searchQuery || selectedCategory) && (
          <Button 
            type="primary" 
            danger 
            size="small"
            icon={<ClearOutlined />}
            onClick={handleResetFilters}
          >
            Reset Filters
          </Button>
        )}
      </Flex>
      <Table
        className="product_table"
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        scroll={{ x: true }}
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