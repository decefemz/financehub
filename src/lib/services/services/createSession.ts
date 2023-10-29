import DB, { type Transaction } from '$lib/db';
import Models from '$lib/models';
import type { Session } from '$lib/models/Session/Session';
import { ulid } from 'ulid';

interface CreateUserUserAccountParams {
	Tx?: Transaction;
	userProfileId: string;
	userAccountId: string;
	ipAddress?: string;
	userAgent?: string;
	setCookie: (cookieName: string, cookieValue: string, cookieOptions: Record<string, any>) => void;
}

export default async function createSession(params: CreateUserUserAccountParams): Promise<Session> {
	const session: Session = {
		id: ulid(),
		userAccountId: params.userAccountId,
		userProfileId: params.userProfileId,
		ipAddress: params.ipAddress ?? null,
		createdAt: new Date(Date.now()),
		expiresAt: new Date(Date.now() + 31536000000),
		userAgent: params.userAgent ?? null
	};

	try {
		params.Tx
			? await params.Tx.insert(Models.Sessions).values(session).execute()
			: await DB.insert(Models.Sessions).values(session).execute();

		params.setCookie('fh_ses', session.id, {
			httpOnly: true,
			path: '/',
			expires: new Date(Date.now() + 31536000000)
		});
	} catch (e: any) {
		throw e;
	}

	return session;
}
