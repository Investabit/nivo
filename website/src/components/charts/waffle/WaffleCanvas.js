/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ResponsiveWaffleCanvas, WaffleDefaultProps } from '@nivo/waffle'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import ActionsLogger, { useActionsLogger } from '../../ActionsLogger'
import Settings from '../../Settings'
import { groupsByScope } from './WaffleControls'
import generateCode from '../../../lib/generateChartCode'
import nivoTheme from '../../../nivoTheme'
import config from '../../../config'
import propsMapper from './propsMapper'
import ChartPage from '../ChartPage'

const generateData = () => [
    {
        id: 'car',
        label: 'car',
        value: Math.random() * 20,
        color: '#eaafaf',
    },
    {
        id: 'walk',
        label: 'walk',
        value: Math.random() * 20,
        color: '#a2738c',
    },
    {
        id: 'scooter',
        label: 'scooter',
        value: Math.random() * 20,
        color: '#645c84',
    },
    {
        id: 'bicycle',
        label: 'bicycle',
        value: Math.random() * 20,
        color: '#427996',
    },
    {
        id: 'e-bicycle',
        label: 'e-bicycle',
        value: Math.random() * 20,
        color: '#42291c',
    },
    {
        id: 'moto',
        label: 'moto',
        value: Math.random() * 20,
        color: '#3f5468',
    },
    {
        id: 'other',
        label: 'other',
        value: Math.random() * 20,
        color: '#b8e4c9',
    },
]

const initialSettings = {
    pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

    total: 140,

    rows: 40,
    columns: 40,
    fillDirection: 'bottom',
    padding: 0.5,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 120,
    },

    theme: nivoTheme,
    emptyColor: '#cccccc',
    emptyOpacity: 1,
    colors: 'category10',
    colorBy: 'id',
    borderWidth: 0,
    borderColor: {
        type: 'inherit:darker',
        gamma: 0.3,
    },

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,

    legends: [
        {
            anchor: 'top-left',
            direction: 'column',
            justify: false,
            translateX: -100,
            translateY: 0,
            itemsSpacing: 4,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            itemTextColor: '#777',
            symbolSize: 20,
            onClick: data => {
                alert(JSON.stringify(data, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000',
                        itemBackground: '#f7fafb',
                    },
                },
            ],
        },
    ],
}

const WaffleCanvas = () => {
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateData())
    const diceRoll = useCallback(() => setData(generateData()), [setData])
    const [actions, logAction] = useActionsLogger()
    const onClick = useCallback(
        node => {
            let label
            if (node.data && node.data.value !== undefined) {
                label = `${node.data.label}: ${node.data.value} (position: ${node.position})`
            } else {
                label = `empty at position: ${node.position}`
            }
            logAction({
                type: 'click',
                label: `[cell] ${label}`,
                data: node,
            })
        },
        [logAction]
    )

    const mappedSettings = propsMapper(settings)

    const code = generateCode(
        'ResponsiveWaffleCanvas',
        {
            ...mappedSettings,
            tooltip: mappedSettings.tooltip ? 'CustomTooltip(props) => (…)' : undefined,
        },
        {
            pkg: '@nivo/waffle',
            defaults: WaffleDefaultProps,
        }
    )

    return (
        <ChartPage>
            <ChartHeader chartClass="WaffleCanvas" tags={['@nivo/waffle', 'canvas']} />
            <div className="chart-description">
                <p className="description">
                    A variation around the <Link to="/waffle">Waffle</Link> component. Well suited
                    for large data sets as it does not impact DOM tree depth and does not involve
                    React diffing stuff for children (not that useful when using canvas), however
                    you'll lose the isomorphic ability and transitions (for now).
                </p>
                <p className="description">
                    You can also see more example usages in{' '}
                    <a
                        href={`${
                            config.storybookUrl
                        }?selectedKind=WaffleCanvas&selectedStory=default`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        the storybook
                    </a>
                    .
                </p>
                <p className="description">
                    The responsive alternative of this component is{' '}
                    <code>ResponsiveWaffleCanvas</code>, it also offers other implementations, see{' '}
                    <Link to="/waffle">Waffle</Link> and <Link to="/waffle/html">WaffleHtml</Link>.
                </p>
            </div>
            <ChartTabs
                chartClass="waffle"
                code={code}
                data={data}
                diceRoll={diceRoll}
                nodeCount={settings.rows * settings.columns}
            >
                <ResponsiveWaffleCanvas data={data} {...mappedSettings} onClick={onClick} />
            </ChartTabs>
            <ActionsLogger actions={actions} />
            <Settings
                component="WaffleCanvas"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.WaffleCanvas}
            />
        </ChartPage>
    )
}

export default WaffleCanvas
