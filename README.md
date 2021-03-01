# Unique Random Docs
### Allows to fetching random absolutely unique docs from MongoDB collection 

## Problem
Starting with the 3.2 release of MongoDB, you can get N random docs from a collection using the $sample aggregation pipeline operator:
```js
db.mycoll.aggregate([{ $sample: { size: 14 } }])
```
problem is that docs you get can  be not unique, and can be duplicated

## Solving

 To solve this problem, you can use this package. It's recursive filtering all you fetching docs, and returns only unique ones!


## Usage
Your need to install mongoose in your project 
```js
npm i mongoose
```
then
```js
npm i unique-random-docs
```
then in your module where you want get random unique docs from colection:
```js
const getUniqeRandomDocuments = require('unique-random-docs')
const SomeItemsSchema = require("../models/items");
```

and a code as example:

```js
exports.aggregate = async function (req, res) {
  try {
  const response = await getUniqeRandomDocuments('Items', SomeItemsSchema, 5 );
  res.send(response);
} catch (err) {
  console.log(err)
}
```
```
getUniqeRandomDocuments(collection, schema, size, set)
```
- collection - represent collection name, in this case 'Items'
- schema - schema for collection, in this case exported from mongoose SomeItemsSchema
- size - counts a number of unique docs that you want to take, we get 5.
- [set](https://docs.mongodb.com/manual/reference/operator/aggregation/set/) -  $set (aggregation) optional paramater, outputs documents that contain all existing fields from the input documents, for specific search.


## License

MIT

**Free Software, Hell Yeah!**