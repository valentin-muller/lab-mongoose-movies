const mongoose = require("mongoose");
const Celebrity = require("./../models/Celebrity");

const dbName = "celebsDB";

const celebrityArray = [
    {
        name: "asdsa",
        occupation: "asdas",
        catchPhrase: "asdas"
    },
    {
        name: "name",
        occupation: "occupation",
        catchPhrase: "catchPhrase"
    },
    {
        name: "name",
        occupation: "occupation",
        catchPhrase: "catchPhrase"
    }
];


// SEED SEQUENCE

// 1. ESTABLISH CONNECTION TO MONGO
mongoose
  .connect(`mongodb://localhost/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    // 2. CREATE DOCUMENTS FROM THE ARRAY OF books
    const pr = Celebrity.create(celebrityArray);
    return pr; // Forward the pending promise to the next `then()`
  })
  .then(createdCelebs => {
    console.log(`Created ${createdCelebs.length} celebs`);

    // 3. CLOSE THE DB CONNECTION
    const pr = mongoose.connection.close();
    return pr;
  })
  .then(() => console.log("Connection closed!"))

  .catch(err => console.error("Error connecting to mongo", err));
