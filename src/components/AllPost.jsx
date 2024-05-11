import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import services from '../database/services/services'

function AllPost() {
    const [allPosts, setAllPosts] = useState();

    useEffect(() => {
        console.log('inside allpost.jsx')
        services.getAllPosts().then((allPostsData) => {
            // console.log(JSON.stringify(allPostsData) + 'this is all post data')
            setAllPosts(allPostsData.documents)
        })


    }, [])
    return (
        <>
            {allPosts?.map((post) => (
                <PostCard key={post.$id} post={post}></PostCard>
            ))}

        </>
    )
}

export default AllPost