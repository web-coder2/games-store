import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { getDataList, setDataList } from '../reduxSetup.js'

const cardGame = function({ gameObject, afterDeleteGame }) {

    const navigate = useNavigate()

    const [showModalToEdit, setShowToEdit] = useState(false)
    const [editGameObject, setEditGameObject] = useState({})

    function openShowEditModal() {
        setShowToEdit(true)
        setEditGameObject({...gameObject})
    }
    
    function closeShowEditModal() {
        setShowToEdit(false)
    }

    async function updateGameObject() {
        const response = await setDataList('games/editGame', {
            newEditGameObject: editGameObject
        })
        setShowToEdit(false)
        await afterDeleteGame()
    }

    const handleChange = (field) => (e) => {
        setEditGameObject(prev => ({
        ...prev,
        [field]: e.target.value
        }));
    }

    async function deleteGame(gameId) {
        try {

            let respone = await setDataList('games/deleteGame', {
                gameId: gameId
            })

            console.log(respone)

            await afterDeleteGame()

        } catch (e) {
            console.log(e.message)
        }
    }

    function redirectToPage(gameId) {
        navigate(`/game/${gameId}`)
    }

    return (

        <div className="card mb-3 bg-dark text-light h-100">
            <div className="card-header text-center d-flex align-items-center">
                <h4 className="card-title mb-0">{gameObject.title}</h4>
                <i className="fas fa-star text-warning ml-auto">{ Math.round(gameObject.rating) }</i>
            </div>
            <div className="card-body">
                <p className="card-text">{gameObject.description}</p>
                <button className="btn btn-success w-100" onClick={() => redirectToPage(gameObject._id)}>read more</button>
                <button className="btn btn-warning w-100 mt-3" onClick={() => { openShowEditModal() }}>обновить игру</button>
                <button className="btn btn-danger w-100 mt-3" onClick={ () => { deleteGame(gameObject._id) } }>
                    <i className="fas fa-trash"></i>
                    <span className="ml-3">Удалить</span>
                </button>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
                <small className="text-muted">{gameObject.dateCreated}</small>
                <strong>Цена: {gameObject.price}</strong>
            </div>


            { showModalToEdit === true ? 

                <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-dark">
                                <h5 className="modal-title text-success">{ editGameObject.title }</h5>
                                <button type="button" className="close" onClick={() => { closeShowEditModal() }} aria-label="Закрыть">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body bg-dark">
                                <input className="form-control bg-dark text-light" onChange={ handleChange('title') } value={ editGameObject.title}></input>
                                {/* <textarea className="form-control bg-dark text-light" onChange={ handleChange('description') } value={ editGameObject.description }></textarea> */}
                                <input className="form-control bg-dark text-light" type="number" onChange={ handleChange('price') } value={ editGameObject.price }></input>
                                <input className="form-control bg-dark text-light" onChange={ handleChange('company') } value={ editGameObject.company }></input>
                                <input className="form-control bg-dark text-light" onChange={ handleChange('rank') } value={ editGameObject.rank }></input>
                            </div>
                            <div className="modal-footer bg-dark">
                                <button className="btn btn-secondary" onClick={() => { closeShowEditModal() }}>Закрыть</button>
                                <button className="btn btn-primary" onClick={() => { updateGameObject() }}>Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>

            : null

            }

        </div>

    )

}

export default cardGame