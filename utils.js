const db = require("./db.js");
const email = require("./email.js");
const axios = require("axios");

// Naumber
const sum = (num1, num2) => num1 + num2;

// String
const sayHello = (name) => `Hello ${name}`;

// Boolean
const isEven = (number) => (number % 2 === 0 ? true : false);

// Arrays
const animals = ["cat", "dog", "lion"];

// Objects
const getOrder = (id) => {
	if (!id) {
		throw new Error("id is not defined");
	}
	return { id: 1, price: 30, Date: "2024" };
};

// Async function
const getOrders = async () => {
	return [
		{ id: 1, price: 10 },
		{ id: 2, price: 20 },
	];
};

// Mock or Faking
const applyDiscount = (orderID) => {
	const order = db.getOrder(orderID);
	if (order.price >= 10) {
		order.price -= order.price * 0.1;
		db.updateOrder(order);
	}
	return order;
};

// mock module
const fetchData = async (req, res) => {
	const data = axios.get("https://url.com");
	return data;
};

// Example
const createOrdaer = async (userID, products) => {
	if (!userID) {
		throw new Error("userID not found");
	}

	let totalPrice = 0;
	products.forEach((product) => (totalPrice += product.price));

	await db.createOrdaer(userID, products);

	const user = await db.getUser(userID);
	email.sendEmail(user.email, totalPrice);

	return `order created with total Price ${totalPrice} and products: ${products}`;
};

module.exports = {
	sum,
	sayHello,
	isEven,
	animals,
	getOrder,
	getOrders,
	applyDiscount,
	fetchData,
	createOrdaer,
};
