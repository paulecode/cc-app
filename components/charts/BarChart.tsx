'use client'
import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useResize } from './useResize'

interface DataItem {
    label: string
    value: number
}

interface BarChartProps {
    data: DataItem[]
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
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
            .scaleBand()
            .domain(data.map((d) => d.label))
            .range([0, width])
            .padding(0.1)

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.value) || 0])
            .range([height, 0])

        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('y', (d) => y(d.value))
            .attr('x', (d) => x(d.label)!)
            .attr('height', (d) => height - y(d.value))
            .attr('width', x.bandwidth())
            .attr('fill', (d, i) => (i % 2 === 0 ? '#111827' : '#282F3C'))

        svg.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', 'rotate(-45)')

        svg.append('g').call(
            d3
                .axisLeft(y)
                .tickValues(
                    d3.range(0, (d3.max(data, (d) => d.value) || 0) + 1)
                )
                .tickFormat(d3.format('d'))
        )
    }, [data, size])

    return <div ref={rootRef} style={{ width: '100%', height: '100%' }} />
}
