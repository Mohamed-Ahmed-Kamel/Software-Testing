const getOrder = (orderID) => {
	return { id: orderID, price: 100 };
};
const updateOrder = (order) => {
	console.log("order is updated") 
};
const createOrdaer = (userID, products) => {
	console.log(userID, products) 
};
module.exports = { getOrder, updateOrder, createOrdaer };
