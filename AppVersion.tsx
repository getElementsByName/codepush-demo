import * as React from 'react'
import DeviceInfo from 'react-native-device-info' // https://github.com/rebeccahughes/react-native-device-info
const CodePush = require('react-native-code-push')  // TODO: typing

interface ChildrenArgs {
  version: string
  buildVersion: string
  isLocal: boolean
  jsLabel: string | null
}

interface PropsType {
  children: (args: ChildrenArgs) => React.ReactNode | null
}

interface StateType {
  jsLabel: string | null
  isLocal: boolean | null
}

class AppVersion extends React.Component<PropsType, StateType> {
  state = {
    jsLabel: null,
    isLocal: null
  }

  private updateJsVersionFromCodePush() {
    if (!!CodePush === false) {  // code push 라이브러리가 정상적으로 설치 되지 않은 경우
      console.warn('Can\'t find CodePush')

      this.setState({ isLocal: true })
      return
    }

    CodePush.getCurrentPackage().then((localPackage) => {
      const isLocal = !!localPackage === false // https://github.com/Microsoft/react-native-code-push/blob/master/docs/api-js.md#codepushgetcurrentpackage

      if (isLocal) {
        this.setState({ isLocal })
      } else {
        const jsLabel = localPackage.label

        this.setState({ jsLabel, isLocal })
      }
    })
  }

  async componentDidMount() {
    this.updateJsVersionFromCodePush()

  }

  render() {
    const { children } = this.props
    const { jsLabel, isLocal } = this.state


    const version = DeviceInfo.getVersion()
    const buildVersion = DeviceInfo.getBuildNumber()

    if (isLocal !== null) { // 비동기 codepush 정보가 처리된 경우만
      return children({
        version,
        buildVersion,
        jsLabel,
        isLocal
      })
    }

    return null
  }
}

export { AppVersion }