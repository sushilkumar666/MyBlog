import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import auth from '../database/auth/auth';
import services from '../database/services/services';
import PostCard from '../components/PostCard';

function MyPost() {

    const authData = useSelector((state) => (state.auth.auth.authData));
    const [myPost, setMyPost] = useState();
    console.log(JSON.stringify(authData) + 'authdata');


    useEffect(() => {
        console.log('inside mypost');
        services.getCurrentUserPosts(authData?.userData.$id).then((myPosts) => {

            setMyPost(myPosts.documents);

        }).catch((err) => console.error(err + 'error while getting myPosts'))
    }, [authData]);



    if (myPost?.length > 0) {
        return (
            <div>
                {myPost?.map((post) => (
                    <PostCard post={post} />
                ))}
            </div>
        )
    }
    else {
        return (<h1>you don't have any posts Add some posts</h1>)
    }

}

export default MyPost