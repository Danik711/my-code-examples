import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { colors } from "../colors"
const Close = (props: SvgProps) => (
  <Svg
    width={14}
    height={14}
    fill={props.color}
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      fill={props.color}
      d="M1.756.577A.833.833 0 0 0 .577 1.756L5.821 7 .577 12.244a.833.833 0 1 0 1.179 1.178L7 8.178l5.244 5.244a.833.833 0 0 0 1.178-1.178L8.178 7l5.244-5.244A.833.833 0 0 0 12.244.577L7 5.821 1.756.577Z"
    />
  </Svg>
)
export default Close;