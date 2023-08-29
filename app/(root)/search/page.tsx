import UserCard from '@/components/cards/UserCard';
import { fetchuser, fetchusers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import {redirect} from 'next/navigation';
const Page = async() => {
    const user = await currentUser();
    if(!user) return null;
    const userInfo = await fetchuser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding');

    //fetch users
    const result = await fetchusers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 25
    })
    return (
        <section>
            <h1 className="head-text mb-10">Search</h1>
            {/* searchbar  */}
            <div className='mt-14 flex flex-col gap-9'>
                {result.users.length === 0? (
                    <p className='no-result'>No users</p>
                ) : (
                    <>
                    {result.users.map((person) => (
                        <UserCard 
                            key={person.id}
                            id={person.id}
                            name={person.name}
                            username={person.username}
                            imgUrl={person.image}
                            personType="User"
                        />
                    ))}
                    </>
                )}
            </div>
        </section>
    )
}
export default Page;