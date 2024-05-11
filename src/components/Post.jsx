import React, { useEffect, useState } from 'react';
import services from '../database/services/services';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn
} from 'mdb-react-ui-kit';
import parse from 'html-react-parser';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

export default function Post() {
    const authData = useSelector((state) => state.auth.auth.authData);
    // console.log(authData.userData.$id);
    const navigate = useNavigate();
    const [post, setPost] = useState({});
    let { slug } = useParams();

    slug = slug.replace(':', '');
    // console.log(slug);

    useEffect(() => {
        try {
            services.getPost(slug).then((postData) => {

                setPost(postData);
                // console.log(postData);
            })
        } catch (error) {
            console.log(error + 'error while fetching post data');
        }

    }, [slug])


    const deletePost = async () => {
        console.log(JSON.stringify());
        const postDeleted = await services.deletePost(slug);
        console.log('post deleted successfully');
        navigate('/');

    }

    const editPost = () => {
        navigate(`/editpost/:${slug}`)
    }


    return (
        <MDBCard>
            <MDBCardImage src={services.imagePreview(post.featuredImage)} position='top' alt='...' />
            <MDBCardBody>
                <MDBCardTitle>{post.title}</MDBCardTitle>
                <MDBCardText>
                    {parse(`${post.content}`)}
                </MDBCardText>
                {authData.userData.$id === '65b2fb305ae57e56c039' ? <>  <MDBBtn onClick={editPost}>Edit</MDBBtn>
                    <MDBBtn onClick={deletePost} className='bg-danger'>Delete</MDBBtn></> : null}


            </MDBCardBody>
        </MDBCard>
    );
}