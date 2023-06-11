import { Lightning, Utils } from '@lightningjs/sdk'
import { InputField } from '@lightningjs/ui'

export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
  }

  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        rect: true,
      },
      InputFieldWrapper: {
        x: 600,
        y: 150,
        rect: true,
        h: 50,
        w: 460,
        InputField: { type: InputField },
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
}
