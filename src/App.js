import { Lightning, Utils, Colors } from '@lightningjs/sdk'
import { InputField, Keyboard, Key as BaseKey } from '@lightningjs/ui'

export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
  }

  static _template() {
    return {
      ...super._template(),
      Background: {
        w: 1920,
        h: 1080,
        rect: true,
        color: 0xffff0000,
      },
      Text: {
        mount: 1,
        x: 1060,
        y: 120,
        text: {
          text: 'Virtual Keyboard',
          fontFace: 'Regular',
          fontSize: 64,
          textColor: 0xbbffffff,
        },
      },
      Content: {
        InputFieldWrapper: {
          x: 600,
          y: 150,
          rect: true,
          h: 50,
          w: 460,
          InputField: { x: 20, y: 20, type: InputField },
        },
        Keyboard: {
          y: 500,
          w: 500,
          type: Keyboard,
          config: virtualKeyboardConfig,
          currentLayout: 'abc',
        },
      },
    }
  }

  _init() {
    this.tag('Background')
      .animation({
        duration: 20,
        repeat: -1,
        actions: [
          {
            t: '',
            p: 'color',
            v: { 0: { v: 0xff000000 }, 0.5: { v: 0xff808080 }, 0.8: { v: 0xff000000 } },
          },
        ],
      })
      .start()
  }

  _setup() {
    const inputField = this.tag('InputField')
    this.tag('Keyboard').inputField(inputField)
  }

  _getFocused() {
    return this.tag('Keyboard')
  }

  static get icon() {
    return 'images/keyboard.png'
  }
}

const virtualKeyboardConfig = {
  layouts: {
    123: [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
      ],
      ['Space', 'Backspace'],
    ],
  },
}
