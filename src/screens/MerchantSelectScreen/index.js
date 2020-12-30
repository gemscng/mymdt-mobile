import React, {useState, useCallback} from 'react';
import {View, ScrollView} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';
import SafeAreaView from 'react-native-safe-area-view';

import AppButton from '@/components/AppButton';
import MerchantList from '@/components/MerchantList';
import PopupModal from '@/components/PopupModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import HeaderTitle from '@/components/HeaderTitle';
import AppText from '@/components/AppText2';
import useSetupFlow from '@/hooks/useSetupFlow';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import {
  GET_MERCHANTS_API,
  GET_ALLOWED_MERCHANT_NUM,
  CHOOSE_MERCHANTS_API,
} from '@/api/data';

import {
  container,
  scrollInnerContainer,
  fixedContainer,
  fixedInnerContainer,
  detailStyle,
  hightLightText,
  brandSelectedText,
} from './style';

const MerchantSelectScreen = ({route, navigation}) => {
  const theme = useTheme();
  const {navigateByFlow} = useSetupFlow();
  const [selectedMerchants, setSelectedMerchants] = useState([]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [isErrorFromMerchantList, setIsErrorFromMerchantList] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  // TODO: refactor these cumbersome states
  const {data, loading, error} = useQueryWithAuth(GET_MERCHANTS_API);
  const {
    data: allowedMerchantNum,
    loading: allowedMerchantNumLoading,
    error: allowedMerchantNumError,
  } = useQueryWithAuth(GET_ALLOWED_MERCHANT_NUM);
  const [chooseMerchantRequest] = useMutationWithAuth(CHOOSE_MERCHANTS_API);
  const numberOfMerchant =
    (allowedMerchantNum &&
      allowedMerchantNum.userProfile.membership.merchantsNumAllowed) ||
    0;

  const formatOfferString = () => {
    const result = selectedMerchants
      .map((merchant) => merchant.name)
      .join(' and ');
    return result;
  };

  const handlePopupState = (state) => {
    if (state === 'OK') {
      handleSubmitMerchant();
    }
    setShowConfirmPopup(false);
  };

  const handleNextPress = () => {
    setShowConfirmPopup(true);
  };

  const handleError = useCallback((isError, buttonDisabled) => {
    setIsErrorFromMerchantList(isError);
    setIsButtonDisabled(buttonDisabled);
  }, []);

  const handleSubmitMerchant = async () => {
    try {
      await chooseMerchantRequest({
        variables: {
          ids: selectedMerchants.map((selectedOffer) => selectedOffer.id),
        },
      });

      if (route?.params?.fromMerchantPreferenceEditScreen) {
        navigation.goBack();
        return;
      }

      navigateByFlow();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading || allowedMerchantNumLoading) {
    return <LoadingSpinner />;
  }

  if (error || allowedMerchantNumError) {
    return (
      <PopupModal
        title="Error"
        detail="Please try again later"
        callback={navigation.goBack}
      />
    );
  }

  return (
    <View style={container}>
      <ScrollView>
        <HeaderTitle>
          <FormattedMessage
            id="special_offer"
            defaultMessage="Select Merchants"
          />
        </HeaderTitle>
        <View style={scrollInnerContainer}>
          <AppText variant="body1" style={detailStyle(theme)}>
            <FormattedMessage
              id="please_select_merchants"
              defaultMessage="Please {select_merchant_text} for cash back"
              values={{
                select_merchant_text: (
                  <AppText variant="body1" style={hightLightText(theme)}>
                    <FormattedMessage
                      id="select_number_of_merchants"
                      defaultMessage="{number_of_merchants, plural, =0 {select no merchant} one {select # merchant} other {select # merchants}}"
                      values={{number_of_merchants: numberOfMerchant}}
                    />
                  </AppText>
                ),
              }}
            />
          </AppText>
          <MerchantList
            merchantList={data.merchants}
            selectedMerchants={selectedMerchants}
            setSelectedMerchants={setSelectedMerchants}
            merchantsLimit={numberOfMerchant}
            onError={handleError}
          />
        </View>
      </ScrollView>
      <SafeAreaView style={fixedContainer(theme)}>
        <View style={fixedInnerContainer(theme)}>
          <AppText
            variant="label"
            style={brandSelectedText(theme, isErrorFromMerchantList)}>
            <FormattedMessage
              id="merchants_selected"
              values={{
                selected: selectedMerchants.length,
                total: numberOfMerchant,
              }}
            />
          </AppText>
          <AppButton
            onPress={handleNextPress}
            disabled={isErrorFromMerchantList || isButtonDisabled}
            text={
              <FormattedMessage id="button.confirm" defaultMessage="confirm" />
            }
            variant="filled"
            sizeVariant="normal"
            colorVariant="secondary"
          />
        </View>
      </SafeAreaView>
      {!!showConfirmPopup && (
        <PopupModal
          title="Confirmation"
          detail={`You have chosen ${formatOfferString()} special offers. You can edit the preference in profile settings afterward.`}
          callback={handlePopupState}
        />
      )}
    </View>
  );
};

export default MerchantSelectScreen;
