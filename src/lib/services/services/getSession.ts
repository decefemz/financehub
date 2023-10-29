import DB from '$lib/db';
import Errors from '$lib/errors';
import Models from '$lib/models';
import type { Session } from '$lib/models/Session/Session';
import { eq } from 'drizzle-orm';

export default async function getSession(sessionID: string): Promise<Session> {
	try {
		const session = (
			await DB.select().from(Models.Sessions).where(eq(Models.Sessions.id, sessionID))
		)[0];
		if (!session) throw Errors.Auth.userNotLoggedIn();
		return session;
	} catch (e: any) {
		throw e;
	}
}
