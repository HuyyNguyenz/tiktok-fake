import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';

import configRoutes from '~/config/routes';
import image from '~/assets/images';
import styles from './Header.module.scss';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import {
  FeedbackIcon,
  InboxIcon,
  KeyboardIcon,
  LanguageIcon,
  LogOutIcon,
  MessageIcon,
  ProfileIcon,
  SettingIcon,
  TiktokCoinIcon,
} from '~/components/Icons';
import Search from '~/components/Search';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
  {
    icon: <LanguageIcon width="2rem" height="2rem" className="menu-icon" />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
      ],
    },
  },
  {
    icon: <FeedbackIcon width="2rem" height="2rem" className="menu-icon" />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <KeyboardIcon width="2rem" height="2rem" className="menu-icon" />,
    title: 'Keyboard shortcuts',
  },
];
function Header() {
  // Handle logic
  const handleMenuChange = (menuItem) => {
    console.log(menuItem);
  };

  const currentUser = true;
  const USER_MENU = [
    {
      icon: <ProfileIcon width="2rem" height="2rem" className="menu-icon" />,
      title: 'View profile',
      to: '/@huy3kk',
    },
    {
      icon: <TiktokCoinIcon width="2rem" height="2rem" className="menu-icon" />,
      title: 'Get coins',
      to: '/coin',
    },
    {
      icon: <SettingIcon width="2rem" height="2rem" className="menu-icon" />,
      title: 'Settings',
      to: '/settings',
    },
    ...MENU_ITEMS,
    {
      icon: <LogOutIcon width="2rem" height="2rem" className="menu-icon" />,
      title: 'Log out',
      to: '/logout',
      separate: 'separate',
    },
  ];

  return (
    <header className={cx('wrapper')}>
      <div className={cx('content')}>
        <Link to={configRoutes.home}>
          <img className={cx('tiktok-logo')} src={image.src} alt="tiktok-logo" />
        </Link>
        <div>
          <Search />
        </div>
        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <Button text leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                <span>Upload</span>
              </Button>
              <Tippy content="Message" placement="bottom">
                <button className={cx('action-btn')}>
                  <MessageIcon width="2.6rem" height="2.6rem" />
                </button>
              </Tippy>
              <Tippy content="Inbox" placement="bottom">
                <button className={cx('action-btn')}>
                  <InboxIcon />
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button text leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                <span>Upload</span>
              </Button>
              <Button primary>Login</Button>
            </>
          )}
          <Menu items={currentUser ? USER_MENU : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <Image
                className={cx('user-avatar')}
                alt="avatar"
                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/3076832c615a895e39ee03cd549a6eff~c5_720x720.jpeg?x-expires=1660024800&x-signature=3d%2BaA3%2FNNaiis5g3pPlnUE%2BjDek%3D"
                fallback="https://static.fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png"
              />
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
