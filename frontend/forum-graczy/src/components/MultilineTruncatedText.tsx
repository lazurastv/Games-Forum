import React from 'react'
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

interface IMultilineTruncatedText {
  text: string;
  maxLine: string;
}

export default function MultilineTruncatedText(props:IMultilineTruncatedText) {
  return (
    <ResponsiveEllipsis text={props.text} maxLine={props.maxLine} ellipsis='...' trimRight basedOn='letters'/>
    )
}