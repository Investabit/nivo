/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import PointerIcon from 'react-icons/lib/fa/hand-pointer-o'
import ActionsLoggerLog from './ActionsLoggerLog'

export const useActionsLogger = () => {
    const [actions, setActions] = useState([])
    const logAction = useCallback(
        action => {
            setActions(actions => {
                return [action, ...actions]
            })
        },
        [setActions]
    )

    return [actions, logAction]
}

const Wrapper = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    --innerWidth: calc(100% - ${({ theme }) => theme.dimensions.miniNavWidth}px);
    --partialWidth: calc(var(--innerWidth) * 0.6);
    ${({ isFullWidth, theme }) => {
        if (isFullWidth) {
            return `
                width: var(--partialWidth);
            `
        }

        return `
            border-left: 1px solid ${theme.colors.border};
            width: calc(var(--partialWidth) / 2);
        `
    }}
    background: ${({ theme }) => theme.colors.cardAltBackground};
    --innerHeight: calc(100% - ${({ theme }) => theme.dimensions.headerHeight}px);
    height: calc(var(--innerHeight) * 0.45);
    z-index: 10;
    overflow-x: hidden;
    overflow-y: auto;

    @media only screen and (min-width: 760px) and (max-width: 1000px) {
        & {
            right: 0;
            bottom: 0;
            --innerHeight: calc(100% - ${({ theme }) => theme.dimensions.headerHeight}px);
            height: calc(var(--innerHeight) * 0.45);
            ${({ isFullWidth, theme }) => {
                if (isFullWidth) {
                    return `width: 60%;`
                }

                return `
                    border-left: 1px solid ${theme.colors.border};
                    width: calc(60% * 0.5);
                `
            }}
        }
    }

    @media only screen and (max-width: 760px) {
        & {
            position: relative;
            right: auto;
            bottom: auto;
            width: auto;
            height: auto;
            border-left-width: 0;
            z-index: 0;
        }
    }
`

const Header = styled.div`
    top: 0;
    left: 0;
    padding: 7px 12px;
    background: ${({ theme }) => theme.colors.cardBackground};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 600;
`

const EmptyContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    opacity: 0.4;
    padding: 20px;
`

const EmptyMessage = styled.div`
    text-align: center;
    margin-top: 16px;
`

const EmptyIcon = styled(PointerIcon)``

const ActionsLogger = ({ actions, isFullWidth }) => {
    return (
        <Wrapper isFullWidth={isFullWidth}>
            <Header>Actions Logs</Header>
            {actions.length === 0 && (
                <EmptyContainer>
                    <EmptyIcon size={32} />
                    <EmptyMessage>Start interacting with the chart to log actions</EmptyMessage>
                </EmptyContainer>
            )}
            {actions.map((action, i) => {
                return (
                    <ActionsLoggerLog key={`${i}.${action.type}.${action.label}`} action={action} />
                )
            })}
        </Wrapper>
    )
}

ActionsLogger.propTypes = {
    isFullWidth: PropTypes.bool,
}

export default ActionsLogger
