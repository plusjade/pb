// http://jsfiddle.net/qAHC2/688/
// https://bl.ocks.org/mbostock/3883245
// https://bl.ocks.org/mbostock/3883195
// http://bl.ocks.org/duopixel/4063326
// http://bl.ocks.org/emmasaunders/c25a147970def2b02d8c7c2719dc7502

import React, { PureComponent }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'

import CategoryCard from 'app/components/CategoryCard'

import * as d3 from "d3"

const WIDTH = 1200
const HEIGHT = WIDTH / 3

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
    color: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    maxHealth: PropTypes.number.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    this.update([{id: Math.random(), data: nextProps.data}], nextProps.maxHealth)
  }

  componentDidMount() {
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

    const tickValues = Array(28).fill(1).map((_, i) => (28 - i))
    const xAxis = d3.axisBottom(x).tickValues([-28, -21, -14, -7, 0, 7])
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
      x.domain([-28, 7])
      y.domain([0, maxHealth])
      yAxis.tickValues([maxHealth])
      area.y0(y(0))

      if (this.props.name === "gym") {
        console.log(lineData)
      }

      const nodeDotLines = g.selectAll("g.dotLine").data(dotData, d => (d.date))
      const nodeDots = g.selectAll("circle").data(dotData, d => (d.date))
      const nodeLine = g.selectAll("g.line").data(lineData, d => (d.date))
      const node = g.selectAll("g.area").data(data, d => (d.id))
      // TODO:
      const totalLength = 2500 // nodeLine.node().getTotalLength()

      if (this.props.showAxis) {
        g.select("g.yAxis")
          .attr("transform", "translate(" + x(0) + ",0)")
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

      // Data dots
      nodeDots.enter().append("circle")
        .attr("fill", "#212121")
        // .attr("stroke", "#212121")
        // .attr("stroke-width", "2")
        .attr("r", 0)
        .attr("cx", d => (x(d.date)) )
        .attr("cy", d => (y(0)))
        .transition()
        .duration(2000)
          .attr("r", 6)
          .attr("cx", d => (x(d.date)) )
          .attr("cy", d => (y(d.health) - 30) )

      // dot markers
      nodeDotLines.enter().append("g").attr("class", "dotLine")
        .append("line")
          .attr("stroke", "#212121")
          .attr("stroke-width", "2")
          .attr("fill", "none")
            .attr("y1", d => (y(0)))
            .attr("y2", d => (y(0)))
            .attr("x1", d => (x(d.date)))
            .attr("x2", d => (x(d.date)))
          .transition()
          .duration(2000)
            .attr("y1", d => (y(d.health) + 10) )
            .attr("y2", d => (y(d.health) - 30) )
            .attr("x1", d => (x(d.date)))
            .attr("x2", d => (x(d.date)))

      // area
      node.enter().append("g").attr("class", "area")
        .append("path")
          .attr("fill", this.props.color)
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
          .attr("stroke", "#212121")
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
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          style={style.svg}
          ref={this.getRef}
        />
      </div>
    )
  }
}

export default Radium(Chart)
