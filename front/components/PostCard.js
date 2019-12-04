import React from 'react';
import { Card, Icon, Button, Avatar } from 'antd';
import PropTypes from 'prop-types';

const PostCard = ( { post } ) => {
    return(
        <>
            <Card
                key={+post.createdAt}
                cover={post.img && <img src={post.img} alt="example" />}
                actions={[
                    <Icon type="retweet" ket="retweet" />,
                    <Icon type="heart" ket="heart" />,
                    <Icon type="message" ket="message" />,
                    <Icon type="ellipsis" ket="ellipsis" />,
                ]}
                extra={<Button>팔로우</Button>}
            >
                <Card.Meta 
                    avatar = {<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={post.content}
                />
            </Card>
        </>
    )
};

PostCard.propTypes = {
    post: PropTypes.shape({
        User: PropTypes.object,
        content: PropTypes.string,
        img: PropTypes.string,
        createdAt: PropTypes.object,
    }),
};

export default PostCard