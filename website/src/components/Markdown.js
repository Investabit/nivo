/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

const Markdown = memo(({ source }) => {
    return <ReactMarkdown source={source} />
})

Markdown.displayName = 'Markdown'
Markdown.propTypes = {
    source: PropTypes.string.isRequired,
}

export default Markdown
