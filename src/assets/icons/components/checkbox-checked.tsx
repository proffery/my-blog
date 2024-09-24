import { SVGProps } from 'react'

export const CheckboxChecked = ({
  fill,
  height,
  viewBox,
  width,
  xmlns,
  ...rest
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      fill={'none'}
      height={height ?? '100%'}
      viewBox={viewBox ?? '0 0 18 15'}
      width={width ?? '100%'}
      xmlns={xmlns ?? 'http://www.w3.org/2000/svg'}
      {...rest}
    >
      <path
        d={'M15.6479 1.77344L5.74575 13.2294L1.50195 8.93344'}
        stroke={'currentColor'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={'3'}
      />
    </svg>
  )
}
