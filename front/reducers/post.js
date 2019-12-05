export const initialState = {
    mainPosts : [{
        User : {
            id : 1,
            nickname : '이성재', 
        },
        content : '안녕하세요',
        img : 'https://cdn.pixabay.com/photo/2016/11/18/18/58/couple-1836407_1280.jpg'
    }],
    imagePaths : [],
};

const ADD_POST = 'ADD_POST';
const ADD_DUMMY = 'ADD_DUMMY';

export const addPost = {
    type : ADD_POST,
};
export const addDummy = {
    type : ADD_DUMMY,
    data : {
        content : 'Hello',
        UserId : 1,
        user : {
            nickname : '제로초'
        }
    }
};

const reducer = (state = initialState , action) => {
    switch(action.type) {
        case ADD_POST : {
            return{
                ...state,
            };
        }
        case ADD_DUMMY : {
            return{
                ...state,
                mainPosts : [action.data , ...state.mainPosts]
            };
        }
        default : {
            return{
                ...state,
            }
        }
    }
};

export default reducer;