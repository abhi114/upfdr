import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Platform,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

const TrialStretchForm = () => {
  const [packageSelected, setPackageSelected] = useState(null);
  const [date, setDate] = useState(new Date());
  const [comment, setComment] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // Keep the picker open for iOS, close it for Android
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.header}>Add New Trial Stretch Date Request</Text>

      {/* Package Picker */}
      <Text style={styles.label}>Package</Text>
      <RNPickerSelect
        onValueChange={value => setPackageSelected(value)}
        items={[
          {label: 'UP0001 | Agra', value: 'UP0001'},
          {label: 'UP0002 | Delhi', value: 'UP0002'},
          {label: 'UP0003 | Mumbai', value: 'UP0003'},
        ]}
        style={pickerSelectStyles}
        placeholder={{label: 'Select Package', value: null}}
      />

      {/* Date Input */}
      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        value={date.toLocaleDateString('en-GB')} // Display the date in dd-mm-yyyy format
        onFocus={() => setShowDatePicker(true)} // Show the picker when the field is focused
        placeholder="dd-mm-yyyy"
        placeholderTextColor="#A0A0A0"
      />

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}

      {/* Comment Input */}
      <Text style={styles.label}>Comment</Text>
      <TextInput
        style={styles.input}
        value={comment}
        onChangeText={setComment}
        placeholder="Enter comment"
        placeholderTextColor="#A0A0A0"
        multiline
      />

      {/* Submit Button */}
      <Button
        title="Make Request"
        color="#00FF00"
        onPress={() => {
          /* handle submission */
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#191C24',
    padding: 20,
    borderRadius: 10,
  },
  header: {
    color: '#FFF',
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  label: {
    color: '#FFF',
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#292C34',
    color: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    backgroundColor: '#292C34',
    color: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  inputAndroid: {
    backgroundColor: '#292C34',
    color: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
};

export default TrialStretchForm;
