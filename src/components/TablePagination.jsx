import { useState } from "react";

const TablePagination = ({ columnas, datos, total, page, fetchData, handleEdit, handleDelete, handleShow, handleAddCarrito, handlePDF }) => {

    const [itemsPerPage, setItemsPerPage] = useState(4)

    return (
        <>
            <table className="w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        {columnas.map((columna, index) => (
                            <th className="py-2 px-4 text-left text-sm font-medium uppercase" key={index}>{columna.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {datos.map((reg, index) => (
                        <tr key={reg.id}>
                            {columnas.map((col, pos) => (
                                <td className="py-2 px-4 text-sm text-gray-500" key={pos}>{eval('reg.' + col.key)}</td>
                            ))}
                            <td className="py-2 px-4 text-sm text-gray-500">

                                {handleAddCarrito &&

                                    <button className="py-1 px-2 bg-yellow-500 text-white hover:bg-yellow-600 rounded" onClick={() => handleAddCarrito(reg)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                            <path d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                }
                                {handleShow &&

                                    <button className="py-1 px-2 bg-green-500 text-white hover:bg-green-600 rounded" onClick={() => handleShow(reg)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                            <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </button>
                                }
                                {handleEdit &&

                                    <button className="py-1 px-2 bg-blue-500 text-white hover:bg-blue-600 rounded" onClick={() => handleEdit(reg)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                            <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </button>
                                }
                                {handleDelete &&

                                    <button className="py-1 px-2 bg-red-500 text-white hover:bg-red-600 rounded" onClick={() => handleDelete(reg)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                            <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                }
                                {handlePDF &&

                                    <button className="py-1 px-2 bg-red-500 text-white hover:bg-red-600 rounded" onClick={() => handlePDF(reg)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                                        </svg>
                                    </button>
                                }
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>
            <div className="flex justify-center mt-4">
                <nav className="inline-flex rounded-md shadow">
                    <button onClick={() => fetchData(page - 1)} disabled={page == 1} className="py-2 px-4 bg-gray-200 text-gray-500 hover:bg-gray-300 rounded-l-md">
                        anterior
                    </button>
                    {total > itemsPerPage && (
                        <div className="flex">
                            {Array.from({ length: Math.ceil(total / itemsPerPage) }).map((_, index) => (
                                <button key={index} onClick={() => fetchData(index + 1)} className={`${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} py-2 px-4 mx-1 rounded-md focus:outline-none`}>
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    )}
                    <button onClick={() => fetchData(page + 1)} disabled={page == Math.ceil(total / itemsPerPage)} className="py-2 px-4 bg-gray-200 text-gray-500 hover:bg-gray-300 rounded-r-md">
                        siguiente
                    </button>
                </nav>
            </div>
        </>
    );
}

export default TablePagination;