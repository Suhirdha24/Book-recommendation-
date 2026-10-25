const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://suhirdhasivakumar_db_user:SJvAszC8ct9tKdOp@cluster0.fnmm7ku.mongodb.net/?retryWrites=true&w=majority";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const admin = client.db().admin();
    const dbs = await admin.listDatabases();
    console.log("Databases:", dbs.databases.map(d => d.name));

    for (const d of dbs.databases) {
      if (['admin', 'local', 'config'].includes(d.name)) continue;
      const db = client.db(d.name);
      const cols = await db.listCollections().toArray();
      console.log(`\n=== Database: ${d.name} ===`);
      for (const col of cols) {
        const count = await db.collection(col.name).countDocuments();
        console.log(`Collection: ${col.name} (${count} documents)`);
        if (col.name.toLowerCase().includes('book') || col.name.toLowerCase().includes('review') || col.name.toLowerCase().includes('user') || col.name.toLowerCase().includes('reading')) {
          const sample = await db.collection(col.name).findOne();
          console.log(`Sample doc from ${col.name}:`, JSON.stringify(sample, null, 2));
        }
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
