// Типы иконок: success, fail

export default function Icon(props) {
  return (
    <img
      className="icon"
      src={require(`../../styles/images/icon-${props.type}.png`)}
      alt="Иконка"
    />
  );
}
