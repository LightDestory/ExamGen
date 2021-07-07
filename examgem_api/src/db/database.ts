import mongoose from "mongoose";

const configuration = require('dotenv').config();

class Database {
    private db_url: string;
    private static instance: Database | undefined;

    private constructor() {
        this.db_url = process.env.DB_URL || "mongodb://localhost/examgen_data"
    }

    async isConnected(): Promise<boolean> {
        return await mongoose.connect(this.db_url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
            .then(db => {
                return true;
            })
            .catch(() => {
                return false
            })
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance;
    }
}

const db: Database = Database.getInstance();

export default db