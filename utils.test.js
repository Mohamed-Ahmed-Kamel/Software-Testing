const {
	sum,
	sayHello,
	isEven,
	animals,
	getOrder,
	getOrders,
	applyDiscount,
	fetchData,
	createOrdaer,
} = require("./utils");
const axios = require("axios");
const db = require("./db.js");
const email = require("./email.js");
jest.mock("axios");

// Test Numbers
// test("sum - should return 3 + 7 = 10", () => {
// 	const result = sum(3, 7);
// 	expect(result).toBe(10);
// 	expect(result).toBeGreaterThan(5);
// 	expect(result).toBeGreaterThanOrEqual(5);
// 	expect(result).toBeLessThan(11);
// 	expect(result).toBeLessThanOrEqual(10);
// 	expect(sum(0.1001, 0.4)).toBeCloseTo(0.5);
// });

// Test String
// test("sayHello - should return Hello mohamed", () => {
// 	expect(sayHello("mohamed")).toBe("Hello mohamed"); // not preferred
// 	expect(sayHello("mohamed")).toMatch("Hello mohamed");
// });

// Test Boolean
// describe("isEven", () => {
// 	it("should return true for => 4", () => {
// 		expect(isEven(4)).toBeTruthy();
// 	});
// 	it("should return false for => 3", () => {
// 		expect(isEven(3)).toBeFalsy();
// 	});
// });

// test("validation", () => {
// 	let x; // undefined
// 	// expect(x).toBeUndefined();
// 	// expect(x).toBeDefined();
// 	// expect(x).not.toBeUndefined();
// 	// expect(x).not.toBeDefined();
// });

// Arrays
// test("animals - should return true for => dog", () => {
// 	expect(animals).toContain("dog");
// });

// Objects
// describe("getOrder", () => {
// 	it("should return {id: 1, price: 30}", () => {
// 		// expect(getOrder(1)).toBe({id: 1, price: 30}) // not preferred
// 		// expect(getOrder(1)).toEqual({ id: 1, price: 30, Date: "2024" });
// 		expect(getOrder(1)).toMatchObject({ id: 1, price: 30 });
// 		expect(getOrder(1)).toHaveProperty("id", 1);
// 	});
// 	it("should throw an Error", () => {
// 		expect(() => getOrder()).toThrow();
// 		expect(() => getOrder()).toThrowError("id is not defined");
// 	});
// });

// Async function
// describe("getOrders", () => {
// 	it("should return some orders", async () => {
// 		// const result = await getOrders();
// 		// expect(result.length).toBe(2);
// 		// expect((await getOrders()).length).toBe(2);
// 		await expect(getOrders()).resolves.toContainEqual({ id: 1, price: 10 });
// 	});
// });

/** Mock or Faking
 * mockReset() --> Return the original code.
 * .mock property
 * .mockImplementation
 * mock module
 * */
// describe("applyDiscount", () => {
// 	it("should apply discount 10% for order price 10", () => {
// 		// db.getOrder = jest.fn().mockReturnValue({ id: 1, price: 10 });
// 		db.getOrder = jest.fn().mockImplementation((id) => {
// 			if (id < 5) {
// 				return { id: 1, price: 10 };
// 			}
// 			return { id: 1, price: 8 };
// 		});
// 		db.updateOrder = jest.fn();
// 		const order = applyDiscount(1);
// 		expect(order).toEqual({ id: 1, price: 9 });
// 		expect(db.getOrder.mock.calls[0][0]).toBe(1);
// 		expect(db.updateOrder.mock.calls[0][0]).toEqual({ id: 1, price: 9 });
// 		expect(db.updateOrder).toHaveBeenCalled();
// 		expect(db.updateOrder).toHaveBeenCalledWith({ id: 1, price: 9 });
// 		// db.getOrder.mockReset()
// 		// db.updateOrder.mockReset()
// 	});
// 	it("should apply discount 10% for order price 8", () => {
// 		const order = applyDiscount(6);
// 		expect(order).toEqual({ id: 1, price: 8 });
// 		expect(db.updateOrder.mock.calls.length).toEqual(1);
// 	});
// });

// mock module
// describe("fetchData", () => {
// 	it("should return some data", async () => {
// 		axios.get.mockResolvedValue({ id: 23 })
// 		const data = await fetchData();
// 		expect(data).toEqual({ id: 23 })
// 	})
// })

// Example
describe("createOrdaer", () => {
	it("should return an Error if userID is not defind", async () => {
		await expect(createOrdaer()).rejects.toThrow();
		await expect(createOrdaer()).rejects.toThrowError("userID not found");
	});

	it("should create an order in db and send email", async () => {
		db.createOrdaer = jest.fn();
		db.getUser = jest
			.fn()
			.mockResolvedValue({ email: "mohamed@gmail.com" });
		email.sendEmail = jest.fn();
		const message = createOrdaer(5, [{ price: 10 }, { price: 10 }]);

		await expect(db.createOrdaer).toHaveBeenCalled();
		await expect(db.createOrdaer).toHaveBeenCalledWith(5, [
			{ price: 10 },
			{ price: 10 },
		]);

		await expect(db.getUser.mock.calls.length).toBe(1);
		await expect(db.getUser.mock.calls[0][0]).toBe(5);

		expect(email.sendEmail.mock.calls.length).toBe(1);
		expect(email.sendEmail.mock.calls[0][0]).toMatch("mohamed@gmail.com");
		expect(email.sendEmail.mock.calls[0][1]).toBe(20);

		// expect(message).toMatch('order created'); // Error
	});
});
