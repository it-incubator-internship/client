import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgImage = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'26'}
    style={{ height: '26', width: '18px' }}
    viewBox={'0 0 18 26'}
    width={'18'}
    xmlns={'http://www.w3.org/2000/svg'}
  >
    <rect
      height={'24'}
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
