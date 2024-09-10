const PAYMONGO_API_SECRET = 'sk_test_L7sSc8cJW2XvKSUso3wuDBNz';

class PaymongoService<T, K> {
  constructor() {
    this.base_end_point = 'https://api.paymongo.com/v1';
    this.authHeader = `Basic ${btoa(`${PAYMONGO_API_SECRET}:`)}`;
  }

  async create_link(data: K): Promise<T[]> {
    console.log(data);
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.authHeader,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            amount: data.package_price, // use the price from the input data
            description: `Payment for ${data.package_name} package`, // use the package name from the input data
            remarks: 'normal',
          },
        },
      }),
    };

    const response = await fetch(`${this.base_end_point}/links`, options);
    const responseData = await response.json();
    return responseData;
  }

  async get_payments(limit: number): Promise<T> {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: this.authHeader,
      },
    };

    const response = await fetch(
      `${this.base_end_point}/payments?limit=${limit}`,
      options
    );
    const responseData = await response.json();
    return responseData.data;
  }
}

export default PaymongoService;
