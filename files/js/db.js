export const sdk = require("node-appwrite");
const { Client, Databases } = sdk;
const crypto = require("crypto");

export const client = new Client();

client
  .setEndpoint("https://s.codeko.ro/v1")
  .setProject("65eba08af0c0ba865a40")
  .setKey(
    "22465f6eafaa596c17a3a4f02f1bd3181aac81dcfac0dfc3b9d92a8c99d42f9fa26c5c51d0639423fafaa80f696bfd86a77020fbd9bd4a78d27ac2bbc5134010ec5927849c4b5a01fddc6dc321320628cfd909b5e739f80fce1673b666ae1bee1af92f869746f1aacf166194293c9fcca64434b3fd140ad32c5a47f16e2354fd"
  )
  .setSelfSigned();

export const databases = new Databases(client);
export const ID = sdk.ID;

export async function verify(email, passs) {
  const findPromise = await databases.listDocuments(
    "65eba297f2b27e0ab9d0",
    "65eba72d2fab460660a2",
    [sdk.Query.limit(5000)]
  );

  const user = findPromise.documents.find((user) => user.email === email);
  if (!user) return { error: "User doesn't exist", status: false, user: undefined};

  const pass = crypto.createHash("md5").update(passs).digest("hex");
  const good = (user.pass === pass);

  if (!good) return { error: "Invalid password", status: false, user: undefined};
  return { status: true, user: user};
}
