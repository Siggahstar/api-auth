import express from "express";
import axios from "axios";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

const API = {
  yourUsername: process.env.API_USERNAME,
  yourPassword: process.env.API_PASSWORD,
  yourAPIKey: process.env.API_KEY,
  yourBearerToken: process.env.BEARER_TOKEN,
}

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const result = await axios.get(process.env.API_URL + "/random");
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
}); 

app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios.get(
      process.env.API_URL + "/all?page=2",
      {},
      {
        auth: {
          username: process.env.API_USERNAME,
          password: process.env.API_PASSWORD,
        },
      }
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const result = await axios.get(process.env.API_URL + "/filter", {
      params: {
        score: 5,
        apiKey: process.env.API_KEY,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

const config = {
  headers: { Authorization: `Bearer ${process.env.BEARER_TOKEN}` },
};

app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get(process.env.API_URL + "/secrets/2", config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



//TODO 1: Fill in your values for the 3 types of auth.

  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.

  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */

  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.

  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */