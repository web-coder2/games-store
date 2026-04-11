import { useState, useEffect } from 'react'
import { setDataList, getDataList, setUser } from '../reduxSetup.js'

function FormComment({ gameTitle, game, userObject }) {

    const [userComment, setUserComment] = useState('')
    const [allComments, setAllComments] = useState([])

    function changeSelfComment(event) {
        setUserComment(event.target.value);
    }

    async function getCommentsByGame() {

        console.log(game)

        let responseByComments = await getDataList('comments/getByTitle', {
            gameTitle: gameTitle
        })
        console.log(responseByComments)

        let comments = responseByComments.data.comments

        setAllComments([...comments])
    }

    async function addNewComment() {

        console.log(game)

        await setDataList('comments/create', {
            gameTitle: gameTitle,
            gameId: game, 
            userName: userObject.userNick, 
            selfComment: userComment
        })

        setUserComment('')

        await getCommentsByGame()
    }

    useEffect(() => {
        getCommentsByGame()
    }, [game])

    return (
        <div className='mt-5 container-fluid mb-5'>
            <h3 className='text-center text-light'>Написать коментарий к игре <span className='text-danger'>{ gameTitle }</span></h3>
            <p className='text-success'>коментарйи соатвистя под ником <strong className='text-warning'>{ userObject.userNick }</strong></p>
            <textarea value={userComment} onChange={changeSelfComment} className='form-control bg-dark text-warning mt-3'></textarea>
            <button onClick={ () => { addNewComment() } } className='btn btn-primary w-50 mt-3'>Оставить коментарйи</button>
            
            <div className='mt-5'>
                <h3 className='text-warning text-center mb-5'>Другие коментарие</h3>
                {
                    allComments.map((comment) => {
                        return (
                            <div key={comment._id}>
                                <h5 className='text-danger'>{ comment.userComment }</h5>
                                <p>{ comment.selfComment }</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

}

export default FormComment 