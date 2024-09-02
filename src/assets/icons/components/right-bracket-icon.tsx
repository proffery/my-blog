import { SVGProps } from 'react'

export const RightBracketIcon = ({
  fill,
  height,
  viewBox,
  width,
  xmlns,
  ...rest
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      fill={fill ?? 'currentColor'}
      height={height ?? '100%'}
      viewBox={viewBox ?? '-1 0 8 13'}
      width={width ?? '100%'}
      xmlns={xmlns ?? 'http://www.w3.org/2000/svg'}
      {...rest}
    >
      <path
        d={
          'M6.96028 6.14234C7.17996 6.36202 7.17996 6.71812 6.96028 6.93779L1.22541 12.6727C1.00573 12.8923 0.649631 12.8923 0.429956 12.6727L0.164756 12.4075C-0.0549187 12.1878 -0.0549187 11.8317 0.164756 11.612L5.23671 6.54007L0.164756 1.46812C-0.0549186 1.24844 -0.0549186 0.892341 0.164756 0.672667L0.429956 0.407467C0.649631 0.187792 1.00573 0.187792 1.22541 0.407467L6.96028 6.14234Z'
        }
      />
    </svg>
  )
}
