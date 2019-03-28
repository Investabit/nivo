/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'

export const useActionsLogger = () => {
    const [actions, setActions] = useState([])
    const logAction = useCallback(
        (action) => {
            setActions(actions => {
                return [action, ...actions]
            })
        },
        [setActions]
    )

    return [actions, logAction]
}

const ActionsLogger = ({
    actions,
}) => {
    return (
        <div className="ActionsLogger">
            {actions.map((action, i) => {
                return (
                    <div key={`${i}.${action.type}.${action.label}`}>
                        <div className="ActionsLogger__Header">
                            {action.type}: {action.label}
                        </div>
                        <pre>{JSON.stringify(action.data, null, '  ')}</pre>
                    </div>
                )
            })}
        </div>
    )
}

export default ActionsLogger
