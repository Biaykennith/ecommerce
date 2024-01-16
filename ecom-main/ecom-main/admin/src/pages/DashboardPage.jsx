import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

const ProductPage = () => {
  const [monthlySalesData, setMonthlySalesData] = useState([]);
  const [topSellerData, setTopSellerData] = useState([]);
  const [topRatedData, setTopRatedData] = useState([]);

  useEffect(() => {
    // Fetch monthly sales data
    axios.get('http://localhost:8000/orders/')
      .then(response => {
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December',
        ];

        const salesData = response.data.orders.map(order => {
          const orderMonth = new Date(order.createdAt).getMonth();
          return {
            orderMonth,
            salesQuantity: order.products[0].quantity,
          };
        });

        const aggregatedData = salesData.reduce((acc, { orderMonth, salesQuantity }) => {
          const monthName = monthNames[orderMonth];
          acc[monthName] = (acc[monthName] || 0) + salesQuantity;
          return acc;
        }, {});

        const chartDataArray = Object.entries(aggregatedData).map(([orderMonth, salesQuantity]) => [
          `${orderMonth}`,
          salesQuantity,
        ]);

        setMonthlySalesData([['Month', 'Sales Quantity'], ...chartDataArray]);

        const products = response.data.orders.flatMap(order => order.products);

        const topSellers = [...products].sort((a, b) => b.salesQuantity - a.salesQuantity).slice(0, 10);

        axios.get('https://fakestoreapi.com/products')
          .then(response => {
            const topRatedProducts = response.data
              .sort((a, b) => b.rating.rate - a.rating.rate)
              .slice(0, 10);

            const topRatedChartData = [['Product Name', 'Rating'], ...topRatedProducts.map(product => [product.title, product.rating.rate])];

            setTopRatedData(topRatedChartData);
          })
          .catch(error => {
            console.error('Error fetching top-rated data:', error);
          });

        setTopSellerData(topSellers);
      })
      .catch(error => {
        console.error('Error fetching monthly sales data:', error);
      });
  }, []);

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <div className="ChartContainer">
        <h2>Monthly Sales</h2>
        <Chart
          chartType="BarChart"
          data={monthlySalesData}
          options={{
            title: 'Monthly Sales Comparison',
            hAxis: {
              title: 'Month',
            },
            vAxis: {
              title: 'Sales Quantity',
            },
          }}
          width="81vw"
        />
      </div>
        <div className="card">
          <h2>Top Seller Products</h2>
          <ul className="TopSellerList">
            {topSellerData.map((seller, index) => (
              <li key={index} className="TopSellerItem">{`${seller.name}`}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h2>Top Rated Products</h2>
          <ul className="TopRatedList">
            {topRatedData.map((product, index) => (
              <li key={index} className="TopRatedItem">{`${product[0]}: Rating - ${product[1]}`}</li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default ProductPage;
