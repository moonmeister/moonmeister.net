/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly EMDASH_EMAIL_FROM: string;
	readonly EMDASH_EMAIL_FROM_NAME: string;
	readonly EMDASH_EMAIL_REPLY_TO: string;
}
