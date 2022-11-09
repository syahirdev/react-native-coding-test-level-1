import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Modal from 'react-native-modal';
import _ from 'lodash';

export default function FormScreen() {
  // STATES
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdayDate, setBirthdayDate] = useState(new Date());
  const [birthdayText, setBirthdayText] = useState('');
  const [isBirthdayModalVisible, setIsBirthdayModalVisible] = useState(false);
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);

  // FUNCTIONS
  const onChangeBirthday = (event, selectedDate) => {
    setIsBirthdayModalVisible(false);
    setBirthdayDate(selectedDate);
    setBirthdayText(moment(selectedDate).format('L'));
  };

  const onSubmitForm = () => {
    if(_.isEmpty(userName)) {
      alert('Username cannot be empty!');
      return;
    }

    if(/[^a-zA-Z]/.test(userName)) {
      alert('Username must contain letters only!');
      return;
    }

    if(userName.length > 50) {
      alert('Username should not be longer than 50 characters!');
      return;
    }

    if(_.isEmpty(email)) {
      alert('Email cannot be empty!');
      return;
    }

    if(!( /[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) )) {
      alert('Email address must be in valid format!');
      return;
    }

    if(_.isEmpty(birthdayText)) {
      alert('Birthday cannot be empty!');
      return;
    }

    setIsSubmitModalVisible(true);
  };

  // VIEWS
  return (
    <View style={styles.container}>

      {/*Username*/}
      <TextInput
        style={styles.textInput}
        placeholder='Username'
        value={userName}
        onChangeText={setUserName}
      />

      {/*Email*/}
      <TextInput
        style={styles.textInput}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
      />

      {/*Birthday*/}
      <Pressable onPress={() => setIsBirthdayModalVisible(true)}>
        <Text style={[styles.textInput, styles.dateInput, { color: birthdayText ? 'black' : 'darkgray' }]}>
          {birthdayText || 'Birthday date'}
        </Text>
      </Pressable>

      {/*Submit Button*/}
      <Button title='Submit' onPress={onSubmitForm}/>

      {/*Birthday Modal*/}
      {isBirthdayModalVisible && (
        <RNDateTimePicker
          value={birthdayDate}
          mode='date'
          maximumDate={new Date()}
          onChange={onChangeBirthday}
        />
      )}

      {/*Submit Modal*/}
      <Modal isVisible={isSubmitModalVisible} onBackdropPress={() => setIsSubmitModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View>
            <Text style={styles.title}>Username</Text>
            <Text style={styles.description}>{userName}</Text>
          </View>
          <View>
            <Text style={styles.title}>Email</Text>
            <Text style={styles.description}>{email}</Text>
          </View>
          <View>
            <Text style={styles.title}>Birthday</Text>
            <Text style={styles.description}>{birthdayText}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white'
  },
  textInput: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 15,
    borderRadius: 5,
    borderColor: '#e6e6e6',
    borderWidth: 1
  },
  dateInput: {
    paddingVertical: 12
  },
  modalContainer: {
    height: 170,
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5
  },
  title: {
    fontWeight: '800'
  },
  description: {
    color: 'gray'
  }
});
