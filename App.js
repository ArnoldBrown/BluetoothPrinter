import React, { useState, useEffect, useCallback } from 'react';
import {
  ActivityIndicator,
  DeviceEventEmitter,
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  View,
  Button,
  StyleSheet,
} from 'react-native';
import { BluetoothManager } from '@brooons/react-native-bluetooth-escpos-printer';
import { PERMISSIONS, requestMultiple, RESULTS } from 'react-native-permissions';
import ItemList from './ItemList';
import SamplePrint from './SamplePrint';
// import {styles} from './styles'

const App = () => {
  const [pairedDevices, setPairedDevices] = useState([]);
  const [foundDs, setFoundDs] = useState([]);
  const [bleOpend, setBleOpend] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [boundAddress, setBoundAddress] = useState('');

  useEffect(() => {

    const isEnabled = BluetoothManager.checkBluetoothEnabled();
    setBleOpend(Boolean(isEnabled));

    // BluetoothManager.checkBluetoothEnabled().then(
    //   enabled => {
    //     setBleOpend(Boolean(enabled));
    //     setLoading(false);
    //   },
    //   err => {
    //     err;
    //   },
    // );

    if (Platform.OS === 'ios') {
      let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
      bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, rsp => {
        deviceAlreadPaired(rsp);
      });
      bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, rsp => {
        deviceFoundEvent(rsp);
      });
      bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, () => {
        setName('');
        setBoundAddress('');
      });
    } else if (Platform.OS === 'android') {
      DeviceEventEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, rsp => {
        deviceAlreadPaired(rsp);
      });
      DeviceEventEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, rsp => {
        deviceFoundEvent(rsp);
      });
      DeviceEventEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, () => {
        setName('');
        setBoundAddress('');
      });
      DeviceEventEmitter.addListener(BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT, () => {
        ToastAndroid.show('Device Not Support Bluetooth !', ToastAndroid.LONG);
      });
    }
    if (pairedDevices.length < 1) {
     scan();
    }
  }, [boundAddress, deviceAlreadPaired, deviceFoundEvent, pairedDevices, scan]);

  const deviceAlreadPaired = useCallback(
    rsp => {
      var ds = null;
      if (typeof rsp.devices === 'object') {
        ds = rsp.devices;
      } else {
        try {
          ds = JSON.parse(rsp.devices);
        } catch (e) {}
      }
      if (ds && ds.length) {
        let pared = pairedDevices;
        if (pared.length < 1) {
          pared = pared.concat(ds || []);
        }
        setPairedDevices(pared);
      }
    },
    [pairedDevices],
  );

  const deviceFoundEvent = useCallback(
    rsp => {
      var r = null;
      try {
        if (typeof rsp.device === 'object') {
          r = rsp.device;
        } else {
          r = JSON.parse(rsp.device);
        }
      } catch (e) {
        // ignore error
      }

      if (r) {
        let found = foundDs || [];
        if (found.findIndex) {
          let duplicated = found.findIndex(function (x) {
            return x.address == r.address;
          });
          if (duplicated == -1) {
            found.push(r);
            setFoundDs(found);
          }
        }
      }
    },
    [foundDs],
  );

  const connect = row => {
    console.log("sdsdsddsd","cominggg");
    setLoading(true);
    BluetoothManager.connect(row.address).then(
      s => {
        setLoading(false);
        setBoundAddress(row.address);
        setName(row.name || 'UNKNOWN');
      },
      e => {
        setLoading(false);
        alert(e);
      },
    );
  };

  const unPair = address => {
    setLoading(true);
    BluetoothManager.disconnect(address).then(
      s => {
        setLoading(false);
        setBoundAddress('');
        setName('');
      },
      e => {
        setLoading(false);
        alert(e);
      },
    );
  };

  const scanDevices = useCallback(() => {
    setLoading(true);
    BluetoothManager.scanDevices().then(
      s => {
        // const pairedDevices = s.paired;
        var found = s.found;
        try {
          found = JSON.parse(found); //@FIX_it: the parse action too weired..
        } catch (e) {
          //ignore
        }
        var fds = foundDs;
        if (found && found.length) {
          fds = found;
        }
        setFoundDs(fds);
        setLoading(false);
      },
      er => {
        setLoading(false);
        // ignore
      },
    );
  }, [foundDs]);

  const scan = useCallback(() => {
    try {
      async function blueTooth() {
        const permissions = {
          title: 'HSD bluetooth meminta izin untuk mengakses bluetooth',
          message: 'HSD bluetooth memerlukan akses ke bluetooth untuk proses koneksi ke bluetooth printer',
          buttonNeutral: 'Lain Waktu',
          buttonNegative: 'Tidak',
          buttonPositive: 'Boleh',
        };

        const bluetoothConnectGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          permissions,
        );
        if (bluetoothConnectGranted === PermissionsAndroid.RESULTS.GRANTED) {
          const bluetoothScanGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            permissions,
          );
          if (bluetoothScanGranted === PermissionsAndroid.RESULTS.GRANTED) {
           scanDevices();
            // console.log("pspspps","yessss");
          }
        } else {
          // ignore akses ditolak
        }
      }
      blueTooth();
    } catch (err) {
      console.warn(err);
    }
  }, [scanDevices]);
  
  const scanBluetoothDevice = async () => {
    setLoading(true);
    try {
      const request = await requestMultiple([
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ]);

      if (request['android.permission.ACCESS_FINE_LOCATION'] === RESULTS.GRANTED) {
        scanDevices();
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
      <ScrollView style={styles.container}>
        <View style={styles.bluetoothStatusContainer}>
          <Text style={styles.bluetoothStatus(bleOpend ? '#47BF34' : '#A8A9AA')}>
            Bluetooth {bleOpend ? 'Active' : 'Non Active'}
          </Text>
        </View>
        {!bleOpend && <Text style={styles.bluetoothInfo}>Mohon aktifkan bluetooth anda</Text>}
        <Text style={styles.sectionTitle}>Printer connected to the application:</Text>
        {boundAddress.length > 0 && (
          <ItemList
            label={name}
            value={boundAddress}
            onPress={() => unPair(boundAddress)}
            actionText="Unpair"
            color="#E9493F"
          />
        )}
        {boundAddress.length < 1 && (
          <Text style={styles.printerInfo}>There is no printer connected yet</Text>
        )}
        <Text style={styles.sectionTitle}>Bluetooth connected to this device:</Text>
        {loading ? <ActivityIndicator animating={true} /> : null}
        <View style={styles.containerList}>
          {pairedDevices.map((item, index) => {
            return (
              <ItemList
                key={index}
                onPress={() => connect(item)}
                label={item.name}
                value={item.address}
                connected={item.address === boundAddress}
                actionText="Pair"
                color="#00BCD4"
              />
            );
          })}
        </View>
        <SamplePrint />
        <Button
          onPress={() => scanBluetoothDevice()}
          title="Scan Bluetooth"
        />
        <View style={{height: 100}} />
      </ScrollView>
  );
};

export default App;



// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

// import PrintScreen from './src/PrintScreen';

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="PrintScreen">
//         <Stack.Screen
//           name="PrintScreen"
//           component={PrintScreen}
//           options={{headerShown: false}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

// import React, {Component} from 'react';
// import {
//   ActivityIndicator,
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   ScrollView,
//   DeviceEventEmitter,
//   NativeEventEmitter,
//   Switch,
//   TouchableOpacity,
//   Dimensions,
//   ToastAndroid,
// } from 'react-native';
// import {
//   BluetoothEscposPrinter,
//   BluetoothManager,
//   BluetoothTscPrinter,
// } from '@brooons/react-native-bluetooth-escpos-printer';
// // import EscPos from "./escpos";
// // import Tsc from "./tsc";

// var {height, width} = Dimensions.get('window');

// export default class App extends Component {
//   _listeners = [];

//   constructor() {
//     super();
//     this.state = {
//       devices: null,
//       pairedDs: [],
//       foundDs: [],
//       bleOpend: false,
//       loading: true,
//       boundAddress: '',
//       debugMsg: '',
//     };
//   }

//   componentDidMount() {
//     //alert(BluetoothManager)
//     BluetoothManager.isBluetoothEnabled().then(
//       enabled => {
//         this.setState({
//           bleOpend: Boolean(enabled),
//           loading: false,
//         });
//       },
//       err => {
//         err;
//       },
//     );

//     if (Platform.OS === 'ios') {
//       let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
//       this._listeners.push(
//         bluetoothManagerEmitter.addListener(
//           BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
//           rsp => {
//             this._deviceAlreadPaired(rsp);
//           },
//         ),
//       );
//       this._listeners.push(
//         bluetoothManagerEmitter.addListener(
//           BluetoothManager.EVENT_DEVICE_FOUND,
//           rsp => {
//             this._deviceFoundEvent(rsp);
//           },
//         ),
//       );
//       this._listeners.push(
//         bluetoothManagerEmitter.addListener(
//           BluetoothManager.EVENT_CONNECTION_LOST,
//           () => {
//             this.setState({
//               name: '',
//               boundAddress: '',
//             });
//           },
//         ),
//       );
//     } else if (Platform.OS === 'android') {
//       this._listeners.push(
//         DeviceEventEmitter.addListener(
//           BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
//           rsp => {
//             this._deviceAlreadPaired(rsp);
//           },
//         ),
//       );
//       this._listeners.push(
//         DeviceEventEmitter.addListener(
//           BluetoothManager.EVENT_DEVICE_FOUND,
//           rsp => {
//             this._deviceFoundEvent(rsp);
//           },
//         ),
//       );
//       this._listeners.push(
//         DeviceEventEmitter.addListener(
//           BluetoothManager.EVENT_CONNECTION_LOST,
//           () => {
//             this.setState({
//               name: '',
//               boundAddress: '',
//             });
//           },
//         ),
//       );
//       this._listeners.push(
//         DeviceEventEmitter.addListener(
//           BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT,
//           () => {
//             ToastAndroid.show(
//               'Device Not Support Bluetooth !',
//               ToastAndroid.LONG,
//             );
//           },
//         ),
//       );
//     }
//   }

//   componentWillUnmount() {
//     //for (let ls in this._listeners) {
//     //    this._listeners[ls].remove();
//     //}
//   }

//   _deviceAlreadPaired(rsp) {
//     var ds = null;
//     if (typeof rsp.devices == 'object') {
//       ds = rsp.devices;
//     } else {
//       try {
//         ds = JSON.parse(rsp.devices);
//       } catch (e) {}
//     }
//     if (ds && ds.length) {
//       let pared = this.state.pairedDs;
//       pared = pared.concat(ds || []);
//       this.setState({
//         pairedDs: pared,
//       });
//     }
//   }

//   _deviceFoundEvent(rsp) {
//     //alert(JSON.stringify(rsp))
//     var r = null;
//     try {
//       if (typeof rsp.device == 'object') {
//         r = rsp.device;
//       } else {
//         r = JSON.parse(rsp.device);
//       }
//     } catch (e) {
//       //alert(e.message);
//       //ignore
//     }
//     //alert('f')
//     if (r) {
//       let found = this.state.foundDs || [];
//       if (found.findIndex) {
//         let duplicated = found.findIndex(function (x) {
//           return x.address == r.address;
//         });
//         //CHECK DEPLICATED HERE...
//         if (duplicated == -1) {
//           found.push(r);
//           this.setState({
//             foundDs: found,
//           });
//         }
//       }
//     }
//   }

//   _renderRow(rows) {
//     let items = [];
//     for (let i in rows) {
//       let row = rows[i];
//       if (row.address) {
//         items.push(
//           <TouchableOpacity
//             key={new Date().getTime() + i}
//             style={styles.wtf}
//             onPress={() => {
//               this.setState({
//                 loading: true,
//               });
//               BluetoothManager.connect(row.address).then(
//                 s => {
//                   this.setState({
//                     loading: false,
//                     boundAddress: row.address,
//                     name: row.name || 'UNKNOWN',
//                   });
//                 },
//                 e => {
//                   this.setState({
//                     loading: false,
//                   });
//                   alert(e);
//                 },
//               );
//             }}>
//             <Text style={styles.name}>{row.name || 'UNKNOWN'}</Text>
//             <Text style={styles.address}>{row.address}</Text>
//           </TouchableOpacity>,
//         );
//       }
//     }
//     return items;
//   }

//   render() {
//     return (
//       <ScrollView style={styles.container}>
//         <Text>{this.state.debugMsg}</Text>
//         <Text style={styles.title}>
//           Blutooth Opended:{this.state.bleOpend ? 'true' : 'false'}{' '}
//           <Text>Open BLE Before Scanning</Text>{' '}
//         </Text>
//         <View>
//           <Switch
//             value={this.state.bleOpend}
//             onValueChange={v => {
//               this.setState({
//                 loading: true,
//               });
//               if (!v) {
//                 BluetoothManager.disableBluetooth().then(
//                   () => {
//                     this.setState({
//                       bleOpend: false,
//                       loading: false,
//                       foundDs: [],
//                       pairedDs: [],
//                     });
//                   },
//                   err => {
//                     alert(err);
//                   },
//                 );
//               } else {
//                 BluetoothManager.enableBluetooth().then(
//                   r => {
//                     var paired = [];
//                     if (r && r.length > 0) {
//                       for (var i = 0; i < r.length; i++) {
//                         try {
//                           paired.push(JSON.parse(r[i]));
//                         } catch (e) {
//                           //ignore
//                         }
//                       }
//                     }
//                     this.setState({
//                       bleOpend: true,
//                       loading: false,
//                       pairedDs: paired,
//                     });
//                   },
//                   err => {
//                     this.setState({
//                       loading: false,
//                     });
//                     alert(err);
//                   },
//                 );
//               }
//             }}
//           />
//           <Button
//             disabled={this.state.loading || !this.state.bleOpend}
//             onPress={() => {
//               this._scan();
//             }}
//             title="Scan"
//           />
//         </View>
//         <Text style={styles.title}>
//           Connected:
//           <Text style={{color: 'blue'}}>
//             {!this.state.name ? 'No Devices' : this.state.name}
//           </Text>
//         </Text>
//         <Text style={styles.title}>Found(tap to connect):</Text>
//         {this.state.loading ? <ActivityIndicator animating={true} /> : null}
//         <View style={{flex: 1, flexDirection: 'column'}}>
//           {this._renderRow(this.state.foundDs)}
//         </View>
//         <Text style={styles.title}>Paired:</Text>
//         {this.state.loading ? <ActivityIndicator animating={true} /> : null}
//         <View style={{flex: 1, flexDirection: 'column'}}>
//           {this._renderRow(this.state.pairedDs)}
//         </View>

//         {/* <View style={{flexDirection:"row",justifyContent:"space-around",paddingVertical:30}}>
//                 <Button disabled={this.state.loading || !(this.state.bleOpend && this.state.boundAddress.length > 0 )}
//                         title="ESC/POS" onPress={()=>{
//                     this.props.navigator.push({
//                         component:EscPos,
//                         passProps:{
//                             name:this.state.name,
//                             boundAddress:this.state.boundAddress
//                         }
//                     })
//                 }}/>
//                 <Button disabled={this.state.loading|| !(this.state.bleOpend && this.state.boundAddress.length > 0) }
//                         title="TSC" onPress={()=>{
//                    this.props.navigator.push({
//                        component:Tsc,
//                        passProps:{
//                            name:this.state.name,
//                            boundAddress:this.state.boundAddress
//                        }
//                    })
//                 }
//                 }/>
//                 </View> */}
//       </ScrollView>
//     );
//   }

//   _selfTest() {
//     this.setState(
//       {
//         loading: true,
//       },
//       () => {
//         BluetoothEscposPrinter.selfTest(() => {});

//         this.setState({
//           loading: false,
//         });
//       },
//     );
//   }

//   _scan() {
//     this.setState({
//       loading: true,
//     });
//     BluetoothManager.scanDevices().then(
//       s => {
//         var ss = s;
//         var found = ss.found;
//         try {
//           found = JSON.parse(found); //@FIX_it: the parse action too weired..
//         } catch (e) {
//           //ignore
//         }
//         var fds = this.state.foundDs;
//         if (found && found.length) {
//           fds = found;
//         }
//         this.setState({
//           foundDs: fds,
//           loading: false,
//         });
//       },
//       er => {
//         this.setState({
//           loading: false,
//         });
//         alert('error' + JSON.stringify(er));
//       },
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//   },

//   title: {
//     width: width,
//     backgroundColor: '#eee',
//     color: '#232323',
//     paddingLeft: 8,
//     paddingVertical: 4,
//     textAlign: 'left',
//   },
//   wtf: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   name: {
//     flex: 1,
//     textAlign: 'left',
//   },
//   address: {
//     flex: 1,
//     textAlign: 'right',
//   },
// });


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  containerList: { flex: 1, flexDirection: 'column' },
  bluetoothStatusContainer: { justifyContent: 'flex-end', alignSelf: 'flex-end' },
  bluetoothStatus: color => ({
    backgroundColor: color,
    padding: 8,
    borderRadius: 2,
    color: 'white',
    paddingHorizontal: 14,
    marginBottom: 20,
  }),
  bluetoothInfo: { textAlign: 'center', fontSize: 16, color: '#FFC806', marginBottom: 20 },
  sectionTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 12 },
  printerInfo: { textAlign: 'center', fontSize: 16, color: '#E9493F', marginBottom: 20 },
});