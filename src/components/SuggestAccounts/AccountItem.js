// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './SuggestAccounts.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
  return (
    <div className={cx('account-item')}>
      <img
        className={cx('avatar')}
        src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/fac92301a36c2275c99f393061ef04ca~c5_100x100.jpeg?x-expires=1660888800&x-signature=PZlGak7bVFQxx2z4lsH10cqHqjg%3D"
        alt="avatar"
      />
      <div className={cx('item-info')}>
        <p className={cx('nickname')}>
          <strong>HuyyNguyenz</strong>
          <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
        </p>
        <p className={cx('name')}>Nguyễn Quang Huy</p>
      </div>
    </div>
  );
}

AccountItem.propTypes = {};

export default AccountItem;
