/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CollapsibleCard from '../CollapsibleCard'
import ComponentPropsList from './ComponentPropsList'
import { filterPropertiesByScope } from '../../lib/componentProperties'

export default class ComponentPropsDocumentation extends Component {
    static propTypes = {
        chartClass: PropTypes.string.isRequired,
        properties: PropTypes.array.isRequired,
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        const { chartClass, properties } = this.props

        const filteredProperties = filterPropertiesByScope(
            properties.filter(property => property.excludeFromDoc !== true),
            chartClass,
            true
        )

        return (
            <CollapsibleCard title={`${chartClass} properties`} expandedByDefault={true}>
                <ComponentPropsList properties={filteredProperties} />
            </CollapsibleCard>
        )
    }
}
