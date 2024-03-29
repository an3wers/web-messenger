import { Button } from '../../components/UI/Button/button'
import { IconArrowBack } from '../../components/UI/Icons/20/ArrowBack/iconArrowBack'
import Block from '../../core/block'
import template from './template.hbs'
import { ProfileName } from '../../components/Profile/ProfileName/profileName'
import { ProfileAvatar } from '../../components/Profile/ProfileAvatar/profileAvatar'
import { ProfileInfo } from '../../components/Profile/ProfileInfo/profileInfo'
import { Modal } from '../../components/UI/Modal/modal'
import { FormEditProfile } from '../../components/Profile/FormEditInfo/formEditInfo'
import { FormEditPassword } from '../../components/Profile/FormEditPassword/formEditPassword'
// import { Navigation } from '../../components/Navigation/navigation'
import { withStore } from '../../core/store'
import router from '../../core/router/router'
import authController from '../../controllers/authController'
import { SuccessBlock } from '../../components/UI/SuccessBlock/successBlock'
import { FormChangeAvatar } from '../../components/Profile/FormChangeAvatar/formChangeAvatar'

class ProfilePageBase extends Block {
  protected init(): void {
    // this.children.Navigation = new Navigation({})
    this.children.ProfileAvatar = new ProfileAvatar({
      events: {
        click: () => {
          if (!Array.isArray(this.children.ModalChangeAvatar)) {
            this.children.ModalChangeAvatar.show()
          }
        }
      }
    })

    this.children.ProfileName = new ProfileName({})

    this.children.ProfileInfo = new ProfileInfo({})

    this.children.EditProfileButton = new Button({
      label: 'Изменить данные',
      styles: 'btn btn_regular btn_secondary',
      events: {
        click: () => {
          if (!Array.isArray(this.children.ModalProfile)) {
            this.children.ModalProfile.setProps({ isSuccessState: false })
            this.children.ModalProfile.show()
          }
        }
      }
    })
    this.children.EditPasswordButton = new Button({
      label: 'Изменить пароль',
      styles: 'btn btn_regular btn_secondary',
      events: {
        click: () => {
          if (!Array.isArray(this.children.ModalPassword)) {
            this.children.ModalPassword.setProps({ isSuccessState: false })
            this.children.ModalPassword.show()
          }
        }
      }
    })
    this.children.LogoutButton = new Button({
      label: 'Выйти',
      styles: 'btn btn_regular btn_light',
      events: {
        click: () => {
          authController.logout()
        }
      }
    })

    // TODO: Заменить Button на компонент Link
    this.children.GoBackButton = new Button({
      styles: 'btn btn_icon btn_primary btn_round-full',
      icon: new IconArrowBack({ styles: 'btn-icon btn-icon_white' }),
      events: {
        click: () => {
          router.go('/messenger')
        }
      }
    })

    this.children.ModalProfile = new Modal({
      title: 'Изменить данные',
      body: new FormEditProfile({
        user: this.props.data,
        closeHandler: this.closeModal.bind(this),
        switchHadler: this.switchStateModal.bind(this)
      }),
      successBody: new SuccessBlock({
        message: 'Данные профиля успешно изменены',
        context: 'ModalProfile',
        handler: this.closeModal.bind(this)
      }),
      isSuccessState: false
    })

    this.children.ModalPassword = new Modal({
      title: 'Изменить пароль',
      body: new FormEditPassword({
        closeHandler: this.closeModal.bind(this),
        switchHadler: this.switchStateModal.bind(this)
      }),
      successBody: new SuccessBlock({
        message: 'Пароль успешно изменен',
        context: 'ModalPassword',
        handler: this.closeModal.bind(this)
      }),
      isSuccessState: false
    })

    this.children.ModalChangeAvatar = new Modal({
      title: 'Загрузить файл',
      body: new FormChangeAvatar({
        closeHandler: this.closeModal.bind(this),
        switchHadler: this.switchStateModal.bind(this)
      }),
      successBody: new SuccessBlock({
        message: 'Файл успешно загружен',
        context: 'ModalChangeAvatar',
        handler: this.closeModal.bind(this)
      }),
      isSuccessState: false
    })
  }

  protected closeModal(modal: string) {
    ;(this.children[modal] as Block).hide()
  }

  protected switchStateModal(modal: string) {
    ;(this.children[modal] as Block).setProps({ isSuccessState: true })
    ;(this.children[modal] as Block).show()
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}

const withUser = withStore(state => ({ ...state.user }))
export const ProfilePage = withUser(ProfilePageBase)
