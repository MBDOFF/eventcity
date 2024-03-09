const fs = require("fs");
const csv = require("csv-parser");

const sdk = require("node-appwrite");

let client = new sdk.Client();

client
  .setEndpoint("https://s.codeko.ro/v1")
  .setProject("65eba08af0c0ba865a40")
  .setKey(
    "22465f6eafaa596c17a3a4f02f1bd3181aac81dcfac0dfc3b9d92a8c99d42f9fa26c5c51d0639423fafaa80f696bfd86a77020fbd9bd4a78d27ac2bbc5134010ec5927849c4b5a01fddc6dc321320628cfd909b5e739f80fce1673b666ae1bee1af92f869746f1aacf166194293c9fcca64434b3fd140ad32c5a47f16e2354fd"
  )
  .setSelfSigned();

const databases = new sdk.Databases(client);
const ID = sdk.ID;

fs.createReadStream("./file.csv")
  .pipe(csv())
  .on("data", function (data) {
    try {
      let event = {
        name: data["Nume"],
        date: data["Data Inceput"] + ":" + data["Data Finala"],
        city: data["Oras"],
        location: data["Locatie"],
        coords: data["GPS ALL"],
        tags: data["Categorie"],
        desc: data["Descriere"],
        start: data["Ora Inceput"],
        organizer: "65ecbf3568251f276162",
        author: data["Organizat de"],
        image: data["POZA"],
      };

      databases
        .createDocument(
          "65eba297f2b27e0ab9d0",
          "65eba31400845ba99440",
          ID.unique(),
          event
        )
        .then((response) => {

        })
        .catch((err) => {
          console.log(event, err);
        });
    } catch (err) {}
  })
  .on("end", function () {});
