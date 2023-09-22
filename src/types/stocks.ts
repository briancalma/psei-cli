export type Price = {
  currency: string;
  amount: number;
};

export type Stock = {
  name: string;
  price: Price;
  percent_change: number;
  volume: number;
  symbol: string;
};

export type PhisixApiResponse = {
  stock: Stock[];
  as_of: string;
};
