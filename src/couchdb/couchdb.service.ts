import { Injectable, OnModuleInit } from '@nestjs/common';
import * as nano from 'nano';

@Injectable()
export class Couch_DB_Service implements OnModuleInit {
    private couch: nano.ServerScope;
    private database: nano.DocumentScope<any>;

    async onModuleInit() {
        this.couch = nano(process.env.COUCHDB_URL || 'http://localhost:5984');

        const db_name = 'offline-pos-databases';
        const databases = await this.couch.db.list();

        if(!databases.includes(db_name)){
            await this.couch.db.create(db_name);
        }

        this.database = this.couch.db.use(db_name);
    }

    async create_document(doc: any): Promise<any> {
        return this.database.insert(doc);
    }

    async get_document_by_id(document_id: string): Promise<any> {
        return this.database.get(document_id);
    }

    async update_document(document_id: string, doc:any): Promise<any> {
        return this.database.insert({_id: document_id, ...doc});
    }

    async delete_document(document_id: string): Promise<any> {
        const document = await this.get_document_by_id(document_id);
        return this.database.destroy(document_id, document._rev);
    }
}