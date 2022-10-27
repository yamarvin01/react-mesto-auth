// Типы иконок: success, fail

export default function Icon(props) {
  return (
    <img src={require(`../../styles/images/icon-${props.type}.png`)} />
  );
}
