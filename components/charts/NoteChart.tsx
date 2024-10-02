'use client'

import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import * as d3 from 'd3'
import { useResize } from './useResize'

interface MidiData {
    notes: number[]
    timestamps: number[]
    velocity: number[]
}

interface PianoNotesScatterplotProps {
    midiData: MidiData
}

const PianoNotesScatterplot: React.FC<PianoNotesScatterplotProps> = ({
    midiData,
}) => {
    const rootRef = useRef<HTMLDivElement>(null)
    const size = useResize(rootRef)

    const data = useMemo(() => {
        return midiData.notes.map((note, index) => ({
            note,
            timestamp: midiData.timestamps[index],
            velocity: midiData.velocity[index],
        }))
    }, [midiData])

    const brushed = useCallback(
        (
            event: d3.D3BrushEvent<unknown>,
            x: d3.ScaleLinear<number, number>,
            svg: d3.Selection<SVGGElement, unknown, null, undefined>,
            data: typeof midiData.notes
        ) => {
            const extent = event.selection as [number, number] | null

            if (!extent) {
                x.domain(
                    d3.extent(data, (d) => d.timestamp) as [number, number]
                )
            } else {
                x.domain([x.invert(extent[0]), x.invert(extent[1])])
                svg.select<SVGGElement>('.brush').call(d3.brushX().move, null)
            }

            svg.select<SVGGElement>('.x-axis')
                .transition()
                .duration(1000)
                .call(d3.axisBottom(x))
            svg.selectAll<SVGCircleElement, (typeof data)[number]>('circle')
                .transition()
                .duration(1000)
                .attr('cx', (d) => x(d.timestamp))
        },
        [midiData]
    )

    useEffect(() => {
        if (!size || !data) return
        if (
            data.length > 0 &&
            rootRef.current &&
            size.width > 0 &&
            size.height > 0
        ) {
            const margin = { top: 20, right: 20, bottom: 50, left: 50 }
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
                .scaleLinear<number>()
                .domain(d3.extent(data, (d) => d.timestamp) as [number, number])
                .range([0, width])

            const y = d3
                .scaleLinear<number>()
                .domain([0, 127])
                .range([height, 0])

            svg.append('g')
                .attr('class', 'x-axis')
                .attr('transform', `translate(0,${height})`)
                .call(
                    d3.axisBottom(x).tickFormat((d) => {
                        const date = new Date(d as number)
                        return d3.timeFormat('%M:%S')(date)
                    })
                )

            svg.append('g').call(d3.axisLeft(y))

            svg.append('g')
                .selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', (d) => x(d.timestamp))
                .attr('cy', (d) => y(d.note))
                .attr('r', 5)
                .style('fill', '#69b3a2')
                .style('opacity', (d) => d.velocity / 127)

            const brush = d3
                .brushX()
                .extent([
                    [0, 0],
                    [width, height],
                ])
                .on('end', (event) => brushed(event, x, svg, data))

            svg.append('g').attr('class', 'brush').call(brush)

            svg.append('text')
                .attr('text-anchor', 'end')
                .attr('x', width)
                .attr('y', height + margin.top + 20)
                .text('Time')

            svg.append('text')
                .attr('text-anchor', 'end')
                .attr('transform', 'rotate(-90)')
                .attr('y', -margin.left + 20)
                .attr('x', -margin.top)
                .text('Note')
        }
    }, [data, size, brushed])

    return <div ref={rootRef} style={{ width: '100%', height: '100%' }} />
}

export default PianoNotesScatterplot
