import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MyForm from '../components/MyForm';
import services from '../database/services/services';

function EditPage() {
    let { slug } = useParams();

    const [post, setPost] = useState({});
    slug = slug.replace(':', '');
    useEffect(() => {
        console.log(slug);
        if (slug) {
            services.getPost(slug).then((postData) => {
                setPost(postData);
            })


        }
    }, [])


    return (
        <div>
            <MyForm post={post} />
        </div>
    )
}

export default EditPage