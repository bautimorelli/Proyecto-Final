class ProductDto {
	constructor({ _id, id, name, price, thumbnail, description, date, stock }) {
		this.product_id = (_id || id)
		this.name = name
		this.price = price
		this.thumbnail = thumbnail
	}
}

export const convertProductToDto = (products) => {
	if (Array.isArray(products)) {
		return products.map((product) => new ProductDto(product))
	} else {
		return new ProductDto(products)
	}
}

export { ProductDto }
