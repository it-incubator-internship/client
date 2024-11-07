import type { SVGProps } from 'react'
// eslint-disable-next-line no-duplicate-imports
import { Ref, forwardRef, memo } from 'react'
const SvgImage = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'18'}
    viewBox={'0 0 18 18'}
    width={'18'}
    xmlns={'http://www.w3.org/2000/svg'}
  >
    <rect
      height={'16'}
      rx={'2'}
      stroke={'#8D9094'}
      strokeWidth={'2'}
      width={'16'}
      x={'1'}
      y={'1'}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgImage)
const Memo = memo(ForwardRef)

export default Memo
