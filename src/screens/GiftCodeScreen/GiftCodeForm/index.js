import React from 'react';
import {View, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {FormattedMessage} from 'react-intl';
import AppButton from '@/components/AppButton';
import {container, formView} from './style';
import Input from '@/components/AppInput';
import {Formik} from 'formik';
import AppKeyboardAvoidingView from '@/components/AppKeyboardAvoidingView';
import {useTheme} from 'emotion-theming';

const GiftCodeForm = ({handleOnSubmit}) => {
  const theme = useTheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <AppKeyboardAvoidingView
        style={container}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <Formik
          initialValues={{
            redeemCode: '',
          }}
          onSubmit={handleOnSubmit}>
          {({handleSubmit, isValid}) => (
            <View style={formView(theme)}>
              <View>
                <Input
                  name="redeemCode"
                  autoFocus
                  colorVariant="primary"
                  label={
                    <FormattedMessage
                      id="enter_gift_code"
                      defaultMessage="Enter Gift Code"
                    />
                  }
                />
              </View>
              <View>
                <AppButton
                  onPress={handleSubmit}
                  text={
                    <FormattedMessage
                      id="button.submit"
                      defaultMessage="Submit"
                    />
                  }
                  disabled={!isValid}
                  variant="filled"
                  sizeVariant="large"
                  colorVariant="primary"
                />
              </View>
            </View>
          )}
        </Formik>
      </AppKeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default GiftCodeForm;
