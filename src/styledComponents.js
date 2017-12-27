import styled from 'styled-components';
import { get } from 'lodash';
const getImageSource = (props) => {
  // get(props, 'src', '') !== '' ? props.src : '#E4E4E4';
  const src = get(props, 'src', '');
  if (src.length) {
    return `
      url(${src}) no-repeat
    `
  }
  return '#E4E4E4';
}
  

export const Container = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  transition: margin-left 0.5s ease-in;
`;

export const ImageIcon = styled.div `
  height: 32px;
  width: 32px;
  border-radius: 4px;
  background: ${getImageSource};
  background-size:cover;
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default {
  Container,
  ImageIcon,
};
