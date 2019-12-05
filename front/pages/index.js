import React, { useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';



const HOME = () => { 
    const { isLoggedIn } = useSelector( state => state.user );
    const { mainPosts } = useSelector( state => state.post );

    return(
        <div>
            {isLoggedIn && (
                <>
                    <PostForm></PostForm>
                </>
            )}
            {mainPosts.map((c) => {
                return(
                    <PostCard key={c} post={c}></PostCard>
                )
            })}
            
        </div>
    );
};

export default HOME;