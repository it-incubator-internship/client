import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'#fff'}
    height={'36'}
    ref={ref}
    viewBox={'-1.8 1.5 28 28'}
    width={'36'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'M13.875 27.563h-0.031c-0.031 0.031-0.031 0.063-0.063 0.063-0.094 0.188-0.313 0.313-0.531 0.313-0.531-0.031-1.156-0.063-1.719-0.156-0.063 0-0.156-0.031-0.219-0.031-0.094 0.094-0.25 0.156-0.406 0.156h-0.094c-0.719-0.125-1.5-0.375-2.25-0.688-0.594-0.25-1.156-0.5-1.656-0.813-1.781-0.938-3.344-2.313-4.5-4-0.844-1.156-1.438-2.5-1.781-3.875-0.281-0.031-0.5-0.281-0.5-0.531-0.031-0.406-0.063-0.844-0.063-1.25 0-0.594 0.031-1.219 0.094-1.75-0.125-0.125-0.188-0.313-0.156-0.5 0.125-1.094 0.469-2.188 0.906-3.188 0.156-0.406 0.344-0.781 0.563-1.125-0.031-0.25-0.031-0.469-0.031-0.719 0-1.313 0.438-2.563 1.313-3.563 0.094-0.125 0.25-0.188 0.438-0.188h0.188c0.219 0.063 0.375 0.25 0.406 0.469 0.063 0.438 0.219 0.875 0.469 1.219 2.094-2.094 4.969-3.344 8.125-3.344 1.875 0 3.656 0.438 5.219 1.25 1.344 0.5 2.563 1.281 3.563 2.313 0.031-0.063 0.063-0.156 0.125-0.188 0.094-0.125 0.25-0.188 0.406-0.188 0.125 0 0.281 0.031 0.375 0.094 0.688 0.5 1.25 1.25 1.625 2.156 0.406 0.906 0.656 1.906 0.719 3 0 0.125 0.031 0.25 0.031 0.406 0.188 0.063 0.375 0.25 0.406 0.469 0.094 0.469 0.125 1 0.125 1.469 0 1.563-0.344 3.063-1.063 4.438-0.063 0.188-0.125 0.406-0.188 0.563 0.125 0.125 0.219 0.281 0.219 0.469v0.094c-0.188 1.5-1.5 3.156-3.313 4.281-0.188 0.125-0.375 0.25-0.563 0.344 0.031 0.188-0.031 0.375-0.156 0.5-0.969 1.063-2.781 1.781-4.906 2-0.375 0.031-0.781 0.031-1.125 0.031zM17.938 19.781l-0.656 0.875c-0.125 0.094-0.281 0.156-0.406 0.219-0.031 0-0.063 0-0.094-0.031-0.094-0.094-0.063-0.313 0.031-0.531-0.125 0.094-0.313 0.219-0.469 0.344-0.313 0.25-0.563 0.531-0.75 0.781-0.094 0.031-0.219 0.063-0.313 0.063 0.094-0.094 0.188-0.188 0.25-0.313-0.563 0.281-1.344 0.469-2.094 0.469h-0.125c-0.188-0.031-0.375-0.031-0.531-0.063-0.594-0.094-1.219-0.281-1.75-0.563 0 0-0.031 0-0.063-0.031 0.156-0.031 0.313-0.031 0.469-0.031s0.281 0 0.406 0.031c-0.281-0.125-0.656-0.25-1.031-0.25h-0.156c-0.031 0-0.031 0-0.063 0.031-1.469-0.875-2.594-2.25-2.75-3.719-0.094-0.844 0-1.563 0.375-2.281-0.219-0.031-0.438-0.063-0.688-0.063-0.375 0-0.781 0.063-1.125 0.156-0.156 0.031-0.25 0.063-0.344 0.094-0.031-0.094-0.125-0.188-0.156-0.281 0.5-0.188 1.094-0.281 1.625-0.281 0.313 0 0.625 0.031 0.906 0.063 0.031 0.031 0.094 0.031 0.125 0.031l0.031 0.031h0.156c0 0.031 0 0.031 0.031 0.031s0.063 0 0.094 0.031h0.031c0.031 0 0.063 0.031 0.094 0.031h0.031c0.031 0.031 0.063 0.031 0.094 0.031 0 0.031 0.031 0.031 0.031 0.031 0.031 0 0.063 0.031 0.094 0.031 0 0 0.031 0 0.031 0.031 0.031 0 0.063 0 0.094 0.031h0.031c0.063 0.031 0.094 0.031 0.125 0.063 0.094-0.219 0.125-0.469 0.125-0.719v-0.094c0-0.25-0.063-0.5-0.156-0.719-0.063-0.125-0.156-0.281-0.219-0.406-0.375-0.594-0.563-1.313-0.563-2.125 0-1.469 0.719-2.813 1.875-3.625-0.156 0-0.313-0.031-0.438-0.031-1.156 0-2.156 0.531-2.781 1.406-0.375-0.094-1.063-0.156-1.406-0.156-1.5 0-2.844 0.688-3.75 1.813-0.313 0.406-0.594 0.875-0.781 1.344-0.406 0.938-0.75 1.969-0.875 3.063 0.125-0.375 0.313-0.75 0.5-1.063-0.25 0.875-0.375 1.969-0.375 3.219 0 0.375 0 0.813 0.031 1.188 0.031-0.5 0.125-1 0.188-1.406 0.344 4.094 2.781 7.594 6.313 9.344 0.438 0.281 1.031 0.563 1.594 0.813 0.75 0.281 1.469 0.5 2.094 0.594-0.313-0.125-0.656-0.281-0.969-0.438 0.156 0.031 0.344 0.063 0.531 0.094 0.344 0.094 0.75 0.188 1.156 0.25 0.563 0.094 1.125 0.125 1.625 0.125-0.156-0.063-0.344-0.125-0.531-0.219 0.375-0.031 0.75-0.063 1.094-0.094h0.063c0.344 0 0.719-0.031 1.063-0.063 2.031-0.188 3.719-0.906 4.563-1.813-0.438 0.219-1 0.406-1.563 0.531 0.5-0.281 1.063-0.625 1.5-0.969 0.281-0.156 0.594-0.313 0.875-0.5 1.719-1.063 2.875-2.563 3.063-3.875-0.25 0.438-0.656 0.906-1.188 1.313 0.469-0.813 0.906-1.656 1.188-2.563 0.625-1.281 0.969-2.719 0.969-4.219 0-0.469-0.031-0.938-0.094-1.375v0.188c0 0.688-0.125 1.281-0.344 1.813-0.031-0.469-0.063-1-0.125-1.438 0.063-0.469 0.094-1 0.063-1.5-0.125-2.094-0.969-3.781-2.156-4.688 0.594 0.625 1 1.594 1 2.688 0 0.094 0 0.156-0.031 0.25-1.188-2.656-3.625-4.688-6.563-5.281 1.656 0.844 3.063 2.188 3.969 3.813-0.594-0.563-1.344-1.063-2.219-1.281 1.438 1.313 2.375 3.156 2.438 5.281 0 0.25 0 0.531-0.031 0.781-0.219-0.563-0.625-1.063-1.031-1.469 0.125 0.688 0.25 1.375 0.25 2.156 0.031 1.094-0.094 2.125-0.313 3.094-0.094-0.469-0.219-0.938-0.375-1.313 0 0.125 0 0.25-0.031 0.344-0.063 1.125-0.375 2.125-0.813 2.875zM3.188 6.313c-0.75 0.875-1.156 1.938-1.156 3.156v0.063l0.125-0.125s0.031-0.031 0.031-0.063c0.063-0.031 0.094-0.063 0.125-0.094l0.031-0.031s0.063-0.063 0.125-0.094v-0.031c0.063-0.031 0.094-0.063 0.156-0.125 0.063-0.031 0.094-0.094 0.156-0.125v-0.031c0.156-0.094 0.344-0.219 0.5-0.313 0.25-0.125 0.531-0.25 0.813-0.375-0.094-0.063-0.156-0.156-0.25-0.25 0-0.031 0-0.031-0.031-0.063 0 0 0-0.031-0.031-0.031 0-0.031-0.031-0.031-0.031-0.063l-0.031-0.031c0-0.031-0.031-0.063-0.031-0.063 0-0.031-0.031-0.063-0.031-0.094l-0.031-0.031c0-0.031-0.031-0.031-0.031-0.063s-0.031-0.063-0.031-0.063c0-0.031-0.031-0.063-0.031-0.063 0-0.031-0.031-0.031-0.031-0.063s0-0.031-0.031-0.063v-0.031c-0.031-0.031-0.031-0.063-0.031-0.063-0.031-0.031-0.031-0.031-0.031-0.063s-0.031-0.031-0.031-0.063v-0.031c-0.031-0.031-0.063-0.094-0.063-0.125 0 0-0.031 0-0.031-0.031v-0.063c-0.031-0.031-0.031-0.031-0.031-0.063v-0.063l-0.031-0.031v-0.094c0 0 0-0.031-0.031-0.031v-0.125zM12.188 10.813c-0.031-0.469-1.469-0.344-2.031-0.344-0.281 0-0.594-0.156-0.813-0.313-0.031 0.188-0.063 0.438-0.063 0.625 0 0.625 0.156 1.281 0.469 1.813 0.094 0.125 0.156 0.25 0.219 0.375 0.5-0.344 1.25-0.719 1.5-0.906 0.406-0.313 0.75-0.75 0.719-1.25zM13.313 16.781c-1.469 0-1.469 0.656-2.813 0.656-0.688 0-1.594-0.344-2.125-1.188 0 0.219 0 0.5 0.031 0.75 0.125 1 0.813 2.031 1.813 2.813 0.625-0.031 1.313-0.188 1.656-0.313 0.938-0.313 1.656-1.031 2.188-1.219 0.219-0.094 0.656 0.156 0.875-0.281 0.188-0.344-0.625-1.219-1.625-1.219z'
      }
    ></path>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)

export default Memo
