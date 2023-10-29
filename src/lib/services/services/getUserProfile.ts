import DB from '$lib/db';
import Errors from '$lib/errors';
import Models from '$lib/models';
import type { UserProfile } from '$lib/models/Accounts/UserProfiles';
import { eq } from 'drizzle-orm';

export default async function getUserProfile(userProfileID: string): Promise<UserProfile> {
	try {
		const userProfile = (
			await DB.select().from(Models.UserProfiles).where(eq(Models.UserProfiles.id, userProfileID))
		)[0];
		if (!userProfile) throw Errors.Account.noSuchUserExists();

		return userProfile;
	} catch (e: any) {
		throw e;
	}
}
