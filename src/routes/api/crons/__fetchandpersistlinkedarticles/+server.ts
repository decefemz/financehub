import type { RequestHandler } from "./$types";

// __fetchandpersistlinkedarticles
const handler: RequestHandler = async({ur})=>{
    const articleSources = new Map<string, string>();

    async function getSourceID(source:{url:string, name:string}):Promise<string>{
        let sourceID:string = articleSources.get(source.url) ?? "";
        if(sourceID) return sourceID;

        return (
            await Services
        )
    }
}