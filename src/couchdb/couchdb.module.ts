import { Module } from '@nestjs/common';
import { Couch_DB_Service } from './couchdb.service';

@Module ({
    providers: [Couch_DB_Service],
    exports: [Couch_DB_Service],
})
export class Couch_DB_Module{}