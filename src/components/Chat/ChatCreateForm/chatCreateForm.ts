import chatsController from '../../../controllers/chatsController'
import Block from '../../../core/block'
import useValidate from '../../../core/validator'
import { Button } from '../../UI/Button/button'
import { ErrorMessage } from '../../UI/ErrorMessage/errorMessage'
import { Input } from '../../UI/Input/input'
import { TextField } from '../../UI/TextField/textField'
import template from './template.hbs'

interface ChatCreateFormProps {
  closeHandler: (value: string) => void
  switchHadler: (value: string) => void
}

export class ChatCreateForm extends Block<ChatCreateFormProps> {
  errors: { [key: string]: string }
  constructor(props: ChatCreateFormProps) {
    super(props)
    this.errors = {}
  }

  protected init(): void {
    this.children.ChatTitleField = new TextField({
      for: 'chat-title',
      label: 'Название',
      input: new Input({
        name: 'chat_title',
        id: 'chat-title',
        styles: 'form-element',
        type: 'text',
        placeholder: 'Введите название',
        events: {
          blur: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.ChatTitleField as Block
              )
            }
          }
        }
      }),
      error: new ErrorMessage({ text: null })
    })
    this.children.SaveButton = new Button({
      styles: 'btn btn_regular btn_primary',
      label: 'Добавить',
      type: 'submit',
      events: {
        click: e => {
          e!.preventDefault()

          const data = {} as { [key: string]: string }
          const inputEl = (
            (this.children.ChatTitleField as Block).children.input as Block
          ).getContent() as HTMLInputElement

          const { value, name } = inputEl

          this.validateHandler(value, this.children.ChatTitleField as Block)
          data[name] = value

          if (!Object.keys(this.errors).length) {
            console.log('New chat', data)
            chatsController.createChat({ title: data.chat_title })
            this.props.switchHadler('ModalCreateChat')

            // Очищаю value
            inputEl.value = ''
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
    return this.compile(template, this.props)
  }
}
