import React, {useState, useContext} from 'react';
import {TouchableWithoutFeedback, Keyboard, View} from 'react-native';
import {FormattedMessage, useIntl} from 'react-intl';
import {Formik, useFormikContext} from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useMutation} from '@apollo/react-hooks'; // V2.6
// import {useMutation} from '@apollo/client'; // V3.0 beta
import {UPDATE_USER_PROFILE_API} from '@/api/data';

import {AuthContext} from '@/context/auth';
import Input from '@/components/Input';
import ThemeButton from '@/components/ThemeButton';
import GenderSelector, {genderOptions} from '@/components/GenderSelector';

import {
  Container,
  ScrollContainer,
  FormContainer,
  Title,
  Detail,
  RequiredText,
  FormInputContainer,
  Error,
  DateFieldContainer,
} from './style';

const FormInput = props => (
  <FormInputContainer>
    <Input {...props} />
  </FormInputContainer>
);

const DateTimePickerSelector = ({show, date, setFieldValue}) => {
  const onChange = (event, selectedDate) => {
    setFieldValue('dob', selectedDate);
  };
  return (
    <View>
      {show && (
        <DateTimePicker
          testID="date"
          value={date}
          mode="date"
          display="default"
          textColor="black"
          maximumDate={new Date()}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const UserProfileForm = ({showDatePicker, handleDatePickerPress}) => {
  const intl = useIntl();
  const {
    handleChange,
    handleSubmit,
    values,
    setFieldValue,
    errors,
    isValid,
  } = useFormikContext();
  return (
    <FormContainer>
      <FormInput
        label={<FormattedMessage id="your_name" />}
        required
        onChangeText={handleChange('name')}
        value={values.name}
        error={errors.name}
      />
      <GenderSelector gender={values.gender} setFieldValue={setFieldValue} />
      <Error>{errors.gender ? errors.gender : ' '}</Error>
      <DateFieldContainer onPress={handleDatePickerPress}>
        <FormInput
          label={<FormattedMessage id="date_of_birth" />}
          required
          value={intl.formatDate(values.dob, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
          editable={false}
          remark={<FormattedMessage id="claim_gift_on_birthday" />}
          placeholder="DD/MM/YYYY"
          pointerEvents="none"
        />
        <DateTimePickerSelector
          show={showDatePicker}
          date={values.dob}
          setFieldValue={setFieldValue}
        />
      </DateFieldContainer>
      <FormInput
        label={<FormattedMessage id="referral_code" />}
        onChangeText={handleChange('referralCode')}
        remark={
          <FormattedMessage
            id="edit_prefernece_afterward"
            defaultMessage="You can fill in later in profile page"
          />
        }
        value={values.referralCode}
      />
      <ThemeButton onPress={handleSubmit} title="Submit" disabled={!isValid}>
        <FormattedMessage id="submit" defaultMessage="submit" />
      </ThemeButton>
    </FormContainer>
  );
};

const UserProfileScreen = ({navigation}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [updateUserProfileRequest, {error}] = useMutation(
    UPDATE_USER_PROFILE_API,
  );
  const {authToken} = useContext(AuthContext);

  const handleDatePickerPress = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleSpacePress = () => {
    setShowDatePicker(false);
    Keyboard.dismiss();
  };

  const handleSubmitPress = async values => {
    // fail due to cannot add authorization header

    try {
      const {data} = await updateUserProfileRequest({
        variables: {
          name: values.name,
          gender: values.gender,
          dateOfBirth: values.dob.toISOString(),
          referalCode: values.referralCode,
        },
        context: {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        },
      });
      // updateUserAccountData({
      //   isEmailBound: data.login.isEmailBound,
      //   isProfileCompleted: data.login.isProfileCompleted,
      // });
    } catch (e) {
      console.error(e);
      // handle error later
    }

    navigation.navigate('account_setup_done');
  };

  const validate = values => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Name Required';
    }
    if (!values.gender) {
      errors.gender = 'Gender Required';
    }
    return errors;
  };

  return (
    <TouchableWithoutFeedback onPress={() => handleSpacePress()}>
      <Container behavior="position">
        <ScrollContainer
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always">
          <Title>
            <FormattedMessage id="let_us_know" />
          </Title>
          <Detail>
            <FormattedMessage id="we_hope_to_provide" />
          </Detail>
          <RequiredText>* means required</RequiredText>
          <Formik
            initialValues={{
              name: '',
              gender: genderOptions[0].value,
              dob: new Date(),
              referralCode: '',
            }}
            onSubmit={values => handleSubmitPress(values)}
            validate={values => validate(values)}>
            <UserProfileForm
              showDatePicker={showDatePicker}
              handleDatePickerPress={handleDatePickerPress}
            />
          </Formik>
        </ScrollContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default UserProfileScreen;
