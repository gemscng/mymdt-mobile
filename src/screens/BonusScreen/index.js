import React from 'react';
import {Text} from 'react-native';
import styled from '@emotion/native';
import {FormattedMessage} from 'react-intl';

import TabPage from '@/components/TabPage';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: ${props => props.theme.colors.white.normal};
`;

const Bonus = () => (
  <TabPage title={<FormattedMessage id="bonus" />}>
    <Container>
      <Text>This is Bonus Page</Text>
    </Container>
  </TabPage>
);

export default Bonus;
