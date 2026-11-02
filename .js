// EXPERIMENT 10: RESTAURANT MANAGEMENT SYSTEM
print("RESTAURANT MANAGEMENT SYSTEM - EXPERIMENT 10");

const database = db.getSiblingDB("restaurantDB");

if (!database.getCollectionNames().includes("menu")) {
  database.createCollection("menu");
}

// INSERT OPERATIONS
database.menu.deleteMany({ dish_id: { $in: [101, 102, 103, 104] } });

database.menu.insertMany([
  {
    dish_id: 101, name: "Margherita Pizza", price: 250,
    category: "Main Course", cuisine: "Italian", stock: 40,
    ingredients: ["Cheese", "Tomato"]
  },
  {
    dish_id: 102, name: "Paneer Tikka", price: 180,
    category: "Starter", cuisine: "Indian", stock: 30,
    ingredients: ["Paneer", "Spices"]
  },
  {
    dish_id: 103, name: "Chocolate Brownie", price: 120,
    category: "Dessert", cuisine: "Continental", stock: 15,
    ingredients: ["Chocolate", "Butter"]
  },
  {
    dish_id: 104, name: "Veg Biryani", price: 220,
    category: "Main Course", cuisine: "Indian", stock: 50,
    ingredients: ["Rice", "Vegetables"]
  }
]);

// READ OPERATIONS
print("All Menu Items:"); printjson(database.menu.find().toArray());

print("Main Course Items:"); printjson(database.menu.find({category: "Main Course"}).toArray());

print("Price 200 and above:"); printjson(database.menu.find({price: {$gte: 200}}).toArray());

print("Starter or Dessert:"); printjson(database.menu.find({
  $or: [{category: "Starter"}, {category: "Dessert"}]
}).toArray());

print("Cheese Ingredient:");
printjson(database.menu.find({ingredients: "Cheese"}).toArray());

print("Selected Fields:"); printjson(database.menu.find(
  {},
  {name: 1, category: 1, price: 1, _id: 0}
).toArray());

print("One Dish:"); printjson(database.menu.findOne({dish_id: 101}));

print("Main Course Count:"); print(database.menu.countDocuments({category: "Main Course"}));

// UPDATE OPERATIONS
database.menu.updateOne(
  {dish_id: 101},
  {$set: {price: 280, category: "Chef Special"}}
);

database.menu.updateMany(
  {category: "Main Course"},
  {$push: {ingredients: "Fresh Herbs"}}
);

database.menu.updateOne(
  {dish_id: 102},
  {$inc: {stock: 10}}
);

// INDEXING
database.menu.createIndex(
  {dish_id: 1},
  {unique: true}
);

print("Indexes:"); printjson(database.menu.getIndexes());

// DELETE OPERATIONS
database.menu.deleteOne({dish_id: 104});

database.menu.deleteMany({stock: {$lt: 20}});

print("Remaining Menu Items:"); printjson(database.menu.find().toArray());

print("EXPERIMENT 10 COMPLETED SUCCESSFULLY");