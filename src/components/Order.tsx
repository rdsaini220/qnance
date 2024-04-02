import { useState, useEffect } from 'react';
import { useAuth } from '../uitls/useAuth';
import useFetchData from '../uitls/useFetchData';
import { SYMBOLS_API_URL, PRICES_API_URL } from '../uitls/constants';
import SelecCard from './SelecCard';

const Order = () => {
  const { logout } = useAuth();
  const [symbol, setSymbol] = useState('');
  const { resData, isLoading } = useFetchData(SYMBOLS_API_URL);
  const {
    resData: priceData,
    isLoading: priceLoading,
    isfetchData,
  } = useFetchData();

  useEffect(() => {
    if (symbol) {
      isfetchData(PRICES_API_URL + symbol);
    }
  }, [symbol]);
  return (
    <div className="order-card">
      <div className="order-card-header">
        <h1>Order Book</h1>
        <button className="login-btn" type="submit" onClick={() => logout()}>
          Logout
        </button>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <SelecCard
          symbolList={resData?.symbols}
          symbol={symbol}
          setSymbol={setSymbol}
        />
      )}
      <div className="price-table-container">
        {priceLoading ? (
          <div className="loading-card">Loading...</div>
        ) : !priceData?.length ? (
          <div className="loading-card">
            Price Data Not Available. Please select symbol
          </div>
        ) : (
          <table className="price-table">
            {priceData?.map((item: any, index: number) => {
              console.log(item);
              return index === 0 ? (
                <tr key={'header' + item?.id}>
                  {Object.keys(item)?.map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              ) : (
                <tr key={item?.id}>
                  <td>{item?.id}</td>
                  <td>{item?.isBestMatch}</td>
                  <td>{item?.isBuyerMaker}</td>
                  <td>{item?.price}</td>
                  <td>{item?.price}</td>
                  <td>{item?.price}</td>
                  <td>{item?.time}</td>
                </tr>
              );
            })}
          </table>
        )}
      </div>
    </div>
  );
};

export default Order;
