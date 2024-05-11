import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import services from '../database/services/services';

import { Link } from 'react-router-dom';

export default function PostCard({ post }) {

    return (
        <Link to={`/post/:${post.$id}`} >

            <Card style={{ width: '18rem' }}>

                <Card.Img variant="top" src={services.imagePreview(post.featuredImage)} />
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>


                </Card.Body>
            </Card>






        </Link>
    );
}