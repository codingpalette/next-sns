import React from 'react';
import { Form, Input, Button, Card, Icon, Avatar } from 'antd';


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
                <Form encType="multipart/form-data">
                    <Input.TextArea maxLength={140} placeholder="일상생활을 적어주세요" />
                    <div>
                        <input type="file" multiple hidden />
                        <Button>이미지 업로드</Button>
                        <Button type="primary" style={{float:'right'}} htmlType="submit">등록</Button>
                    </div>
                    <div>
                        {dummy.imagePaths.map((v , i) => {
                            return(
                                <div key={v} style={{display:'inline-block'}}>
                                    <img src={'http://localhost:3065/' + v} style={{width:'200px'}} alt={v} />
                                    <div>
                                        <Button>제거</Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Form>
                </>
            )}
            {dummy.mainPost.map((c) => {
                return(
                    <Card
                        key={+c.createdAt}
                        cover={c.img && <img src={c.img} alt="example" />}
                        actions={[
                            <Icon type="retweet" ket="retweet" />,
                            <Icon type="heart" ket="heart" />,
                            <Icon type="message" ket="message" />,
                            <Icon type="ellipsis" ket="ellipsis" />,
                        ]}
                        extra={<Button>팔로우</Button>}
                    >
                        <Card.Meta 
                            avatar = {<Avatar>{c.User.nickname[0]}</Avatar>}
                            title={c.User.nickname}
                            description={c.content}
                        />

                        
                    </Card>
                )
            })}
            
        </div>
    );
};

export default HOME;