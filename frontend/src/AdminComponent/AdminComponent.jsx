import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getDataList, setDataList } from '../reduxSetup.js'



function AdminComponent() {

    const [usersList, setUsersList] = useState([])

    async function getUsersList() {
        try {
            const usersList = await getDataList('users/usersList', {})
            const usersArray = usersList.data.data

            console.log(usersArray)
            setUsersList([...usersArray])

        } catch (e) {
            console.log(e.message)
        }
    }

    const handleRoleChange = (userId, newRole) => {
        setUsersList(prevUsers =>
            prevUsers.map(user =>
            user._id === userId ? { ...user, userRank: newRole } : user
            )
        )
    }

    async function updateUserObject(user) {

        try {
            await setDataList('users/editRole', {
                newUserObject: user
            })
            await getUsersList()
        } catch (e) {
            console.log(e.message)
        }

    }

    useEffect(() => {
        getUsersList()
    }, [])


    return (
        <div>

            <h3 className="text-center">Админка !!!</h3>
            <p className="text-center">Список юзеров</p>

            <div className="container mt-5 row">
                {
                    usersList.map((user) => {
                        return (
                            <div key={ user._id } className="card col-sm-4 gap-2 bg-dark text-light">
                                <h3 className="text-success">User: { user.login }</h3>
                                <p className="text-danger">userNick: { user.userNick }</p>
                                <p className="text-success">password: { user.password }</p>
                                <p className="text-warning">userRank: { user.userRank }</p>
                                <select className="form-control bg-dark text-light" value={user.userRank} onChange={(e) => handleRoleChange(user._id, e.target.value)}>
                                    <option value="user" label="user"></option>
                                    <option value="superUser" label="superUser"></option>
                                    <option value="admin" label="admin"></option>
                                    <option value="dev" label="dev"></option>
                                    <option value={ null } label="без роли"></option>
                                </select>
                                <button className="btn btn-outline-danger mt-3 mb-3" onClick={ () => { updateUserObject(user) }}>Назначить новую роль</button>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )

}

export default AdminComponent