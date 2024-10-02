'use client'
import React, { useEffect, useRef, useCallback } from 'react'
import * as d3 from 'd3'
import { useResize } from './useResize'

export const RMSChart = ({ data }: { data: number[] }) => {
    const rootRef = useRef<HTMLDivElement>(null)
    const size = useResize(rootRef)

    const brushed = useCallback(
        (
            event: d3.D3BrushEvent<unknown>,
            x: d3.ScaleLinear<number, number>,
            y: d3.ScaleLinear<number, number>,
            svg: d3.Selection<SVGGElement, unknown, null, undefined>
        ) => {
            const extent = event.selection as [number, number] | null

            if (!extent) {
                x.domain([0, data.length - 1])
            } else {
                x.domain([x.invert(extent[0]), x.invert(extent[1])])
                svg.select<SVGGElement>('.brush').call(d3.brushX().move, null) // Clear the brush
            }

            svg.select<SVGGElement>('.x-axis')
                .transition()
                .duration(1000)
                .call(d3.axisBottom(x))

            const lineGenerator = d3
                .line<number>()
                .x((d, i) => x(i))
                .y((d) => y(d))

            svg.selectAll<SVGPathElement, number>('path.line')
                .datum(data)
                .transition()
                .duration(1000)
                .attr('d', lineGenerator)
        },
        [data]
    )

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

        svg.append('defs')
            .append('clipPath')
            .attr('id', 'clip')
            .append('rect')
            .attr('width', width)
            .attr('height', height)

        const chartArea = svg
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)
            .attr('clip-path', 'url(#clip)')

        const x = d3
            .scaleLinear()
            .domain([0, data.length - 1])
            .range([0, width])

        const y = d3
            .scaleLinear()
            .domain([d3.min(data) || 0, d3.max(data) || 0])
            .range([height, 0])

        const lineGenerator = d3
            .line<number>()
            .x((d, i) => x(i))
            .y((d) => y(d))

        chartArea
            .append('path')
            .datum(data)
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', '#282F3C')
            .attr('stroke-width', 2)
            .attr('d', lineGenerator)

        svg.append('g')
            .attr('class', 'x-axis')
            .attr(
                'transform',
                `translate(${margin.left},${height + margin.top})`
            )
            .call(d3.axisBottom(x))

        svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)
            .call(d3.axisLeft(y))

        const brush = d3
            .brushX()
            .extent([
                [0, 0],
                [width, height],
            ])
            .on('end', (event) => brushed(event, x, y, chartArea))

        chartArea.append('g').attr('class', 'brush').call(brush).lower()
    }, [data, size, brushed])

    return <div ref={rootRef} style={{ width: '100%', height: '100%' }} />
}
