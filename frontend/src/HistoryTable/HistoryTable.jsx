import { useState, useEffect } from 'react'
import { getDataList } from '../reduxSetup.js'

function HistoryTable() {

    const [tableData, setTableData] = useState([])

    async function getHistoryTableData() {
        const response = await getDataList('history/getAll', {})
        const tableData = response.data.allHistoryRows
        setTableData([...tableData])
    }

    function getColorClassName(stars) {

        let className

        if (stars < 5) {
            className = 'text-danger'
        } else if (stars >= 5 && stars <= 7) {
            className = 'text-warning'
        } else if (stars > 7) {
            className = 'text-success'
        }

        return className
    }

    useEffect(() => {
        getHistoryTableData()
    }, [])

    return (
        <div className='text-center'>
            <h3 className='text-success'>История метакритиков оценки игр</h3>
            
            {

                tableData.length > 0 ? 

                <div className='table-responsive mt-5'>
                    <table className='table table-dark'>
                        <thead>
                            <tr>
                                <th>Дата оценки</th>
                                <th>Юзер</th>
                                <th>игра</th>
                                <th>число звезд</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableData.map((historyRow) => {
                                    return (
                                        <tr>
                                            <td>{ historyRow.dateCritic }</td>
                                            <td>{ historyRow.userNick }</td>
                                            <td>{ historyRow.gameTitle }</td>
                                            <td className={ getColorClassName(historyRow.countStars) }>{ historyRow.countStars }</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                : <h3 className='text-danger'>Истории криткиов пака нет</h3>

            }

        </div>
    )

}


export default HistoryTable