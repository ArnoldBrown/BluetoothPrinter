import React, { useEffect } from 'react';
import {View, Text, StatusBar, Button} from 'react-native';
// import EscPosPrinter, {
//   getPrinterSeriesByName,
// } from 'react-native-esc-pos-printer';
//import { Printer, BluetoothManager } from 'react-native-esc-pos-printer';

//import { BLEPrinter } from 'react-native-thermal-receipt-printer-image-qr' 

const PrintScreen = ({navigation}) => {

  //const [devices, setDevices] = useState([]);

  // useEffect(() => {
  //   getDeviceList();
  // },[]);

  const printBill = () => {

  }

  // const printBill = async () => {
  //   try {
  //     const printers = await EscPosPrinter.discover();

  //     const printer = printers[0];

  //     await EscPosPrinter.init({
  //       target: printer.target,
  //       seriesName: getPrinterSeriesByName(printer.name),
  //       language: 'EPOS2_LANG_EN',
  //     });

  //     const printing = new EscPosPrinter.printing();

  //     const status = await printing
  //       .initialize()
  //       .align('center')
  //       .size(3, 3)
  //       .line('DUDE!')
  //       .smooth(true)
  //       .line('DUDE!')
  //       .smooth(false)
  //       .size(1, 1)
  //       .text('is that a ')
  //       .bold()
  //       .underline()
  //       .text('printer?')
  //       .newline()
  //       .bold()
  //       .underline()
  //       .align('left')
  //       .text('Left')
  //       .newline()
  //       .align('right')
  //       .text('Right')
  //       .newline()
  //       .size(1, 1)
  //       .textLine(48, {
  //         left: 'Cheesburger',
  //         right: '3 EUR',
  //         gapSymbol: '_',
  //       })
  //       .newline()
  //       .textLine(48, {
  //         left: 'Chickenburger',
  //         right: '1.5 EUR',
  //         gapSymbol: '.',
  //       })
  //       .newline()
  //       .size(2, 2)
  //       .textLine(48, {left: 'Happy Meal', right: '7 EUR'})
  //       .newline()
  //       .align('left')
  //       .text('Left')
  //       .newline()

  //       .align('right')
  //       .text('Right')
  //       .newline()

  //       .align('center')

  //       .image({uri: base64Image}, {width: 75})
  //       .image(
  //         {
  //           uri: 'https://raw.githubusercontent.com/tr3v3r/react-native-esc-pos-printer/main/ios/store.png',
  //         },
  //         {width: 75},
  //       )
  //       .barcode({
  //         value: 'Test123',
  //         type: 'EPOS2_BARCODE_CODE93',
  //         width: 2,
  //         height: 50,
  //         hri: 'EPOS2_HRI_BELOW',
  //       })
  //       .qrcode({
  //         value: 'Test123',
  //         level: 'EPOS2_LEVEL_M',
  //         width: 5,
  //       })
  //       .cut()
  //       .send();

  //     console.log('Success:', status);
  //   } catch (e) {
  //     console.log('Error:', status);
  //   }
  // };

  //  const scanAndConnect = async () => {
  //   try {
  //     const bluetoothManager = new BluetoothManager();
  //     const devices = await bluetoothManager.scanDevices();
  //     console.log('Nearby devices:', devices);
  //     const selectedDevice = devices[0]; // Select the first device for demo purposes
  //     const printer = new Printer();
  //     await printer.connect(selectedDevice.deviceName); // Connect to the selected device
  //     console.log('Connected to printer:', selectedDevice.deviceName);
  //     // You can now use the printer object to print as shown in the previous examples.
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#000'}></StatusBar>
      <View
        style={{
          backgroundColor: '#FFF',
          height: 50,
          flexDirection: 'row',
          elevation: 1,
        }}>
        <Text
          style={{
            marginLeft: 10,
            alignSelf: 'center',
            fontSize: 15,
          }}>
          Print
        </Text>
      </View>

      <View style={{flex: 1, margin: 10, justifyContent: 'center'}}>
        <Button
          onPress={() => printBill()}
          title="Print"
          color="#841584"
          accessibilityLabel="Print button"
        />
      </View>
    </View>
  );
};

export default PrintScreen;
