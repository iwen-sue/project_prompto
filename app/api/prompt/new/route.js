import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const { prompt, userID, tag } = await req.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userID,
            prompt,
            tag,
        });
        newPrompt.save();
        return new Response(JSON.stringify(newPrompt), {status: 201});
    } catch (error) {
        return new Response('Fail to create new prompt', {status: 500});
    }
}