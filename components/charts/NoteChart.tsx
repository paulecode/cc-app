'use client'
import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import * as d3 from 'd3'
import { useResize } from './useResize'

const getNoteNameFromMidiNumber = (note: number): string => {
    const notes = [
        'A0',
        'A#0',
        'B0',
        'C1',
        'C#1',
        'D1',
        'D#1',
        'E1',
        'F1',
        'F#1',
        'G1',
        'G#1',
        'A1',
        'A#1',
        'B1',
        'C2',
        'C#2',
        'D2',
        'D#2',
        'E2',
        'F2',
        'F#2',
        'G2',
        'G#2',
        'A2',
        'A#2',
        'B2',
        'C3',
        'C#3',
        'D3',
        'D#3',
        'E3',
        'F3',
        'F#3',
        'G3',
        'G#3',
        'A3',
        'A#3',
        'B3',
        'C4',
        'C#4',
        'D4',
        'D#4',
        'E4',
        'F4',
        'F#4',
        'G4',
        'G#4',
        'A4',
        'A#4',
        'B4',
        'C5',
        'C#5',
        'D5',
        'D#5',
        'E5',
        'F5',
        'F#5',
        'G5',
        'G#5',
        'A5',
        'A#5',
        'B5',
        'C6',
        'C#6',
        'D6',
        'D#6',
        'E6',
        'F6',
        'F#6',
        'G6',
        'G#6',
        'A6',
        'A#6',
        'B6',
        'C7',
        'C#7',
        'D7',
        'D#7',
        'E7',
        'F7',
        'F#7',
        'G7',
        'G#7',
        'A7',
        'A#7',
        'B7',
        'C8',
    ]
    return notes[note - 21] || ''
}

interface MidiData {
    notes: number[]
    timestamps: number[]
    velocity: number[]
}

interface NotesScatterplotProps {
    midiData: MidiData
}

const NotesScatterplot: React.FC<NotesScatterplotProps> = ({ midiData }) => {
    const rootRef = useRef<HTMLDivElement>(null)
    const size = useResize(rootRef)

    const data = useMemo(() => {
        return midiData.notes.map((note, index) => ({
            note,
            timestamp: midiData.timestamps[index],
            velocity: midiData.velocity[index],
            noteName: getNoteNameFromMidiNumber(note),
        }))
    }, [midiData])

    const brushed = useCallback(
        (
            event: d3.D3BrushEvent<unknown>,
            x: d3.ScaleLinear<number, number>,
            svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
            data: {
                note: number
                timestamp: number
                velocity: number
                noteName: string
            }[]
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
        []
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
                .scaleLinear<number>()
                .domain(d3.extent(data, (d) => d.timestamp) as [number, number])
                .range([0, width])

            const y = d3
                .scaleLinear<number>()
                .domain([21, 108])
                .range([height, 0])

            const tooltip = d3
                .select(rootRef.current)
                .append('div')
                .style('position', 'absolute')
                .style('visibility', 'hidden')
                .style('background', 'rgba(0, 0, 0, 0.75)')
                .style('color', '#fff')
                .style('padding', '8px')
                .style('border-radius', '4px')
                .style('box-shadow', '0px 4px 8px rgba(0, 0, 0, 0.2)')
                .style('font-size', '12px')
                .style('pointer-events', 'none')

            const cNotes = [24, 36, 48, 60, 72, 84, 96]

            svg.append('g')
                .attr('class', 'x-axis')
                .attr(
                    'transform',
                    `translate(${margin.left},${height + margin.top})`
                )
                .call(
                    d3.axisBottom(x).tickFormat((d) => {
                        const date = new Date(d as number)
                        return d3.timeFormat('%M:%S')(date)
                    })
                )

            svg.append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`)
                .call(
                    d3
                        .axisLeft(y)
                        .tickValues(cNotes)
                        .tickFormat((d) =>
                            getNoteNameFromMidiNumber(d as number)
                        )
                )

            chartArea
                .selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', (d) => x(d.timestamp))
                .attr('cy', (d) => y(d.note))
                .attr('r', 5)
                .style('fill', '#69b3a2')
                .style('opacity', (d) => d.velocity / 127)
                .on('mouseenter', (event, d) => {
                    tooltip
                        .style('visibility', 'visible')
                        .html(
                            `<strong>Note:</strong> ${d.noteName}<br/><strong>Velocity:</strong> ${d.velocity}`
                        )
                })
                .on('mousemove', (event) => {
                    tooltip
                        .style('top', `${event.pageY - 20}px`)
                        .style('left', `${event.pageX + 10}px`)
                })
                .on('mouseleave', () => tooltip.style('visibility', 'hidden'))

            const brush = d3
                .brushX()
                .extent([
                    [0, 0],
                    [width, height],
                ])
                .on('end', (event) => brushed(event, x, svg, data))

            chartArea.append('g').attr('class', 'brush').call(brush).lower()

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

export default NotesScatterplot
