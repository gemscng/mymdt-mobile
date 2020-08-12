import React, {useState, useContext} from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {Formik, useFormikContext} from 'formik';
import {AuthContext} from '@/context/auth';
import {useMutation} from '@apollo/react-hooks';
import {REPORT_MISSING_RECEIPT} from '@/api/data';

import {
  Container,
  Detail,
  AmountCurrencyContainer,
  CurrencyContainer,
  AmountContainer,
} from './style';

import ModalContainer from '@/components/ModalContainer';
import ThemeButton from '@/components/ThemeButton';
import Input from '@/components/AppInput';
import DateTimePickerInput from '@/components/DateTimePickerInput';

const Form = ({showDatePicker, handleDatePickerPress}) => {
  const {handleSubmit, isValid} = useFormikContext();

  return (
    <>
      <Input
        label={<FormattedMessage id="email" defaultMessage="Email" />}
        required
        name="email"
        keyboardType="email-address"
      />
      <Input
        label={
          <FormattedMessage id="receipt_title" defaultMessage="Receipt Ttile" />
        }
        required
        name="receiptTitle"
      />
      <Input
        label={
          <FormattedMessage
            id="sender_email"
            defaultMessage="Sender’s email address"
          />
        }
        required
        name="senderEmail"
        keyboardType="email-address"
      />
      <TouchableOpacity onPress={handleDatePickerPress}>
        <DateTimePickerInput
          label={
            <FormattedMessage id="receipt_date" defaultMessage="Receipt Date" />
          }
          required
          name="receiptDate"
          showDatePicker={showDatePicker}
        />
      </TouchableOpacity>
      <Input
        label={
          <FormattedMessage id="order_number" defaultMessage="Order Number" />
        }
        name="orderNumber"
      />
      <AmountCurrencyContainer>
        <CurrencyContainer>
          <Input
            label={<FormattedMessage id="amount" defaultMessage="amount" />}
            name="currencyCode"
          />
        </CurrencyContainer>
        <AmountContainer>
          <Input name="amount" keyboardType="numeric" />
        </AmountContainer>
      </AmountCurrencyContainer>
      <ThemeButton onPress={handleSubmit} title="Submit" disabled={!isValid}>
        <FormattedMessage id="submit" defaultMessage="submit" />
      </ThemeButton>
    </>
  );
};

const MissingReceiptScreen = ({navigation}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {authToken} = useContext(AuthContext);
  const [reportMissingReceipt] = useMutation(REPORT_MISSING_RECEIPT);

  const handleDatePickerPress = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleSpacePress = () => {
    Keyboard.dismiss();
    setShowDatePicker(false);
  };

  const handleSubmitPress = async values => {
    try {
      await reportMissingReceipt({
        variables: {
          recipient: values.email,
          subject: values.receiptTitle,
          sender: values.senderEmail,
          emailDate: values.receiptDate,
          orderNumber: values.orderNumber,
          currencyCode: values.currencyCode,
          amount: values.amount,
        },
        context: {
          headers: {
            authorization: authToken ? `Bearer ${authToken}` : '',
          },
        },
      });

      navigation.pop();
    } catch (e) {
      console.error('Error in updating user profile edit screen', e);
    }
    Keyboard.dismiss();
  };

  const initialValues = {
    email: '',
    receiptTitle: '',
    senderEmail: '',
    receiptDate: new Date(),
    orderNumber: '',
    currencyCode: 'HKD',
    amount: '',
  };

  const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = (
        <FormattedMessage id="required" defaultMessage="Required" />
      );
    }

    if (!values.receiptTitle) {
      errors.receiptTitle = (
        <FormattedMessage id="required" defaultMessage="Required" />
      );
    }

    if (!values.senderEmail) {
      errors.senderEmail = (
        <FormattedMessage id="required" defaultMessage="Required" />
      );
    }

    if (!values.receiptDate) {
      errors.receiptDate = (
        <FormattedMessage id="required" defaultMessage="Required" />
      );
    }

    return errors;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={handleSpacePress}>
          <ModalContainer
            title={
              <FormattedMessage
                id="missing_receipt"
                defaultMessage="ProfileMissing Receipt"
              />
            }>
            <Container>
              <Detail>
                <FormattedMessage
                  id="missing_receipt_detail"
                  defaultMessage="Please provide the detail of the missing email receipt as much as possible."
                />
              </Detail>
              <Detail>* required</Detail>
              <Formik
                initialValues={initialValues}
                onSubmit={values => handleSubmitPress(values)}
                validate={values => validate(values)}>
                <Form
                  showDatePicker={showDatePicker}
                  handleDatePickerPress={handleDatePickerPress}
                />
              </Formik>
            </Container>
          </ModalContainer>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MissingReceiptScreen;