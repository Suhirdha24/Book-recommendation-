const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://suhirdhasivakumar_db_user:SJvAszC8ct9tKdOp@cluster0.fnmm7ku.mongodb.net/?retryWrites=true&w=majority";

async function run() {
  const client = new MongoClient(uri);
  try {
    console.log("Connecting to MongoDB Atlas...");
    await client.connect();
    console.log("Connected successfully!");

    const admin = client.db().admin();
    const dbs = await admin.listDatabases();
    console.log("Databases in cluster:", dbs.databases.map(d => `${d.name} (${d.sizeOnDisk} bytes)`));

    for (const dbInfo of dbs.databases) {
      if (['admin', 'local', 'config'].includes(dbInfo.name)) continue;
      const db = client.db(dbInfo.name);
      const collections = await db.listCollections().toArray();
      console.log(`\n--- DB: ${dbInfo.name} ---`);
      for (const col of collections) {
        const count = await db.collection(col.name).countDocuments();
        console.log(`  Collection: ${col.name} (Count: ${count})`);
        const sample = await db.collection(col.name).find().limit(3).toArray();
        console.log(`  Sample docs from ${col.name}:`, JSON.stringify(sample, null, 2));
      }
    }
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  } finally {
    await client.close();
  }
}

run();
