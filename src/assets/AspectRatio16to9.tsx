import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgImage = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'20'}
    style={{ height: '18px', width: '26px' }}
    viewBox={'0 0 26 20'}
    width={'26'}
    xmlns={'http://www.w3.org/2000/svg'}
  >
    <rect
      height={'24'}
      rx={'2'}
      stroke={'#8D9094'}
      strokeWidth={'2'}
      transform={'rotate(90 25 1)'}
      width={'18'}
      x={'25'}
      y={'1'}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgImage)
const Memo = memo(ForwardRef)

export default Memo
