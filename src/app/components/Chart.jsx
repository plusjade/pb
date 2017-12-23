// http://jsfiddle.net/qAHC2/688/
// https://bl.ocks.org/mbostock/3883245
// https://bl.ocks.org/mbostock/3883195
// http://bl.ocks.org/duopixel/4063326
// http://bl.ocks.org/emmasaunders/c25a147970def2b02d8c7c2719dc7502

import React, { PureComponent }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'

import colors from 'app/colors'

import * as d3 from "d3"

const WIDTH = 1200

const style = {
  default: {
    width: "100%",
    overflow: "visible",
  },
  svg: {
    display: "block",
    width: "100%",
    margin: "auto",
    overflow: "visible",
  },
}

class Chart extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    maxHealth: PropTypes.number.isRequired,
  }
  static defaultProps = {
    ratio: 3
  }

  componentWillReceiveProps(nextProps) {
    this.update([{id: Math.random(), data: nextProps.data}], nextProps.maxHealth)
  }

  componentDidMount() {
    const HEIGHT = WIDTH / this.props.ratio

    // const xGrid = d3.scaleLinear().rangeRound([0, WIDTH])
    // const yGrid = d3.scaleLinear().rangeRound([HEIGHT, 0])
    // xGrid.domain([-28, 0])
    // yGrid.domain([0, maxHealth])


    const svg = d3.select(this.refNode)
    const g = svg.append("g")
    const x = d3.scaleLinear().rangeRound([0, WIDTH])
    const y = d3.scaleLinear().rangeRound([HEIGHT, 0])
    const line = d3.line()
                  .x(d => (x(d.date)))
                  .y(d => (y(d.health)))
                  .curve(d3.curveBasis)
    const area = d3.area()
                  .x(d => (x(d.date)))
                  .y1(d => (y(d.health)))
                  .curve(d3.curveBasis)

    const areaStart = data => (
      area(data.map(d => ({date: d.date, health: 0})))
    )
    const LAST_NUMBER_DAYS = 56// 28
    const tickValues = Array(LAST_NUMBER_DAYS).fill(1).map((_, i) => (LAST_NUMBER_DAYS - i))
    const xAxis = d3.axisBottom(x).tickValues([-LAST_NUMBER_DAYS, -21, -14, -7, 0])
    const yAxis = d3.axisRight(y)
    yAxis.tickValues([0])

    if (this.props.showAxis) {
      g.append("g")
        .attr("class", "xAxis")
        .attr("transform", `translate(0, ${HEIGHT + 15})`)
        .attr("style", "font-size: 20px")
        .call(xAxis)

      g.append("g")
        .attr("class", "yAxis")
        .attr("transform", `translate(${WIDTH + 15}, 0)`)
        .attr("style", "font-size: 20px")
        .call(yAxis)
    }

    this.update = (data, maxHealth) => {
      const lineData = data[0].data
      const dotData = lineData.filter(d => (d.ordinal !== 0))
      x.domain([-LAST_NUMBER_DAYS, 0])
      y.domain([0, maxHealth])
      yAxis.tickValues([maxHealth/2, maxHealth])
      area.y0(y(0))

      const nodeDotLines = g.selectAll("g.dotLine").data(dotData, d => (d.date))
      const nodeDots = g.selectAll("circle").data(dotData, d => (d.date))
      const nodeLine = g.selectAll("g.line").data(lineData, d => (d.date))
      const node = g.selectAll("g.area").data(data, d => (d.id))
      // TODO:
      const totalLength = 2500 // nodeLine.node().getTotalLength()

      const gridLinesY = g.selectAll("g.gridLinesY").data(lineData, d => (d.date))
      gridLinesY.enter().append("g").attr("class", "gridLinesY")
        .append("line")
          .attr("stroke", "rgba(66, 66, 66, 0.5)")
          .attr("stroke-width", "1")
          .attr("fill", "none")
          .attr("y1", d => (y(0)))
          .attr("y2", d => (y(maxHealth)))
          .attr("x1", d => (x(d.date)))
          .attr("x2", d => (x(d.date)))

      const lineD = Array(Math.ceil(maxHealth + 1)).fill(1).map((_, i) => (i))
      const gridLinesX = g.selectAll("g.gridLinesX").data(lineD)
      gridLinesX.enter().append("g").attr("class", "gridLinesX")
        .append("line")
          .attr("stroke", "rgba(66, 66, 66, 0.5)")
          .attr("stroke-width", "1")
          .attr("fill", "none")
          .attr("x1", d => (x(-LAST_NUMBER_DAYS)))
          .attr("x2", d => (x(0)))
          .attr("y1", (i) => (y(i)))
          .attr("y2", (i) => (y(i)))

      if (this.props.showAxis) {
        g.select("g.yAxis")
          .attr("transform", "translate(" + x(-10) + ",0)")
          .style("opacity", 0)
          .transition()
          .duration(800)
          .style("opacity", 1)
          .call(yAxis)

        g.select("g.xAxis")
          .transition()
          .duration(800)
          .call(xAxis)
      }

      if (this.props.showPoints) {
        // Data dots
        nodeDots.enter().append("circle")
          .attr("fill", colors.pins)
          .attr("r", 0)
          .attr("cx", d => (x(d.date)) )
          .attr("cy", d => (y(maxHealth)))
          .transition()
          .delay(1600)
          .duration(800)
            .attr("r", 6)
            .attr("cx", d => (x(d.date)) )
            .attr("cy", d => (y(d.health) - 30) )

        // dot-lines
        nodeDotLines.enter().append("g").attr("class", "dotLine")
          .append("line")
            .attr("stroke", colors.pins)
            .attr("stroke-width", "2")
            .attr("fill", "none")
              .attr("y1", d => (y(maxHealth)))
              .attr("y2", d => (y(maxHealth)))
              .attr("x1", d => (x(d.date)))
              .attr("x2", d => (x(d.date)))
            .transition()
            .delay(1600)
            .duration(800)
              .attr("y1", d => (y(d.health) + 10) )
              .attr("y2", d => (y(d.health) - 30) )
              .attr("x1", d => (x(d.date)))
              .attr("x2", d => (x(d.date)))
      }

      // area
      node.enter().append("g").attr("class", "area")
        .append("path")
          .attr("fill", colors.area)
          .attr("d", d => (areaStart(d.data)))
          .transition()
            .delay(1000)
            .duration(800)
            .attr("d", d => (area(d.data)))

      node.exit().selectAll("path")
        .transition()
        .duration(800)
        .attr("d", d => (areaStart(d.data)))
        .remove()

      // trend line
      nodeLine.enter().append("g").attr("class", "line")
        .append("path")
          .attr("d", line(lineData))
          .attr("stroke", colors.graphLine)
          .attr("stroke-width", "2")
          .attr("fill", "none")
          .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
          .attr("stroke-dashoffset", totalLength)
          .transition()
            .duration(2000)
            .attr("stroke-dashoffset", 0)
    }

    this.update([{id: 0, data: this.props.data}], this.props.maxHealth)
  }

  getRef = (node) => {
    if (node) {
      this.refNode = node
    }
  }

  render() {
    return(
      <div style={style.default}>
        <svg
          viewBox={`0 0 ${WIDTH} ${WIDTH / this.props.ratio}`}
          style={style.svg}
          ref={this.getRef}
        />
      </div>
    )
  }
}

export default Radium(Chart)
