import App from 'src/'
import settings from '../settings.json'

const virtualKeyboard = App(
  {
    stage: {
      ...settings['appSettings'].stage,
      useImageWorker: false,
      debug: false,
    },
    debug: false,
  },
  {
    ...settings['platformSettings'],
    log: false,
    fontLoader: jest.fn(),
  },
)

describe('Virtual Keyboard', () => {
  it('should render', () => {
    expect(virtualKeyboard).toMatchSnapshot()
  })

  it('should display App name', () => {
    const virtualKeyboardApp = virtualKeyboard._getFocused()

    // test app name
    let appName = virtualKeyboardApp.tag('Text').text.text
    expect(appName).toEqual('Virtual Keyboard')

    // test inputfield is wrapped in a rectangle
    let inputField = virtualKeyboardApp.tag('InputFieldWrapper').rect
    expect(inputField).toBe(true)
  })
})
