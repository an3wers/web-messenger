import userController from '../../../controllers/userController'
import Block from '../../../core/block'
import useValidate from '../../../core/validator'
import { Button } from '../../UI/Button/button'
import { ErrorMessage } from '../../UI/ErrorMessage/errorMessage'
import { Input } from '../../UI/Input/input'
import { TextField } from '../../UI/TextField/textField'
import { User } from '../types'
import template from './template.hbs'

interface FormEditProfileProps {
  user: User
  closeHandler: (value: string) => void
  switchHadler: (value: string) => void
}

export class FormEditProfile extends Block<FormEditProfileProps> {
  errors: { [key: string]: string }
  constructor(props: FormEditProfileProps) {
    super(props)
    this.errors = {}
  }

  protected init(): void {
    this.children.EmailField = new TextField({
      for: 'email-profile-modal',
      label: 'Почта',
      input: new Input({
        name: 'email',
        id: 'email-profile-modal',
        styles: 'form-element',
        type: 'email',
        placeholder: 'Введите вашу почту',
        value: this.props?.user?.email,
        events: {
          focus: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.EmailField as Block
              )
            }
          },
          blur: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.EmailField as Block
              )
            }
          }
        }
      }),
      error: new ErrorMessage({ text: null })
    })

    this.children.LoginField = new TextField({
      for: 'login-profile-modal',
      label: 'Логин',
      input: new Input({
        name: 'login',
        id: 'login-profile-modal',
        styles: 'form-element',
        type: 'text',
        placeholder: 'Придумайте логин',
        value: this.props?.user?.login,
        events: {
          focus: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.LoginField as Block
              )
            }
          },
          blur: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.LoginField as Block
              )
            }
          }
        }
      }),
      error: new ErrorMessage({ text: null })
    })

    this.children.FirstNameField = new TextField({
      for: 'first-name-profile-modal',
      label: 'Имя',
      input: new Input({
        name: 'first_name',
        id: 'first-name-profile-modal',
        styles: 'form-element',
        type: 'text',
        placeholder: 'Введите ваше имя',
        value: this.props?.user?.first_name,
        events: {
          focus: e => {
            if (e) {
              const name = (e.target as HTMLInputElement).name
              this.validateHandler(
                this.getValue(name),
                this.children.FirstNameField as Block
              )
            }
          },
          blur: e => {
            if (e) {
              const name = (e.target as HTMLInputElement).name
              this.validateHandler(
                this.getValue(name),
                this.children.FirstNameField as Block
              )
            }
          }
        }
      }),
      error: new ErrorMessage({ text: null })
    })

    this.children.SecondNameField = new TextField({
      for: 'second-name-profile-modal',
      label: 'Фамилия',
      input: new Input({
        name: 'second_name',
        id: 'second-name-profile-modal',
        styles: 'form-element',
        type: 'text',
        placeholder: 'Введите вашу фамилию',
        value: this.props?.user?.second_name,
        events: {
          focus: e => {
            if (e) {
              const name = (e.target as HTMLInputElement).name
              this.validateHandler(
                this.getValue(name),
                this.children.SecondNameField as Block
              )
            }
          },
          blur: e => {
            if (e) {
              const name = (e.target as HTMLInputElement).name
              this.validateHandler(
                this.getValue(name),
                this.children.SecondNameField as Block
              )
            }
          }
        }
      }),
      error: new ErrorMessage({ text: null })
    })

    this.children.DisplayNameField = new TextField({
      for: 'display-name-profile-modal',
      label: 'Имя в чате',
      input: new Input({
        name: 'display_name',
        id: 'display-name-profile-modal',
        styles: 'form-element',
        type: 'text',
        value: this.props?.user?.display_name,
        placeholder: 'Введите ваше имя в чате',
        events: {
          focus: e => {
            if (e) {
              const name = (e.target as HTMLInputElement).name
              this.validateHandler(
                this.getValue(name),
                this.children.DisplayNameField as Block
              )
            }
          },
          blur: e => {
            if (e) {
              const name = (e.target as HTMLInputElement).name
              this.validateHandler(
                this.getValue(name),
                this.children.DisplayNameField as Block
              )
            }
          }
        }
      }),
      error: new ErrorMessage({ text: null })
    })

    this.children.PhoneField = new TextField({
      for: 'phone-profile-modal',
      label: 'Телефон',
      input: new Input({
        name: 'phone',
        id: 'phone-profile-modal',
        styles: 'form-element',
        type: 'tel',
        placeholder: 'Например: +7(999)123-45-67',
        value: this.props?.user?.phone,
        events: {
          focus: e => {
            if (e) {
              const name = (e.target as HTMLInputElement).name
              this.validateHandler(
                this.getValue(name),
                this.children.PhoneField as Block
              )
            }
          },
          blur: e => {
            if (e) {
              const name = (e.target as HTMLInputElement).name
              this.validateHandler(
                this.getValue(name),
                this.children.PhoneField as Block
              )
            }
          }
        }
      }),
      error: new ErrorMessage({ text: null })
    })

    this.children.SaveButton = new Button({
      styles: 'btn btn_regular btn_primary',
      label: 'Сохранить',
      type: 'submit',
      events: {
        click: e => {
          e!.preventDefault()

          const data: { [key: string]: string } = {}

          const filedsArray = Object.entries(this.children).filter(el =>
            el[0].includes('Field')
          )

          filedsArray.forEach(([_, val]) => {
            if (!Array.isArray(val)) {
              const { value, name } = (
                val.children.input as Block
              ).getContent() as HTMLInputElement

              this.validateHandler(value, val)
              data[name] = value
            }
          })

          if (!Object.keys(this.errors).length) {
            userController.changeProfile(data as unknown as User)
            this.props.switchHadler('ModalProfile')
          }
        }
      }
    })
  }

  private getValue(name: string) {
    return (
      this.element!.querySelector(`input[name=${name}]`) as HTMLInputElement
    ).value
  }

  private validateHandler(value: string, field: Block) {
    const { name } = (
      field.children.input as Block
    ).getContent() as HTMLInputElement

    const err = useValidate({ value, type: name })
    if (Object.keys(err).length) {
      this.errors[name] = err[name]
      ;(field.children.error as Block).setProps({ text: err[name] })
    } else {
      ;(field.children.error as Block).setProps({ text: null })
      delete this.errors[name]
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}
