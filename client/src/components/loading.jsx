import React from 'react'

export default function Loading({ children, loading }) {
    return (
        <>{!loading ? <>{children}</> :
            <div className="flex justify-center items-center h-screen fixed top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden bg-gray-300 opacity-75">
                <div className="spinner-border animate-spin inline-block w-8 h-8 rounded-full" role="status">
                    <span className="visually-hidden">
                        <div
                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                            role="status">
                            <span
                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                            >
                                Loading...
                            </span>
                        </div>
                    </span>
                </div>
            </div>
        }
        </>
    )
}