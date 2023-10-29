import {
	type PlanetScalePreparedQueryHKT,
	type PlanetscaleQueryResultHKT,
	drizzle
} from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';
import Models from '../models';
import type { MySqlTransaction } from 'drizzle-orm/mysql-core';
import type { ExtractTablesWithRelations } from 'drizzle-orm';
import { DB_HOST, DB_PASSWORD, DB_USERNAME } from '$env/static/private';

const connection = connect({
	host: DB_HOST,
	username: DB_USERNAME,
	password: DB_PASSWORD
});

console.log({
	host: process.env,
	username: DB_USERNAME,
	password: DB_PASSWORD
});

const DB = drizzle(connection);

export default DB;

type Transaction = MySqlTransaction<
	PlanetscaleQueryResultHKT,
	PlanetScalePreparedQueryHKT,
	Record<string, never>,
	ExtractTablesWithRelations<Record<string, never>>
>;

export { Models, type Transaction };
