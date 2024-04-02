import React from 'react';

interface SymbolItem {
  symbol: string;
}

interface SelecCardProps {
  symbolList?: SymbolItem[];
  symbol: string;
  setSymbol: (symbol: string) => void;
}

const SelecCard: React.FC<SelecCardProps> = ({
  symbolList,
  symbol,
  setSymbol,
}) => {
  return (
    <div className="input-select">
      <select
        className="select"
        id="symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      >
        <option value={''}>Select Symbol</option>
        {symbolList?.map((item) => (
          <option key={item.symbol} value={item.symbol}>
            {item.symbol}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelecCard;
