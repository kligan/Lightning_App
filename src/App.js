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
          y: 380,
          w: 1920,
          type: Keyboard,
          config: virtualKeyboardConfig,
          currentLayout: 'keys',
          maxCharacters: 30,
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

  _active() {
    super._active()
    this.tag('InputFieldWrapper').color = Colors(this.fireAncestors('$getThemeColor'))
      .darker(0.5)
      .get()
  }

  _getFocused() {
    return this.tag('Keyboard')
  }
}

class Key extends BaseKey {
  _firstActive() {
    this.labelColors = {
      unfocused: Colors('black').get(),
      focused: Colors('white').get(),
    }
    this.backgroundColors = {
      unfocused: Colors('white').get(),
      focused: Colors('black').get(),
    }
  }

  static get width() {
    return 60
  }
  static get height() {
    return 60
  }
}

class IconKey extends BaseKey {
  set icon(src) {
    this._icon = src
    this._update()
  }

  get icon() {
    return this._icon
  }

  _active() {
    this.labelColors = {
      unfocused: 0xffffc0cb,
      focused: Colors('white').get(),
    }
    this.backgroundColors = {
      unfocused: Colors('white').get(),
      focused: Colors('white').get(),
    }
  }

  _update() {
    this.patch({
      Label: {
        src: Utils.asset(this.icon),
      },
    })
  }

  static get height() {
    return 60
  }

  static get width() {
    return 160
  }
}

const virtualKeyboardConfig = {
  layouts: {
    keys: [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'],
      ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      ['Space', 'Backspace'],
    ],
  },
  styling: {
    align: 'center',
    horizontalSpacing: 5,
    verticalSpacing: 20,
    Row2: {
      spacing: 10,
    },
  },
  buttonTypes: {
    default: {
      type: Key,
    },
    Backspace: {
      type: IconKey,
      w: 9,
      icon: 'images/delete.png',
    },
    Space: {
      type: IconKey,
      w: 360,
      icon: 'images/delete.png',
    },
  },
}
