import { GoBell } from 'react-icons/go';
import { AiOutlineMessage } from 'react-icons/ai';
import { Button } from '../button/Button';
import styles from './Topbar.module.css';
import { CiSearch } from 'react-icons/ci';
import { TextInput } from '../text-input/TextInput';

export const Topbar = () => {
  const notificationsIcon = <GoBell/>;
  const messagesIcon = <AiOutlineMessage />;
  const searchInpuConfig = {
    placeholder: 'Search',
    icon: <CiSearch />
  };

  return (
    <div className={styles.topbar}>
      <span className={styles.title}>Dashboard</span>
      <div className={styles["end-items"]}>
        <TextInput {...searchInpuConfig} />
        <Button icon={messagesIcon} />
        <Button icon={notificationsIcon} />
      </div>
    </div>

  );
};