import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchuser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
async function Page ({ params }: { params: {id: string}}){
    if(!params.id) return null;
    const user = await currentUser();
    if(!user) return null;
    const userInfo = await fetchuser(user.id);
    if(!userInfo?.onboarded) redirect ('/onboarding');
    
    const thread = await fetchThreadById(params.id);
    return (
        <section className="relative">
            <div>
            <ThreadCard
                key={thread.id}
                id={thread._id}
                currentUserId={user?.id || ""}
                parentId={thread.parentId}
                author={thread.author}
                content={thread.text}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
                />
            </div>
            <div className="mt-7">
                <Comment 
                    threadId={thread.id}
                    currentUserImg={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}/>
            </div>
            <div className="mt-10">
                {thread.children.map((childItem: any) =>(
                                <ThreadCard
                                key={childItem.id}
                                id={childItem._id}
                                currentUserId={user?.id || ""}
                                parentId={childItem.parentId}
                                author={childItem.author}
                                content={childItem.text}
                                community={childItem.community}
                                createdAt={childItem.createdAt}
                                comments={childItem.children}
                                isComment
                                />
                ))}
            </div>
        </section>
    )
}
export default Page;