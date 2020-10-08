import React from 'react';
import {FlatList} from 'react-native';

import {Container} from './style';

import MDTCoin from '@/components/MDTCoin';
import MRPCoin from '@/components/MRPCoin';
import TransactionItem from './TransactionItem';

import {MEASURABLE_REWARD_POINT} from '@/constants/currency';
import {useTheme} from 'emotion-theming';

const flexEnd = {justifyContent: 'flex-end'};

const TransactionList = ({transactionsHistoryList, cardType, ...props}) => {
  const theme = useTheme();
  const renderItem = ({item}) => (
    <TransactionItem
      item={item}
      cardType={cardType}
      {...props}
      coin={
        cardType === MEASURABLE_REWARD_POINT ? (
          <MRPCoin
            amount={item.node.amount}
            size={16}
            fontSize={16}
            color={theme.colors.textOfMrp}
            style={flexEnd}
          />
        ) : (
          <MDTCoin
            amount={item.node.amount}
            size={16}
            fontSize={16}
            color={theme.colors.textOfMdt}
            style={flexEnd}
          />
        )
      }
    />
  );

  return (
    <Container>
      <FlatList
        data={transactionsHistoryList}
        renderItem={renderItem}
        keyExtractor={(item) => item.node.id}
        onEndReachedThreshold={0.1}
        {...props}
      />
    </Container>
  );
};

export default TransactionList;
