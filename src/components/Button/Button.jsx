import s from './Button.module.css';

function Button({ onClick, type, children }) {
  return (
    <button onClick={onClick} type={type} className={s.button}>
      {children}
    </button>
  );
}

export default Button;
