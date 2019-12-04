import React from 'react';
import { Form, Input, Button, Card, Icon, Avatar } from 'antd';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';


const dummy = {
    imagePaths : [],
    isLoggedIn : true,
    mainPost : [{
        User : {
            id : 1,
            nickname : '이성재', 
        },
        content : '안녕하세요',
        img : 'https://cdn.pixabay.com/photo/2016/11/18/18/58/couple-1836407_1280.jpg'
    }],
}

const HOME = () => {
    return(
        <div>
            {dummy.isLoggedIn && (
                <>
                    <PostForm></PostForm>
                </>
            )}
            {dummy.mainPost.map((c) => {
                return(
                    <PostCard key={c} post={c}></PostCard>
                )
            })}
            
        </div>
    );
};

export default HOME;