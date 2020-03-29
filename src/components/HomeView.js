import React from 'react';
import {
  Container, Content, Text, H1, H2, H3,
} from 'native-base';
import Spacer from './UI/Spacer';

const HomeView = () => (
  <Container>
    <Content padder>
      <Spacer size={30} />
      <H1>Wash Hands</H1>
    </Content>
  </Container>
);

export default HomeView;
