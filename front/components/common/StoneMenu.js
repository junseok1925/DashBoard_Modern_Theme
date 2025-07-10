import React, { useCallback, useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { ThemeProvider} from 'styled-components';
import Responsive from './Responsive';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import Modal from 'react-modal';

import menuicon from '../../public/images/menu.png';
import { App2 } from '../styles/HeaderStyle';
import { logoutRequestAction, CHANGE_PASSWORD_REQUEST } from '../../reducers/auth';

export const App = styled.div`

background: white;

.modalss {
  position:absolute;
  top:65px;
  left:91%;
  transform: translate(-50%);
  background: white;
  z-index:100;
  width: 250px;
  border-radius: 5px;
  text-align:center;
  color:black;
  box-shadow: 0 0 2px gray;
}
.title {
  margin-top:0;
  font-size:20px;
  line-height: 50px;
  border-bottom: solid 1px #E5E5E5;
  &:hover {
    background: #E5E5E5;
    cursor: pointer;
  }
}

`;


const Menu = ({ me }) => {
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState(false);
  const [pwModalState, setPwModalState] = useState(false);
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const openCloseModal = () =>{ //모달창 실행 및 종료 버튼
    setModalState(!modalState);
  }
  const openClosePwModal = () =>{ //모달창 실행 및 종료 버튼
    setPwModalState(!pwModalState);
  }

  // 새 비밀번호값 받아오기
const onChangePwConfrim = (e) => {
  const password = e.target.value;
  setConfirmPassword(password);
};

// 새 비밀번호확인  값 받아오기
  const onChangePw = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  /**
 * 비밀번호 변경 함수
 */
  const onChangePassword = useCallback((e) => {  //0: 관리자 1:사용자 2:대기자

    let password1RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/; // 비밀번호 조건

    //비밀번호 안적을 시
    if (!Password){
      alert('새 비밀번호를 입력해주세요');
    }
    //비밀번호 조건에 맞지 않을 시
    else if (!password1RegExp.test(Password)) {
      alert('비밀번호는 최소 하나의 문자, 숫자, 특수문자 포함. 8자리 이상으로 입력하세요');
    }
    //새비밀번호와 새비밀번호가 같을 시
    else if (Password === ConfirmPassword){
      dispatch({
        type: CHANGE_PASSWORD_REQUEST,
        data: { id: me.id, password : Password }
      })
      alert('변경이 완료되었습니다.');
      setPwModalState(!pwModalState);// 비밀번호 변경 모달창 종료
    }
    //새비번과 새비번확인이 다를시
    else if (Password !== ConfirmPassword) {
      alert('비밀번호가 다릅니다.')
    }
    setPassword('');//새비밀번호 적는 곳 초기화
    setConfirmPassword('');// 비밀번호 확인 적는 곳 초기화


  }, [1, Password]);


  return (
    <div>
      <Image src={menuicon} alt='123' width={50} height={38} className='menu' onClick={openCloseModal}/>
      <Modal className='moda' isOpen={modalState} onRequestClose={openCloseModal}>
        <App>
          <div className='modalss'>
            <div className='title' onClick={openClosePwModal}>비밀번호변경</div>
            { me && me.authority === 0 ? <div className='title' onClick={() => Router.push('/account')}>계정관리</div>:''}
            { me && me.authority === 0 ? <div className='title' onClick={() => Router.push('/logs')}>로그관리</div>:''}
          </div>
        </App>
      </Modal>
      <Modal className='pwch' isOpen={pwModalState} onRequestClose={openClosePwModal}>
      <App2>
        <div className='modals'>
          <div className='title'><b>비밀번호 변경</b></div><hr />
          <div><b>비밀번호 입력 </b><input className='password' type='password' placeholder='  비밀번호를 입력하시오' value={ConfirmPassword} onChange={onChangePwConfrim} /></div>
          <div><b>비밀번호 확인 </b><input className='password' type='password' placeholder='  비밀번호를 입력하시오' value={Password} onChange={onChangePw} /></div>
          <br /><hr />
          <button className='button' onClick={onChangePassword}><b>변경</b></button> <button className='buttonC' onClick={openClosePwModal}><b>닫기</b></button></div>
        </App2>
      </Modal>

    </div>

  );
}

export default Menu;