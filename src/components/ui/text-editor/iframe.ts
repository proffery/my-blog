import { Node } from '@tiptap/react'

export interface IframeOptions {
  HTMLAttributes: {
    [key: string]: any
  }
  allowFullscreen: boolean
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    iframe: {
      /**
       * Add an iframe
       */
      setIframe: (options: { src: string }) => ReturnType
    }
  }
}

export default Node.create<IframeOptions>({
  addAttributes() {
    return {
      allowfullscreen: {
        default: this.options.allowFullscreen,
        parseHTML: () => this.options.allowFullscreen,
      },
      frameborder: {
        default: 0,
      },
      src: {
        default: null,
      },
    }
  },

  addCommands() {
    return {
      setIframe:
        (options: { src: string }) =>
        ({ dispatch, tr }) => {
          const { selection } = tr
          const node = this.type.create(options)

          if (dispatch) {
            tr.replaceRangeWith(selection.from, selection.to, node)
          }

          return true
        },
    }
  },

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'iframe-wrapper',
      },
      allowFullscreen: true,
    }
  },

  atom: true,

  group: 'block',

  name: 'iframe',

  parseHTML() {
    return [
      {
        tag: 'iframe',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', this.options.HTMLAttributes, ['iframe', HTMLAttributes]]
  },
})
