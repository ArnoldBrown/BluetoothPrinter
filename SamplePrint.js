import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {BluetoothEscposPrinter} from '@brooons/react-native-bluetooth-escpos-printer';
//import { hsdLogo } from './dummy-logo';

const SamplePrint = () => {
  return (
    <View>
      {/* <Text>Sample Print Instruction</Text> */}
      {/* <View style={styles.btn}>
        <Button
          onPress={async () => {
            await BluetoothEscposPrinter.printBarCode(
              '123456789012',
              BluetoothEscposPrinter.BARCODETYPE.JAN13,
              3,
              120,
              0,
              2,
            );
            await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
          }}
          title="Print BarCode"
        />
      </View>
      <View style={styles.btn}>
        <Button
          onPress={async () => {
            await BluetoothEscposPrinter.printQRCode(
              'https://hsd.co.id',
              280,
              BluetoothEscposPrinter.ERROR_CORRECTION.L,
            ); //.then(()=>{alert('done')},(err)=>{alert(err)});
            await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
          }}
          title="Print QRCode"
        />
      </View> */}

      {/* <View style={styles.btn}>
        <Button
          onPress={async () => {
            await BluetoothEscposPrinter.printerUnderLine(2);
            await BluetoothEscposPrinter.printText('Prawito Hudoro\r\n', {
              encoding: 'GBK',
              codepage: 0,
              widthtimes: 0,
              heigthtimes: 0,
              fonttype: 1,
            });
            await BluetoothEscposPrinter.printerUnderLine(0);
            await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
          }}
          title="Print UnderLine"
        />
      </View> */}

      {/* <View style={styles.btn}>
        <Button
          title="Print Struk Belanja"
          onPress={async () => {
            let columnWidths = [8, 20, 20];
            try {
              await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
            //  await BluetoothEscposPrinter.printPic(hsdLogo, { width: 250, left: 150 });
              await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
              await BluetoothEscposPrinter.printColumn(
                [48],
                [BluetoothEscposPrinter.ALIGN.CENTER],
                ['Jl. Brigjen Saptadji Hadiprawira No.93'],
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [32],
                [BluetoothEscposPrinter.ALIGN.CENTER],
                ['https://xfood.id'],
                {},
              );
              await BluetoothEscposPrinter.printText(
                '================================================',
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [24, 24],
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                ['Customer', 'Prawito Hudoro'],
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [24, 24],
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                ['Packaging', 'Iya'],
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [24, 24],
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                ['Delivery', 'Ambil Sendiri'],
                {},
              );
              await BluetoothEscposPrinter.printText(
                '================================================',
                {},
              );
              await BluetoothEscposPrinter.printText('Products\r\n', { widthtimes: 1 });
              await BluetoothEscposPrinter.printText(
                '================================================',
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                  BluetoothEscposPrinter.ALIGN.LEFT,
                  BluetoothEscposPrinter.ALIGN.LEFT,
                  BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ['1x', 'Cumi-Cumi', 'Rp.200.000'],
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                  BluetoothEscposPrinter.ALIGN.LEFT,
                  BluetoothEscposPrinter.ALIGN.LEFT,
                  BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ['1x', 'Tongkol Kering', 'Rp.300.000'],
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                columnWidths,
                [
                  BluetoothEscposPrinter.ALIGN.LEFT,
                  BluetoothEscposPrinter.ALIGN.LEFT,
                  BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ['1x', 'Ikan Tuna', 'Rp.400.000'],
                {},
              );
              await BluetoothEscposPrinter.printText(
                '================================================',
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [24, 24],
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                ['Subtotal', 'Rp.900.000'],
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [24, 24],
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                ['Packaging', 'Rp.6.000'],
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [24, 24],
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                ['Delivery', 'Rp.0'],
                {},
              );
              await BluetoothEscposPrinter.printText(
                '================================================',
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [24, 24],
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                ['Total', 'Rp.906.000'],
                {},
              );
              await BluetoothEscposPrinter.printText('\r\n\r\n', {});
              await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
              await BluetoothEscposPrinter.printQRCode(
                'DP0837849839',
                280,
                BluetoothEscposPrinter.ERROR_CORRECTION.L,
              );
              await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
              await BluetoothEscposPrinter.printColumn(
                [48],
                [BluetoothEscposPrinter.ALIGN.CENTER],
                ['DP0837849839'],
                { widthtimes: 2 },
              );
              await BluetoothEscposPrinter.printText(
                '================================================',
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [48],
                [BluetoothEscposPrinter.ALIGN.CENTER],
                ['Sabtu, 18 Juni 2022 - 06:00 WIB'],
                {},
              );
              await BluetoothEscposPrinter.printText(
                '================================================',
                {},
              );
              await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
              await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
            } catch (e) {
              alert(e.message || 'ERROR');
            }
          }}
        />
      </View> */}

      <View style={styles.btn}>
        <Button
          title="Print"
          onPress={async () => {
            let columnWidths = [8, 20, 20];
            let textBold = [{widthtimes:3},{widthtimes:2}];
            try {
              await BluetoothEscposPrinter.printText(
                '================================',
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [32],
                [BluetoothEscposPrinter.ALIGN.CENTER],
                ['LSGI XXXXX'],
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [32],
                [BluetoothEscposPrinter.ALIGN.CENTER],
                ['Harithamithram'],
                {},
              );
              await BluetoothEscposPrinter.printText(
                '--------------------------------',
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [12, 20],
                [
                  BluetoothEscposPrinter.ALIGN.LEFT,
                  BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ['Date:', '02/03-2023'],
                // [{
                //   text: "Bold Text:",
                //   width: 0.5,
                //   style: { fontWeight: 'bold' }
                // },
                // {
                //   text: "Value",
                //   width: 0.5,
                //   style: { fontWeight: 'bold' }
                // }],
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [12, 20],
                [
                  BluetoothEscposPrinter.ALIGN.LEFT,
                  BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ['Invoice No:', 'TRO000234'],
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [12, 20],
                [
                  BluetoothEscposPrinter.ALIGN.LEFT,
                  BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ['Invoice Period: ', '02:03:2023'],
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [12, 20],
                [
                  BluetoothEscposPrinter.ALIGN.LEFT,
                  BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ['Customer Id: ', 'TCUS0093'],
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [12, 20],
                [
                  BluetoothEscposPrinter.ALIGN.LEFT,
                  BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ['Customer Name:', 'Mohammed Abdul Qadir Jilani'],
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [12, 20],
                [
                  BluetoothEscposPrinter.ALIGN.LEFT,
                  BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ['Collected Amount:', '2000:00'],
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [12, 20],
                [
                  BluetoothEscposPrinter.ALIGN.LEFT,
                  BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ['Additional Amount:', '30:00'],
                {},
              );
              await BluetoothEscposPrinter.printText(
                '--------------------------------',
                {},
              );
              await BluetoothEscposPrinter.printColumn(
               
                [12, 20],
                [
                  BluetoothEscposPrinter.ALIGN.LEFT,
                  BluetoothEscposPrinter.ALIGN.RIGHT,
                ],
                ['Grand Total', '2030:00'],

                {},
              );

              await BluetoothEscposPrinter.printText(
                '================================',
                {},
              );
              await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
              await BluetoothEscposPrinter.printText('\r\n', {});

              await BluetoothEscposPrinter.cutOnePoint();
              // await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});

              //   await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
              // //  await BluetoothEscposPrinter.printPic(hsdLogo, { width: 250, left: 150 });
              //   await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
              //   await BluetoothEscposPrinter.printColumn(
              //     [48],
              //     [BluetoothEscposPrinter.ALIGN.CENTER],
              //     ['LSGI Name'],
              //     {},
              //   );
              //   await BluetoothEscposPrinter.printColumn(
              //     [32],
              //     [BluetoothEscposPrinter.ALIGN.CENTER],
              //     ['Harithamithram'],
              //     {},
              //   );
              //   await BluetoothEscposPrinter.printText(
              //     '================================',
              //     {},
              //   );
              //   await BluetoothEscposPrinter.printColumn(
              //     [20, 20],
              //     [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
              //     ['Date:', '02/03-2023'],
              //     {},
              //   );
              //   await BluetoothEscposPrinter.printColumn(
              //     [20, 20],
              //     [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
              //     ['Invoice No:', 'TRO000234'],
              //     {},
              //   );
              //   await BluetoothEscposPrinter.printColumn(
              //     [24, 24],
              //     [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
              //     ['Invoice Period: ', '02032023-09:34:41'],
              //     {},
              //   );
              //   await BluetoothEscposPrinter.printColumn(
              //     [24, 24],
              //     [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
              //     ['Customer Id: ', 'TCUS0093'],
              //     {},
              //   );
              //   await BluetoothEscposPrinter.printColumn(
              //     [24, 24],
              //     [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
              //     ['Customer Name:', 'Parasuram'],
              //     {},
              //   );
              //   await BluetoothEscposPrinter.printColumn(
              //     [24, 24],
              //     [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
              //     ['Collected Amount:', '2000:00'],
              //     {},
              //   );
              //   await BluetoothEscposPrinter.printColumn(
              //     [24, 24],
              //     [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
              //     ['Additional Amount:', '30:00'],
              //     {},
              //   );
              //   await BluetoothEscposPrinter.printColumn(
              //     [24, 24],
              //     [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
              //     ['Grand Total', '2030:00'],
              //     {},
              //   );

              //   await BluetoothEscposPrinter.printText('Products', { widthtimes: 1 });

              //   await BluetoothEscposPrinter.printText(
              //     '================================================',
              //     {},
              //   );
              //   await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
              //   await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
            } catch (e) {
              alert(e.message || 'ERROR');
            }
          }}
        />
      </View>
    </View>
  );
};

export default SamplePrint;

const styles = StyleSheet.create({
  btn: {
    marginBottom: 8,
  },
});
