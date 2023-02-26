import Block from '../../../core/block.ts'
import template from './template.hbs'
import { Input } from '../../UI/Input/input.ts'
import { Button } from '../../UI/Button/button.ts'
import { IconArrowForward } from '../../UI/Icons/24/ArrowForward/iconArrowForward.ts'

export class ChatSelectedForm extends Block {
  protected init(): void {
    this.children.ChatInput = new Input({
      styles: 'form-element form-element_round-full',
      placeholder: 'Сообщение',
      type: 'text'
    })

    this.children.SendButton = new Button({
      styles: 'btn btn_primary btn_icon btn_round-full',
      icon: new IconArrowForward({
        styles: 'btn-icon btn-icon_white'
      }),
      type: 'submut',
      events: {
        click: (e: Event) => {
            e.preventDefault()
            console.log('send message')
        }
      }
    })
  }

  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}