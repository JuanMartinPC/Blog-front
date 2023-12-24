import { useState, useEffect, createContext } from "react"

const PostContext = createContext()

export const PostContextProvider = ({children}) => {

    const [post, setPost] = useState([])
    const [update, setUpdate] = useState([])

    const [paperbin, setPaperbin] = useState([])
    const user_id = localStorage.getItem('user_id')

    const [userPost, setUserPost] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:3000/posts/feed`).then(res => res.json()).then(data => setPost(data))
        console.log(post);
    },[])

    useEffect(()=>{
        fetch(`http://localhost:3000/posts?id=${user_id}`).then(res => res.json()).then(data => setUserPost(data))
    },[])

    useEffect(()=>{
        fetch("http://localhost:3000/posts/getPaperBin").then(res => res.json()).then(data => setPaperbin(data))
    },[])

    return (
        <PostContext.Provider value = {{ post, setPost, userPost, setUserPost, paperbin, setPaperbin, update, setUpdate}}>
            {children}
        </PostContext.Provider>
    )

}

export default PostContext;