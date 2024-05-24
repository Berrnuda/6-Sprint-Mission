export async function getMarketData({ page = 1, size = 10, order = "recent" }) {
  const query = `page=${page}&pageSize=${size}&orderBy=${order}`;
  const res = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  const body = await res.json();
  return body;
}

export async function getProductData(id) {
  const res = await fetch(`https://panda-market-api.vercel.app/products/${id}`);
  const data = await res.json();
  return data;
}

export async function getProductCommentData(id) {
  const res = await fetch(
    `https://panda-market-api.vercel.app/products/${id}/comments?limit=10`
  );
  const data = await res.json();
  return data;
}
