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
import { ResponsiveScatterPlot, ScatterPlotDefaultProps } from '@nivo/scatterplot'
import config from '../../../config'
import nivoTheme from '../../../nivoTheme'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import ActionsLogger, { useActionsLogger } from '../../ActionsLogger'
import Stories from '../../Stories'
import generateCode from '../../../lib/generateChartCode'
import Settings from '../../Settings'
import { groupsByScope } from './ScatterPlotControls'
import propsMapper from './propsMapper'
import { generateLightDataSet } from './generators'
import { scatterPlotStories } from './stories'
import ChartPage from '../ChartPage'

const initialSettings = {
    margin: {
        top: 60,
        right: 140,
        bottom: 70,
        left: 90,
    },

    xScale: {
        type: 'linear',
        min: 0,
        max: 'auto',
    },
    yScale: {
        type: 'linear',
        min: 0,
        max: 'auto',
    },

    colors: 'nivo',
    colorBy: 'serie.id',

    symbolSize: 6,
    symbolShape: 'circle',

    axisTop: {
        enable: false,
        orient: 'top',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 36,
    },
    axisRight: {
        enable: false,
        orient: 'right',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 0,
    },
    axisBottom: {
        enable: true,
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'weight',
        legendPosition: 'middle',
        legendOffset: 46,
        format: d => `${d} kg`,
    },
    axisLeft: {
        enable: true,
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'size',
        legendPosition: 'middle',
        legendOffset: -60,
        format: d => `${d} cm`,
    },

    enableGridX: true,
    enableGridY: true,

    animate: true,
    motionStiffness: 90,
    motionDamping: 15,

    isInteractive: true,
    useMesh: false,
    debugMesh: false,

    'custom tooltip example': false,
    tooltip: null,

    theme: nivoTheme,

    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 130,
            itemWidth: 100,
            itemHeight: 12,
            itemsSpacing: 5,
            itemTextColor: '#999',
            symbolSize: 12,
            symbolShape: 'circle',
            onClick: d => {
                alert(JSON.stringify(d, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000',
                    },
                },
            ],
        },
    ],
}

const ScatterPlot = () => {
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateLightDataSet())
    const diceRoll = useCallback(() => setData(generateLightDataSet()), [setData])
    const [actions, logAction] = useActionsLogger()
    const onClick = useCallback(
        node => {
            logAction({
                type: 'click',
                label: `[point] serie: ${node.serie.id}, x: ${node.x}, y: ${node.y}`,
                data: node,
            })
        },
        [logAction]
    )

    const mappedSettings = propsMapper(settings)

    const code = generateCode(
        'ResponsiveScatterPlot',
        {
            ...mappedSettings,
        },
        { pkg: '@nivo/scatterplot', defaults: ScatterPlotDefaultProps }
    )

    return (
        <ChartPage>
            <ChartHeader
                chartClass="ScatterPlot"
                tags={['@nivo/scatterplot', 'svg', 'isomorphic']}
            />
            <div className="chart-description">
                <p className="description">
                    A scatter plot chart, which can display several data series.
                </p>
                <p className="description">
                    The responsive alternative of this component is{' '}
                    <code>ResponsiveScatterPlot</code>, it also offers another implementation, see{' '}
                    <Link to="/scatterplot/canvas">ScatterPlotCanvas</Link>. You can also see more
                    example usages in{' '}
                    <a
                        href={`${
                            config.storybookUrl
                        }?selectedKind=ScatterPlot&selectedStory=default`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        the storybook
                    </a>
                    .
                </p>
                <p className="description">
                    Alternatively, you can set <code>useMesh</code> to <code>true</code>
                    to have finer interactions.
                </p>
                <p className="description">
                    See the <Link to="/guides/legends">dedicated guide</Link> on how to setup
                    legends for this component.
                </p>
            </div>
            <ChartTabs chartClass="scatterplot" code={code} data={data} diceRoll={diceRoll}>
                <ResponsiveScatterPlot data={data} {...mappedSettings} onClick={onClick} />
            </ChartTabs>
            <ActionsLogger actions={actions} />
            <Settings
                component="ScatterPlot"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.ScatterPlot}
            />
            <Stories stories={scatterPlotStories} />
        </ChartPage>
    )
}

export default ScatterPlot
