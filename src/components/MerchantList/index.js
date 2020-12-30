import React, {useEffect} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {useTheme} from 'emotion-theming';
import {
  container,
  merchant as merchantContainer,
  checkBox,
  icon,
  stateContainer,
  merchantNameStyle,
} from './style';

import BrandIcon from '@/components/BrandIcon';
import AppText from '@/components/AppText2';

const Merchant = ({name, logo, cashbackRate, selected, isError, ...props}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={merchantContainer(theme, selected, isError)}
      {...props}>
      <BrandIcon ImgSrc={{uri: logo}} sizeVariant="large" />
      <AppText variant="subTitle1" style={merchantNameStyle(theme)}>
        {name}
      </AppText>
      {!props.disabled && (
        <View style={stateContainer}>
          {selected ? (
            <Image source={require('@/assets/tick.png')} />
          ) : (
            <View style={checkBox(theme)} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const MerchantList = ({
  merchantList,
  selectedMerchants,
  setSelectedMerchants,
  merchantsLimit,
  onError,
}) => {
  const isError =
    !selectedMerchants || selectedMerchants.length > merchantsLimit;
  const merchantDisabled = !selectedMerchants || !setSelectedMerchants;
  const buttonDisabled = isError || selectedMerchants.length < merchantsLimit;

  useEffect(() => {
    if (onError) {
      onError(isError, buttonDisabled);
    }
  }, [isError, onError, buttonDisabled]);

  const onSelect = (merchant) => {
    // deselect merchant
    if (
      selectedMerchants.find(
        (selectedOffer) => selectedOffer.id === merchant.id,
      )
    ) {
      setSelectedMerchants(
        selectedMerchants.filter(
          (selectedOffer) => selectedOffer.id !== merchant.id,
        ),
      );
      return;
    }

    // select merchant
    setSelectedMerchants([
      ...selectedMerchants,
      {
        id: merchant.id,
        name: merchant.name,
        logo: merchant.logo,
      },
    ]);
  };

  return (
    <View>
      <View style={container}>
        {merchantList.map((merchant) => (
          <Merchant
            name={merchant.name}
            logo={merchant.logo}
            key={merchant.id}
            selected={
              selectedMerchants &&
              !!selectedMerchants.find((sb) => sb.id === merchant.id)
            }
            onPress={() => setSelectedMerchants && onSelect(merchant)}
            disabled={merchantDisabled}
            isError={isError}
          />
        ))}
      </View>
    </View>
  );
};

export default MerchantList;
