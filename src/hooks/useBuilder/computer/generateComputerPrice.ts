interface Product {
    product: {
        price: number
    }
}

export const generateComputerPrice = (...args: Array<Product | null>): number => {
    return args.reduce((price: number, product: Product | null): number => {
        if (product) {
            return price + product.product.price
        }
        return price
    }, 0)
}
