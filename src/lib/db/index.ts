'use server'
import Pool from 'pg-pool'

console.log("key:",process.env.DATABASE_SECRET_KEY)
export const pool = new Pool({
    database:'postgres',
    connectionString:process.env.DATABASE_SECRET_KEY,
    allowExitOnIdle:true
})

pool.on('connect', (client) => {
    console.log('Connection established!');
  });

