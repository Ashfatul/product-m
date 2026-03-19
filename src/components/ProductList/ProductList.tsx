import { Table } from 'antd';
import useProducts from '../../query/productQuery';
import { Link } from 'react-router-dom';

export default function ProductList() {
  const {products, isLoading, isError} = useProducts();

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
      render: (_: any, record: any) => (
        <Link to={`/products/${record.id}`}>View Details</Link>
      ),
    }
  ];

  return (
    <div>
      <h1>Product List</h1>
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
    </div>
  );
}