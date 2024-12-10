const initLineClamp = {
  clampBlocks(blocks: NodeListOf<Element>) {
    blocks.forEach((block: Element) => {
      const content = block.querySelector('.clamp-content') as HTMLElement
      const expandBtn = block.querySelector('.clamp-more') as HTMLElement

      if (this.isBlockClamped(content)) {
        const hideBtn = block.querySelector('.clamp-less')

        if (expandBtn) {
          expandBtn.addEventListener('click', () => {
            block.classList.add('clamp-block--opened')
          })
        }
        if (hideBtn) {
          hideBtn.addEventListener('click', () => {
            block.classList.remove('clamp-block--opened')
          })
        }
      } else {
        expandBtn.style.display = 'none'
      }
    })
  },
  init() {
    const blocks = document.querySelectorAll('.clamp-block')

    this.clampBlocks(blocks)
  },
  isBlockClamped(content: HTMLElement) {
    return content.scrollHeight > content.clientHeight
  },
}

export default initLineClamp
