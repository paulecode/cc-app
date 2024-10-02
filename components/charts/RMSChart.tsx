'use client'
import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useResize } from './useResize'

export const RMSChart = ({ data }: { data: number[] }) => {
    const rootRef = useRef<HTMLDivElement>(null)
    const size = useResize(rootRef)

    useEffect(() => {
        if (!size || !data) {
            return
        }

        const margin = { top: 20, right: 20, bottom: 150, left: 100 }
        const width = size.width - margin.left - margin.right
        const height = size.height - margin.top - margin.bottom

        d3.select(rootRef.current).select('svg').remove()

        const svg = d3
            .select(rootRef.current)
            .append('svg')
            .attr('width', size.width)
            .attr('height', size.height)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)

        const x = d3
            .scaleLinear()
            .domain([0, data.length - 1])
            .range([0, width])

        const y = d3
            .scaleLinear()
            .domain([d3.min(data) || 0, d3.max(data) || 0])
            .range([height, 0])

        const line = d3
            .line<number>()
            .x((d, i) => x(i))
            .y((d) => y(d))

        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#282F3C')
            .attr('stroke-width', 2)
            .attr('d', line)

        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x)) // Show ticks based on the data length

        svg.append('g').call(d3.axisLeft(y))
    }, [data, size])

    return <div ref={rootRef} style={{ width: '100%', height: '100%' }} />
}
