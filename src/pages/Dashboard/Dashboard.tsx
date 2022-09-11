/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { User } from '../../@types/entities/User';
import { DashboardActiveLists } from '../../components/Dashboard/ActiveLists/ActiveLists';
import { DashboardDailyProgress } from '../../components/Dashboard/DailyProgress/DailyProgress';
import { DashboardGreeting } from '../../components/Dashboard/Greeting/Greeting';
import { DashboardWordPacks } from '../../components/Dashboard/WordPacks/WordPacks';
import { Button } from '../../components/UI/Button/Button';
import { Dropdown } from '../../components/UI/DropDown/Dropdown';
import { Option } from '../../components/UI/DropDown/types';
import { languages } from '../../constants/languages';
import { Path } from '../../constants/routes';
import { useModal } from '../../context/ModalContext';
import { wordPack } from '../../mocks/pack';
import { startBtn } from '../../shared/styles/button-variations';
import { useGetListsByUserIdQuery } from '../../store/api/listApi';
import { useGetCurrentUserQuery } from '../../store/api/userApi';
import s from './Dashboard.module.scss';

export function DashboardPage() {
  const { data: user } = useGetCurrentUserQuery();
  const { data: userLists } = useGetListsByUserIdQuery(user?.id || 0);

  const langOption =
    languages.find(item => item.name === user?.langNative) || languages[0];
  const [lang, setLang] = useState<Option | undefined>(langOption);

  const navigate = useNavigate();

  const handleListAdd = () => {
    navigate(`/${Path.LISTS}`);
  };

  return (
    <div className={s.dashboardpage_container}>
      <div className={s.dashboardpage_header}>
        <div className={s.dashboardpage_greeting}>
          <DashboardGreeting name={user?.firstName || ''} />
        </div>
        <div className={s.dashboardpage_lang}>
          <Dropdown
            listTitle="Languages"
            options={languages}
            selectedItem={lang}
            setSelectedItem={(item: Option | undefined) => setLang(item)}
            allowNoneSelected={false}
            styles={{ width: '200px' }}
            listStyles={{ width: '300px', left: '-6.2rem' }}
          />
        </div>
      </div>
      <div className={s.dashboardpage_grid}>
        <div className={s.dashboardpage_row}>
          <DashboardActiveLists
            lists={userLists || null}
            onAddList={handleListAdd}
          />
          <DashboardDailyProgress />
        </div>
        <div className={s.dashboardpage_row}>
          <DashboardWordPacks packs={[wordPack]} />
          <Button
            type="primary"
            styles={startBtn}
            onClick={() => navigate(`/${Path.LEARNING}`)}
          >
            start learning
          </Button>
        </div>
      </div>
    </div>
  );
}
