export async function getAllProducts() {
  const response = await fetch(`${process.env.HOST_NAME}api/products`);
  const products = await response.json();
  return products;
}

export async function getProduct(slug: string) {
  const response = await fetch(`${process.env.HOST_NAME}api/products/${slug}`);
  const product = await response.json();
  return product;
}
