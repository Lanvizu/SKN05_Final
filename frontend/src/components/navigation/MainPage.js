import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationLinks from './NavigationLinks';

const MainPage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div>
      <NavigationLinks />
      <div style={styles.content}>
        <h2 style={styles.title}>퀀톡에게 무엇이든 물어보세요</h2>
        <p style={styles.sub_title}>
          로그인하시면 더 많은 기능을 이용하실 수 있습니다.
        </p>
        <div style={styles.inputContainer}>
          <div style={styles.form}>
            <input
              type="text"
              placeholder="종목, 주가, 뉴스, 지표 등 다양한 정보를 물어보세요!"
              style={styles.input}
              onClick={handleLoginRedirect}
              readOnly
            />
          </div>
          <button onClick={handleLoginRedirect} style={styles.sendButton}>
            ↑
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  content: {
    marginTop: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 60px)',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
  },
  sub_title: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '30px',
    textAlign: 'center',
  },
  inputContainer: {
    padding: '5px',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #ddd',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: '15px',
    margin: '10px',
    width: '100%',
    maxWidth: '500px',
  },
  form: {
    flex: 1,
    marginRight: '10px',
  },
  input: {
    width: '95%',
    padding: '12px 15px',
    border: 'none',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
    textAlign: 'center',
  },
  sendButton: {
    padding: '12px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '25%',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    minWidth: '30px',
    marginRight:'5px',
  },
};

export default MainPage;