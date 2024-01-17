
class ShoppingCart {
    constructor() {
        this.products = {
            "Product A": { price: 20, quantity: 0, giftWrap: 0 },
            "Product B": { price: 40, quantity: 0, giftWrap: 0 },
            "Product C": { price: 50, quantity: 0, giftWrap: 0 }
        };
        this.cartTotal = 0;
        this.discountName = "";
        this.discountAmount = 0;
        this.subtotal = 0;
        this.shippingFee = 0;
        this.giftWrapFee = 0;
        this.total = 0;
    }

    calculateDiscount() {
        const totalQuantity = Object.values(this.products).reduce((acc, product) => acc + product.quantity, 0);

        if (totalQuantity > 30 && Object.values(this.products).some(product => product.quantity > 15)) {
            this.discountName = "tiered_50_discount";
            this.discountAmount = this.cartTotal * 0.5;
        } else if (totalQuantity > 20) {
            this.discountName = "bulk_10_discount";
            this.discountAmount = this.cartTotal * 0.1;
        } else if (Object.values(this.products).some(product => product.quantity > 10)) {
            for (const [productName, product] of Object.entries(this.products)) {
                if (product.quantity > 10) {
                    this.discountName = "bulk_5_discount";
                    this.discountAmount = product.price * product.quantity * 0.05;
                    break;
                }
            }
        } else if (this.cartTotal > 200) {
            this.discountName = "flat_10_discount";
            this.discountAmount = 10;
        }
    }

    calculateFees() {
        const totalQuantity = Object.values(this.products).reduce((acc, product) => acc + product.quantity, 0);
        this.shippingFee = Math.floor(totalQuantity / 10) * 5;
        this.giftWrapFee = Object.values(this.products).reduce((acc, product) => acc + product.giftWrap, 0);
    }

    calculateTotal() {
        this.subtotal = this.cartTotal - this.discountAmount;
        this.total = this.subtotal + this.shippingFee + this.giftWrapFee;
    }

    processOrder() {
        for (const [productName, product] of Object.entries(this.products)) {
            product.quantity = parseInt(prompt(`Enter the quantity of ${productName}:`));
            product.giftWrap = parseInt(prompt(`Is ${productName} wrapped as a gift? (1 for Yes, 0 for No):`));
            this.cartTotal += product.quantity * product.price;
        }

        this.calculateDiscount();
        this.calculateFees();
        this.calculateTotal();

        // Output
        console.log("\nOrder Details:");
        for (const [productName, product] of Object.entries(this.products)) {
            console.log(`${productName}: Quantity - ${product.quantity}, Total - ${product.quantity * product.price}`);
        }
        console.log(`\nSubtotal: ${this.subtotal}`);
        console.log(`Discount Applied: ${this.discountName}, Amount: ${this.discountAmount}`);
        console.log(`Shipping Fee: ${this.shippingFee}`);
        console.log(`Gift Wrap Fee: ${this.giftWrapFee}`);
        console.log(`Total: ${this.total}`);
    }
}

const cart = new ShoppingCart();
cart.processOrder();
