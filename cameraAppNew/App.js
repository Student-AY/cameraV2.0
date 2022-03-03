import { StatusBar } from 'expo-status-bar';
import React , {useEffect , useState} from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { Camera  } from 'expo-camera'
import { FlashMode } from 'expo-camera/build/Camera.types';




export default function App() {
const [hasCameraPermission , setHasCameraPermission] = useState(null);  

const [camera , setCamera] = useState(null);  

const [image , setImage] = useState(null);  

const [ type , setType] = useState(Camera.Constants.Type.back);  

const [ flash , setFlash] = useState(Camera.Constants.FlashMode.on);


useEffect(() => {
  (async () => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus);
  })
},[])

if(hasCameraPermission === false){
  return <Text>permission denied!</Text>
}

const takePicture = async () => {
  if(camera){
    Camera.Constants.FlashMode.torch
    const data = await camera.takePictureAsync(null);
    setImage(data.uri)
    console.log(data.uri)
    console.log(Date.now())
  }
}
  return (
    <View style={{flex:1}}>
      <View style={styles.cameraContainer}>
        <Camera ref={ref => setCamera(ref)}
        style={styles.cameraRatio}
        type={type}
        ratio={'1:1'}
        />
        </View>

        <Button
        title='flip camera'
        onPress={() => {
          setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
        }}></Button>

        <Button title="Take picture"

        onPress={() => takePicture()}
        />
        {image && <Image source={{uri : image}} style={{flex:1}} />}
      
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection:'row'
    
  },
  cameraRatio:{
    flex:1,
    aspectRatio:1
  }
});
