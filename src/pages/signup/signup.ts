// import { Navigation } from '../../components/Navigation/navigation'
import { SignupForm } from '../../components/Signup/Form/signupForm'
import { ErrorBock } from '../../components/UI/ErrorBlock/errorBlock'
import userController from '../../controllers/userController'
import Block from '../../core/block'
import { withStore } from '../../core/store'
import template from './template.hbs'

class SignupPageBase extends Block {
  protected init(): void {
    // this.children.Navigation = new Navigation({})
    this.children.Form = new SignupForm()
    this.children.Error = new ErrorBock({
      message: ''
    })
    this.children.Error.setProps({ message: '' })
    this.props.isError = null
    userController.clearUserError()
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    (this.children.Error as Block).setProps({ message: newProps.isError })
    return true
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}

const withUser = withStore(state => ({ ...state.user }))
export const SignupPage = withUser(SignupPageBase)
