import React, { useEffect, useState } from 'react'
import Input from './Input'
import Select from './Select'
import CustomButton from './CustomButton';
import services from '../database/services/services';
import { useForm } from 'react-hook-form'
import RTE from './RTE';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function MyForm({ post }) {
    // console.log(register.title);
    const [image, setImage] = useState(true);
    const [flag, setFlag] = useState(true);
    const navigate = useNavigate();
    const authData = useSelector(state => state.auth.auth.authData);
    const options = ['active', 'inactive'];
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm();

    console.log(JSON.stringify(post))

    useEffect(() => {
        if (post) {
            setValue('title', post.title);
            setValue('slug', post.$id);
            setValue('content', post.content);
            setValue('status', post.status);
            setValue('featuredImage', post.featuredImage);
        }
    }, [post]);





    function slugTransform(value) {
        if (value && typeof value === "string") {

            return value.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().trim();;
            // Trim leading and trailing hyphens

            // console.log(convertedString);

        }
        return "";


    }

    useEffect(() => {

        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform]);


    const submitted = async (data) => {
        let imageUploadedId;
        try {
            if (post) {
                const file = data?.featuredImage[0]

                if (file) {

                    try {
                        const imageUpload = await services.uploadImage(file);
                        imageUploadedId = imageUpload.$id;
                        setValue('featuredImage', imageUploadedId);
                        await services.deleteImage(post.featuredImage);
                    } catch (error) {
                        console.log(error + ': error while uploading image')
                    }
                } else {
                    imageUploadedId = post.featuredImage;
                }

                try {
                    // console.log(imageUploaded);
                    services.updatePost(post.$id, { ...data, featuredImage: imageUploadedId })
                    navigate('/');

                } catch (error) {
                    console.log(error + ' error while updating post');
                }

            }
            else {
                try {

                    const imageUploaded = await services.uploadImage(data.featuredImage[0]);
                    console.log('user id from store ' + JSON.stringify(authData.userData.$id));
                    console.log(JSON.stringify(imageUploaded));
                    const addPost = await services.createPost({ ...data, featuredImage: imageUploaded.$id, userId: authData.userData.$id })
                    console.log('post added');

                } catch (error) {
                    console.log(error + ' error while creating post');
                }
            }
        } catch (error) {

        }


        console.log('submitted ', data);

    }
    console.log(flag + ' flag value outside functino call')

    const handleFileChange = (e) => {
        e.preventDefault();
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
                setFlag(false);

            };
            reader.readAsDataURL(selectedFile);
        }
    };



    return (
        <>
            <form onSubmit={handleSubmit(submitted)} action=""
            >

                <Input placeholder='title' {...register("title", { required: true })} />
                <Input readOnly={true} placeholder='slug' {...register("slug", { required: true })}></Input>
                <RTE control={control} name='content' label='content' defaultValue={getValues("content")} {...register("content")}></RTE>
                {/* <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    {...register('featuredImage', { required: true })}
                ></Input> */}
                <input type="file" {...register('featuredImage')} onChange={handleFileChange} />

                {post && (
                    <div>
                        <h2>Image Preview:</h2>
                        <h2>{flag + ' flag value'}</h2>
                        <img style={{ width: 200, height: 200 }} src={flag ? services.imagePreview(getValues('featuredImage')) : image} alt="Preview" />
                    </div>
                )}
                {/* image ? services.imagePreview(getValues('featuredImage')) : `${image}` */}
                <br />
                <Select options={options} {...register('status')}></Select>

                <CustomButton variant="primary" type='submit'>{post ? 'Update Post' : 'Add Post'}</CustomButton>


            </form>
        </>
    )
}

export default MyForm