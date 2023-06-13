import { Lightning, Utils, Colors } from '@lightningjs/sdk'
import { InputField, Keyboard, Key as BaseKey } from '@lightningjs/ui'

export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
  }
  // defining the component template for the virtual keyboard with it's respectie elements
  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        rect: true,
      },
      Text: {
        mount: 1,
        x: 1060,
        y: 120,
        text: {
          text: 'Virtual Keyboard',
          fontSize: 64,
          textColor: Colors('white').get(),
        },
      },
      Ball: {
        mount: 0.5,
        x: 0,
        y: 500,
        w: 100,
        h: 50,
        src: Utils.asset('images/ball.png'),
      },
      Content: {
        InputFieldWrapper: {
          x: 530,
          y: 130,
          rect: true,
          h: 75,
          w: 650,
          InputField: {
            x: 20,
            y: 20,
            type: InputField,
            description: 'Type here....',
            inputText: {
              textColor: Colors('black').get(),
            },
            cursor: {
              color: Colors('black').get(),
            },
          },
        },
        Keyboard: {
          y: 250,
          w: 1700,
          type: Keyboard,
          config: virtualKeyboardConfig,
          currentLayout: 'keys',
          maxCharacters: 30,
        },
      },
    }
  }

  // component lifecycle events

  // -init attched for the first time
  // Background animation
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

    // Ball animation
    this.tag('Ball')
      .animation({
        duration: 6,
        repeat: -1,
        stopMethod: 'immediate',
        actions: [
          { p: 'x', v: { 0: 50, 0.25: 250, 0.5: 500, 0.75: 450, 1: 50 } },
          { p: 'y', v: { 0: 50, 0.25: 250, 0.5: 50, 0.75: 100, 1: 50 } },
        ],
      })
      .start()
  }

  // attached to the render tree, top-down(for the first time)
  _setup() {
    const inputField = this.tag('InputField')
    this.tag('Keyboard').inputField(inputField)
  }

  // focusing on the keyboard componen as the active component
  _getFocused() {
    return this.tag('Keyboard')
  }
}

// logic for the keyboard key press
class Key extends BaseKey {
  _firstActive() {
    this.labelColors = {
      unfocused: Colors('black').get(),
      focused: Colors('white').get(),
    }
    this.backgroundColors = {
      unfocused: Colors('white').get(),
      focused: 0xff808080,
    }
  }

  static get width() {
    return 60
  }
  static get height() {
    return 60
  }
}

// logic for the icon keys (select and delete) on the keyboard
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
      focused: 0xff808080,
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

// defining configuartion object with it's properties for the keyboard
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
    spacing: 10,
    Row4: {
      spacing: 50,
    },
  },
  buttonTypes: {
    default: {
      type: Key,
    },
    Space: {
      type: IconKey,
      w: 280,
      y: 50,
      icon: 'images/select.png',
    },
    Backspace: {
      type: IconKey,
      w: 110,
      y: 50,
      icon: 'images/delete.png',
    },
  },
}
